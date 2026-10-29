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
//
// A note on HTTP 404: this endpoint is documented (OBF's v3 API docs)
// and independently observed to return a 404 WITH a JSON body for a
// genuinely missing product, not just for a broken route or outage —
// the sibling Open Food Facts / Open Pet Food Facts APIs (same engine)
// do the same. This script reads that body and trusts its own
// `status` field over the HTTP status code; a 404 only counts as a
// service error here if its body isn't a recognizable not-found
// response. See the comment on lookupOne() for the detail.

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

/** Open Beauty Facts (and its sibling Open Food Facts / Open Pet Food
 *  Facts — same underlying "Product Opener" engine) is documented
 *  (the official v3 API docs state a missing product returns HTTP 404)
 *  and independently observed in the wild to carry a real JSON body —
 *  {"status":0,"status_verbose":"product not found",...} — on BOTH a
 *  200 and a 404 for this endpoint. A 404 here is not automatically a
 *  service failure: it is this API's documented way of saying "not
 *  found" at least some of the time. So this function trusts the
 *  parsed JSON body's own `status` field over the HTTP status code,
 *  and only falls back to a genuine error classification when the body
 *  itself doesn't parse as JSON or doesn't match either known shape —
 *  that's the case a real service/API failure (a 5xx, a WAF block
 *  page, a malformed response) actually looks like. */
async function lookupOne(barcode) {
  const url = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json?fields=${OBF_FIELDS}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let httpStatus = null;
  let statusText = '';
  let rawText;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
    httpStatus = response.status;
    statusText = response.statusText;
    rawText = await response.text();
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { barcode, httpStatus, outcome: 'timeout', detail: `No response within ${REQUEST_TIMEOUT_MS}ms` };
    }
    return { barcode, httpStatus, outcome: 'network_error', detail: String(err.message || err) };
  }
  clearTimeout(timer);

  let data = null;
  try {
    data = JSON.parse(rawText);
  } catch {
    // leave data null — handled in the fallback branch below
  }

  if (data && typeof data === 'object') {
    if (data.status === 1 && data.product) {
      const p = data.product;
      const name = typeof p.product_name === 'string' ? p.product_name.trim() : '';
      const brand = typeof p.brands === 'string' ? p.brands.trim() : '';
      const ingredientsText = typeof p.ingredients_text === 'string' ? p.ingredients_text.trim() : '';
      const hasName = name.length > 0;
      const hasBrand = brand.length > 0;
      const hasIngredients = ingredientsText.length > 0;
      const dataQualityFlags = [];
      if (!hasName) dataQualityFlags.push('missing_name');
      if (!hasBrand) dataQualityFlags.push('missing_brand');

      return {
        barcode,
        httpStatus,
        outcome: hasIngredients ? 'found_with_ingredients' : 'found_without_ingredients',
        detail: `HTTP ${httpStatus} — name="${name || '(missing)'}" brand="${brand || '(missing)'}" ingredients_chars=${ingredientsText.length}`
          + (dataQualityFlags.length ? ` — ⚠ ${dataQualityFlags.join(', ')} (found, but treat as low-confidence until manually checked)` : ''),
        name, brand, hasName, hasBrand, hasIngredients, dataQualityFlags,
      };
    }

    if (data.status === 0 || !data.product) {
      // Confirmed not-found: the response body itself says so — via
      // whichever HTTP status the server happened to wrap it in.
      return {
        barcode,
        httpStatus,
        outcome: 'not_found',
        detail: `HTTP ${httpStatus} — confirmed not-found (status_verbose: "${data.status_verbose || 'product not found'}")`,
      };
    }
  }

  // The body didn't parse as JSON, or parsed but matched neither known
  // shape — a genuine service/API problem, not a confirmed not-found.
  // Keep a short snippet (not the whole body) so it's possible to see
  // what actually came back without dumping a full error page.
  const snippet = (rawText || '').slice(0, 300).replace(/\s+/g, ' ').trim();
  if (httpStatus >= 200 && httpStatus < 300) {
    return { barcode, httpStatus, outcome: 'invalid_response', detail: `HTTP ${httpStatus} but the body didn't match the expected shape. Snippet: ${snippet || '(empty body)'}` };
  }
  return { barcode, httpStatus, outcome: 'http_error', detail: `HTTP ${httpStatus} ${statusText} — body wasn't a recognizable not-found response. Snippet: ${snippet || '(empty body)'}` };
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
  // "Errors" now means a genuine service/API problem only — a 404 (or
  // any other status) whose body explicitly confirmed status:0 is
  // counted under not_found, not here. See lookupOne()'s comment.
  const totalErrors = counts.http_error + counts.invalid_response + counts.timeout + counts.network_error;
  const pct = (n) => total > 0 ? `${((n / total) * 100).toFixed(0)}%` : '0%';

  const foundWithDataQualityFlags = results.filter(r =>
    (r.outcome === 'found_with_ingredients' || r.outcome === 'found_without_ingredients') &&
    r.dataQualityFlags && r.dataQualityFlags.length > 0
  );

  const summary = [
    '',
    '═══════════════════════════════════════════════',
    'SUMMARY — copy everything below this line back to report results',
    '═══════════════════════════════════════════════',
    `Total tested: ${total}`,
    `Found (confirmed via the response body, any HTTP status): ${totalFound} (${pct(totalFound)})`,
    `  - with ingredients listed: ${counts.found_with_ingredients} (${pct(counts.found_with_ingredients)} of total)`,
    `  - without ingredients listed: ${counts.found_without_ingredients} (${pct(counts.found_without_ingredients)} of total)`,
    `  - of those found, missing name and/or brand (data-quality flag — don't count as clean evidence without checking manually): ${foundWithDataQualityFlags.length}`,
    foundWithDataQualityFlags.length > 0 ? foundWithDataQualityFlags.map(r => `      ⚠ ${r.barcode}: ${r.dataQualityFlags.join(', ')}`).join('\n') : null,
    `Not found (confirmed via the response body — a status:0 result, regardless of whether it arrived as HTTP 200 or 404): ${counts.not_found} (${pct(counts.not_found)})`,
    `Genuine service/API errors (body did not confirm either found or not-found): ${totalErrors} (${pct(totalErrors)})`,
    `  - HTTP errors (non-2xx with an unrecognized or unparseable body): ${counts.http_error}`,
    `  - invalid responses (2xx but an unrecognized or unparseable body): ${counts.invalid_response}`,
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
