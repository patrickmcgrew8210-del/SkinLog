#!/usr/bin/env node
// Open Beauty Facts barcode-coverage check — standalone validation
// tooling for Phase 3 (product scanner) Stage A. NOT part of the app
// runtime: nothing here is imported by index.html or any js/*.js file,
// and it sends nothing but barcode digits to Open Beauty Facts — no
// skin logs, photos, profile data, or anything else from the app.
//
// Why this exists: Open Beauty Facts' real coverage of US skincare
// products is unverified (the project's own numbers only give a global,
// all-categories total). This script measures it directly against
// barcodes read off physical products, rather than guessing.
//
// Usage:
//   1. cp scripts/obf-coverage-barcodes.sample.txt scripts/obf-coverage-barcodes.txt
//   2. Edit that copy: one real barcode per line, read off actual
//      product packaging. (It's gitignored — your list stays local.)
//   3. node scripts/check-obf-coverage.mjs
//      (or: node scripts/check-obf-coverage.mjs path/to/other-list.txt)
//
// Requires Node 18+ (uses the built-in fetch/AbortController — no
// dependencies, nothing to npm install).
//
// Pacing: Open Beauty Facts' documented limit is 15 reads/minute/IP
// (see their API docs). This script runs requests one at a time with a
// fixed delay between them, no retries, no concurrency — safely under
// that limit even for a longer list. It is not built for, and should
// not be used for, bulk scraping.
//
// Output: a live line per barcode as it runs, a summary block at the
// end (the exact numbers to report back), and a JSON results file at
// scripts/obf-coverage-results.json (also gitignored) with the full
// detail behind each line, in case you want to look closer at any one
// barcode.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT = path.join(__dirname, 'obf-coverage-barcodes.txt');
const SAMPLE_INPUT = path.join(__dirname, 'obf-coverage-barcodes.sample.txt');
const OUTPUT_JSON = path.join(__dirname, 'obf-coverage-results.json');

const USER_AGENT = 'SkinFolio-CoverageCheck/1.0 (+https://skinlog.app)';
const REQUEST_TIMEOUT_MS = 10_000;
const DELAY_BETWEEN_REQUESTS_MS = 4_500; // OBF's documented limit is 15/min (~4000ms average) — this leaves headroom
const OBF_FIELDS = 'code,product_name,brands,ingredients_text,status,status_verbose';

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function loadBarcodes(inputPath) {
  if (!existsSync(inputPath)) {
    console.error(`\nNo input file found at:\n  ${inputPath}\n`);
    console.error(`Create it first:\n  cp "${SAMPLE_INPUT}" "${DEFAULT_INPUT}"\n  (then edit it — one real barcode per line, read off physical products)\n`);
    process.exit(1);
  }

  const raw = readFileSync(inputPath, 'utf8').split('\n');
  const barcodes = [];
  const skippedInvalid = [];

  for (const rawLine of raw) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    if (/^\d{8,14}$/.test(line)) {
      barcodes.push(line);
    } else {
      skippedInvalid.push(line);
    }
  }

  return { barcodes, skippedInvalid };
}

async function lookupOne(barcode) {
  const url = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json?fields=${OBF_FIELDS}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { barcode, outcome: 'timeout', detail: `No response within ${REQUEST_TIMEOUT_MS}ms` };
    }
    return { barcode, outcome: 'network_error', detail: String(err.message || err) };
  }
  clearTimeout(timer);

  if (!response.ok) {
    return { barcode, outcome: 'http_error', detail: `HTTP ${response.status} ${response.statusText}` };
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    return { barcode, outcome: 'invalid_response', detail: `Response was not valid JSON: ${String(err.message || err)}` };
  }

  if (data.status !== 1 || !data.product) {
    return { barcode, outcome: 'not_found', detail: data.status_verbose || 'product not in database' };
  }

  const p = data.product;
  const name = typeof p.product_name === 'string' ? p.product_name.trim() : '';
  const brand = typeof p.brands === 'string' ? p.brands.trim() : '';
  const ingredientsText = typeof p.ingredients_text === 'string' ? p.ingredients_text.trim() : '';
  const hasNameAndBrand = name.length > 0 && brand.length > 0;
  const hasIngredients = ingredientsText.length > 0;

  return {
    barcode,
    outcome: hasIngredients ? 'found_with_ingredients' : 'found_without_ingredients',
    detail: `name="${name || '(missing)'}" brand="${brand || '(missing)'}" ingredients_chars=${ingredientsText.length}`,
    name, brand, hasNameAndBrand, hasIngredients,
  };
}

function outcomeLabel(outcome) {
  return {
    found_with_ingredients: 'FOUND (with ingredients)',
    found_without_ingredients: 'FOUND (no ingredients listed)',
    not_found: 'NOT FOUND',
    http_error: 'HTTP ERROR',
    invalid_response: 'INVALID RESPONSE',
    timeout: 'TIMEOUT',
    network_error: 'NETWORK ERROR',
  }[outcome] || outcome;
}

async function main() {
  const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT;
  const { barcodes, skippedInvalid } = loadBarcodes(inputPath);

  if (skippedInvalid.length > 0) {
    console.log(`Skipped ${skippedInvalid.length} line(s) that aren't 8-14 digit barcodes (not sent to anything):`);
    skippedInvalid.forEach(l => console.log(`  - "${l}"`));
    console.log('');
  }

  if (barcodes.length === 0) {
    console.error(`No valid barcodes to test in ${inputPath}.`);
    console.error('Edit that file to add real barcodes (see scripts/obf-coverage-barcodes.sample.txt for the format), then run this again.');
    process.exit(1);
  }

  console.log(`Testing ${barcodes.length} barcode(s) against Open Beauty Facts.`);
  console.log(`Pacing: one request at a time, ${DELAY_BETWEEN_REQUESTS_MS}ms apart, ${REQUEST_TIMEOUT_MS}ms timeout, no retries.\n`);

  const results = [];
  for (let i = 0; i < barcodes.length; i++) {
    const barcode = barcodes[i];
    const result = await lookupOne(barcode);
    results.push(result);
    console.log(`[${i + 1}/${barcodes.length}] ${barcode} ... ${outcomeLabel(result.outcome)}`);
    if (result.detail) console.log(`    ${result.detail}`);
    if (i < barcodes.length - 1) await sleep(DELAY_BETWEEN_REQUESTS_MS);
  }

  const counts = {
    found_with_ingredients: 0,
    found_without_ingredients: 0,
    not_found: 0,
    http_error: 0,
    invalid_response: 0,
    timeout: 0,
    network_error: 0,
  };
  results.forEach(r => counts[r.outcome]++);

  const total = results.length;
  const totalFound = counts.found_with_ingredients + counts.found_without_ingredients;
  const totalErrors = counts.http_error + counts.invalid_response + counts.timeout + counts.network_error;
  const pct = (n) => total > 0 ? `${((n / total) * 100).toFixed(0)}%` : '0%';

  const summary = [
    '',
    '═══════════════════════════════════════════════',
    'SUMMARY — copy everything below this line back to report results',
    '═══════════════════════════════════════════════',
    `Total tested: ${total}`,
    `Found: ${totalFound} (${pct(totalFound)})`,
    `  - with ingredients listed: ${counts.found_with_ingredients} (${pct(counts.found_with_ingredients)} of total)`,
    `  - without ingredients listed: ${counts.found_without_ingredients} (${pct(counts.found_without_ingredients)} of total)`,
    `Not found: ${counts.not_found} (${pct(counts.not_found)})`,
    `Errors: ${totalErrors} (${pct(totalErrors)})`,
    `  - HTTP errors: ${counts.http_error}`,
    `  - invalid responses: ${counts.invalid_response}`,
    `  - timeouts: ${counts.timeout}`,
    `  - network errors: ${counts.network_error}`,
    skippedInvalid.length > 0 ? `Skipped (not a valid barcode format): ${skippedInvalid.length}` : null,
    '═══════════════════════════════════════════════',
  ].filter(Boolean).join('\n');

  console.log(summary);

  writeFileSync(OUTPUT_JSON, JSON.stringify({ ranAt: new Date().toISOString(), inputFile: inputPath, counts, results }, null, 2));
  console.log(`\nFull per-barcode detail written to:\n  ${OUTPUT_JSON}`);
}

main();
