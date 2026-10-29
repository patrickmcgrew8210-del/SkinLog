#!/usr/bin/env node
// Multi-source barcode -> ingredient-list comparison. Research/validation
// tooling for Phase 3 (product scanner) — NOT part of the app runtime,
// NOT imported by any index.html/js/*.js file. Sends nothing but barcode
// digits (and, for INCI API, your own API key read from an environment
// variable) to each source — no app code, skin logs, photos, or profile
// data anywhere near this.
//
// Compares the SAME barcode list (scripts/obf-coverage-barcodes.txt —
// same file check-obf-coverage.mjs uses) against up to three sources:
//
//   - Open Beauty Facts — free, no key. Reuses the same 404-aware
//     classification fixed in check-obf-coverage.mjs (commit f0bb723):
//     a confirmed not-found can legitimately arrive as HTTP 404 with a
//     JSON body, not just HTTP 200 — verified in that earlier commit
//     against the documented and independently-observed API contract.
//
//   - INCI API (https://inciapi.com) — free tier (2,000 requests/month,
//     no credit card, per their pricing page), but DOES require an API
//     key. This script NEVER invents or stores one. Set it yourself:
//       1. Go to https://inciapi.com/pricing/ and sign up for the free
//          tier (no credit card required, per their pricing page).
//       2. Get your key from their dashboard.
//       3. Run this script with: INCI_API_KEY=sk_live_your_key node scripts/compare-ingredient-sources.mjs
//     Without that env var, this script skips INCI API for every
//     barcode and tells you so — it does not fail, and it does not
//     guess or fabricate a response.
//     Caveat: I could not reach inciapi.com's docs directly from this
//     environment (network-restricted) to read the exact JSON response
//     schema field-by-field — only search-engine-surfaced fragments.
//     The parser below is written defensively (tries several plausible
//     field names) and logs the full raw response either way, so a
//     first real run will show exactly what's there even if the field
//     names guessed here are wrong.
//
//   - ProductGuru — the user-supplied URL (product-guru.org) returned
//     no search results anywhere and could not be confirmed to exist.
//     The barcode/product-recall service actually findable under the
//     name "ProductGuru" lives at myproduct.guru, a DIFFERENT domain —
//     this script queries that one instead and flags the mismatch
//     loudly. Confirm this is the service you meant before trusting
//     these results. Every source describing it (including its own
//     public-apis.org submission) frames it as product identity +
//     government safety-recall data, not an ingredients database — no
//     source found mentions an ingredients field at all. This script
//     tests it empirically anyway rather than assuming that absence,
//     but go in expecting it to likely return found_no_ingredients or
//     worse for every barcode.
//
// Classification (5 categories, applied per-source, per the brief):
//   usable_match          - product identity is reasonably consistent
//                            (has a name/brand) AND an ingredient list
//                            is present and non-trivial.
//   found_no_ingredients   - product identified, no ingredient list.
//   questionable_quality   - ingredients present but identity is sparse
//                            (e.g. missing name/brand) — NEVER counted
//                            as usable_match, per the brief's explicit
//                            instruction not to count a long ingredient
//                            string with no product identity as a clean
//                            match.
//   not_found              - confirmed not-found, per that source's own
//                            response contract.
//   error                  - rate-limited / auth failure / service
//                            error / unrecognized response shape.
//
// Pacing: one barcode at a time, sources queried concurrently (they're
// different hosts, so this doesn't stack load on any one of them), with
// a fixed delay between barcodes sized to Open Beauty Facts' documented
// limit (15/min, ~4s average) — the only one of the three with a
// documented per-minute rate limit. No retries, no concurrency across
// barcodes, not built for bulk use.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT = path.join(__dirname, 'obf-coverage-barcodes.txt');
const SAMPLE_INPUT = path.join(__dirname, 'obf-coverage-barcodes.sample.txt');
const OUTPUT_JSON = path.join(__dirname, 'ingredient-source-comparison-results.json');

const REQUEST_TIMEOUT_MS = 10_000;
const DELAY_BETWEEN_BARCODES_MS = 4_500;
const OBF_USER_AGENT = 'SkinFolio-CoverageCheck/1.0 (+https://skinlog.app)';
const OBF_FIELDS = 'code,product_name,brands,ingredients_text,status,status_verbose';
const INCI_API_KEY = process.env.INCI_API_KEY || null;

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
    if (/^\d{8,14}$/.test(line)) barcodes.push(line);
    else skippedInvalid.push(line);
  }
  return { barcodes, skippedInvalid };
}

async function timedFetch(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    return { httpStatus: response.status, statusText: response.statusText, headers: response.headers, text };
  } finally {
    clearTimeout(timer);
  }
}

function tryParseJson(text) {
  try { return JSON.parse(text); } catch { return null; }
}

function snippet(text) {
  return (text || '').slice(0, 300).replace(/\s+/g, ' ').trim() || '(empty body)';
}

/* ── Open Beauty Facts — same contract confirmed and fixed in
   check-obf-coverage.mjs (commit f0bb723): trust the parsed body's own
   `status` field over the HTTP status code. ── */
async function lookupObf(barcode) {
  const url = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json?fields=${OBF_FIELDS}`;
  let res;
  try {
    res = await timedFetch(url, { headers: { 'User-Agent': OBF_USER_AGENT } });
  } catch (err) {
    return { source: 'open_beauty_facts', barcode, category: 'error', errorType: err.name === 'AbortError' ? 'timeout' : 'network_error', detail: String(err.message || err) };
  }

  const data = tryParseJson(res.text);
  if (data && typeof data === 'object') {
    if (data.status === 1 && data.product) {
      const p = data.product;
      const name = typeof p.product_name === 'string' ? p.product_name.trim() : '';
      const brand = typeof p.brands === 'string' ? p.brands.trim() : '';
      const ingredientsText = typeof p.ingredients_text === 'string' ? p.ingredients_text.trim() : '';
      const hasIdentity = name.length > 0 && brand.length > 0;
      const hasIngredients = ingredientsText.length > 0;
      let category;
      if (hasIngredients && hasIdentity) category = 'usable_match';
      else if (hasIngredients && !hasIdentity) category = 'questionable_quality';
      else category = 'found_no_ingredients';
      return { source: 'open_beauty_facts', barcode, category, httpStatus: res.httpStatus, name, brand, ingredientsChars: ingredientsText.length, detail: `HTTP ${res.httpStatus} — name="${name || '(missing)'}" brand="${brand || '(missing)'}" ingredients_chars=${ingredientsText.length}` };
    }
    if (data.status === 0 || !data.product) {
      return { source: 'open_beauty_facts', barcode, category: 'not_found', httpStatus: res.httpStatus, detail: `HTTP ${res.httpStatus} — confirmed not-found (status_verbose: "${data.status_verbose || 'product not found'}")` };
    }
  }
  return { source: 'open_beauty_facts', barcode, category: 'error', errorType: res.httpStatus >= 200 && res.httpStatus < 300 ? 'invalid_response' : 'http_error', httpStatus: res.httpStatus, detail: `HTTP ${res.httpStatus} ${res.statusText}. Snippet: ${snippet(res.text)}` };
}

/* ── INCI API — requires a free key you obtain yourself (see header
   comment). Response schema below is BEST-EFFORT: I could not reach
   inciapi.com's own docs from this sandboxed environment, only
   search-engine-surfaced fragments, so this tries several plausible
   field names and always keeps the full raw body for inspection. ── */
async function lookupInciApi(barcode) {
  if (!INCI_API_KEY) {
    return { source: 'inci_api', barcode, category: 'skipped', detail: 'INCI_API_KEY not set — see the instructions at the top of this script for how to get a free key.' };
  }

  const url = `https://inciapi.com/v1/products/${barcode}/safety`;
  let res;
  try {
    res = await timedFetch(url, { headers: { 'X-API-Key': INCI_API_KEY } });
  } catch (err) {
    return { source: 'inci_api', barcode, category: 'error', errorType: err.name === 'AbortError' ? 'timeout' : 'network_error', detail: String(err.message || err) };
  }

  if (res.httpStatus === 401 || res.httpStatus === 403) {
    return { source: 'inci_api', barcode, category: 'error', errorType: 'auth_failure', httpStatus: res.httpStatus, detail: `HTTP ${res.httpStatus} — check INCI_API_KEY is correct and active. Snippet: ${snippet(res.text)}` };
  }
  if (res.httpStatus === 429) {
    const retryAfter = res.headers.get('retry-after');
    return { source: 'inci_api', barcode, category: 'error', errorType: 'rate_limited', httpStatus: res.httpStatus, detail: `HTTP 429 — rate limited${retryAfter ? ` (Retry-After: ${retryAfter})` : ''}. Not retried — see pacing note in this script's header.` };
  }

  const data = tryParseJson(res.text);

  if (res.httpStatus === 404) {
    // Treated as not_found, but this is an INFERENCE from the HTTP
    // status alone — unlike Open Beauty Facts, I have no confirmed
    // documentation of INCI API's not-found JSON shape, so this is
    // flagged as such rather than stated as a verified fact.
    return { source: 'inci_api', barcode, category: 'not_found', httpStatus: 404, detail: `HTTP 404 — inferred not-found (INCI API's not-found response shape is undocumented in what I could verify; this is based on HTTP status alone). Raw body: ${snippet(res.text)}` };
  }

  if (data && typeof data === 'object') {
    // Best-effort field guesses — adjust these after seeing one real
    // response if they don't match (the raw body is always kept below).
    const product = data.product || data.result || data;
    const name = typeof product.name === 'string' ? product.name.trim()
      : typeof product.product_name === 'string' ? product.product_name.trim() : '';
    const brand = typeof product.brand === 'string' ? product.brand.trim()
      : typeof product.brands === 'string' ? product.brands.trim() : '';
    const ingredients = product.ingredients || product.inci_list || product.ingredient_list || null;
    const hasIngredients = Array.isArray(ingredients) ? ingredients.length > 0 : (typeof ingredients === 'string' && ingredients.trim().length > 0);
    const hasIdentity = name.length > 0 && brand.length > 0;

    let category;
    if (hasIngredients && hasIdentity) category = 'usable_match';
    else if (hasIngredients && !hasIdentity) category = 'questionable_quality';
    else category = 'found_no_ingredients';

    return {
      source: 'inci_api', barcode, category, httpStatus: res.httpStatus,
      name, brand, hasIngredients,
      detail: `HTTP ${res.httpStatus} — name="${name || '(missing)'}" brand="${brand || '(missing)'}" hasIngredients=${hasIngredients} (field names guessed — see rawBody)`,
      rawBody: data,
    };
  }

  return { source: 'inci_api', barcode, category: 'error', errorType: res.httpStatus >= 200 && res.httpStatus < 300 ? 'invalid_response' : 'http_error', httpStatus: res.httpStatus, detail: `HTTP ${res.httpStatus} ${res.statusText}. Snippet: ${snippet(res.text)}` };
}

/* ── ProductGuru — querying myproduct.guru, NOT the product-guru.org
   URL originally given (see header comment: that domain returned no
   search results and couldn't be confirmed to exist). No key
   documented. No confirmed "ingredients" field in any description
   found — this is tested empirically rather than assumed. ── */
async function lookupProductGuru(barcode) {
  const url = `https://myproduct.guru/lookup/${barcode}.json`;
  let res;
  try {
    res = await timedFetch(url, {});
  } catch (err) {
    return { source: 'productguru', barcode, category: 'error', errorType: err.name === 'AbortError' ? 'timeout' : 'network_error', detail: String(err.message || err) };
  }

  if (res.httpStatus === 429) {
    return { source: 'productguru', barcode, category: 'error', errorType: 'rate_limited', httpStatus: res.httpStatus, detail: `HTTP 429 — rate limited. Not retried.` };
  }
  if (res.httpStatus === 404) {
    return { source: 'productguru', barcode, category: 'not_found', httpStatus: 404, detail: `HTTP 404 — inferred not-found (no documented not-found JSON shape confirmed for this source). Raw body: ${snippet(res.text)}` };
  }

  const data = tryParseJson(res.text);
  if (data && typeof data === 'object') {
    const product = data.product || data.result || data;
    const name = typeof product.name === 'string' ? product.name.trim() : '';
    const brand = typeof product.brand === 'string' ? product.brand.trim() : '';
    const ingredients = product.ingredients || product.ingredient_list || null;
    const hasIngredients = Array.isArray(ingredients) ? ingredients.length > 0 : (typeof ingredients === 'string' && ingredients.trim().length > 0);
    const hasIdentity = name.length > 0;

    let category;
    if (hasIngredients && hasIdentity) category = 'usable_match';
    else if (hasIngredients && !hasIdentity) category = 'questionable_quality';
    else category = 'found_no_ingredients'; // expected outcome per the research notes above

    return {
      source: 'productguru', barcode, category, httpStatus: res.httpStatus,
      name, brand, hasIngredients,
      detail: `HTTP ${res.httpStatus} — name="${name || '(missing)'}" hasIngredients=${hasIngredients} (field names guessed, no confirmed schema — see rawBody)`,
      rawBody: data,
    };
  }

  return { source: 'productguru', barcode, category: 'error', errorType: res.httpStatus >= 200 && res.httpStatus < 300 ? 'invalid_response' : 'http_error', httpStatus: res.httpStatus, detail: `HTTP ${res.httpStatus} ${res.statusText}. Snippet: ${snippet(res.text)}` };
}

function categoryLabel(category) {
  return {
    usable_match: 'USABLE MATCH',
    found_no_ingredients: 'FOUND, NO INGREDIENTS',
    questionable_quality: 'QUESTIONABLE QUALITY',
    not_found: 'NOT FOUND',
    error: 'ERROR',
    skipped: 'SKIPPED',
  }[category] || category;
}

async function main() {
  const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT;
  const usingSample = inputPath === SAMPLE_INPUT;
  const { barcodes, skippedInvalid } = loadBarcodes(inputPath);
  const actualInputUsed = inputPath;

  console.log('═══════════════════════════════════════════════');
  console.log('Sources in this comparison:');
  console.log('  - Open Beauty Facts: free, no key, queried directly.');
  console.log(`  - INCI API: ${INCI_API_KEY ? 'key found in INCI_API_KEY — will be queried.' : 'NO KEY SET — will be SKIPPED for every barcode. Get a free key at https://inciapi.com/pricing/ (no credit card) and rerun with INCI_API_KEY=... set.'}`);
  console.log('  - ProductGuru: querying myproduct.guru (NOT product-guru.org — that URL returned no search results anywhere and could not be confirmed to exist). Confirm this is the service you meant.');
  console.log('═══════════════════════════════════════════════\n');

  if (usingSample) {
    console.log('⚠ Running against the SAMPLE file (explicitly passed as an argument), not a real barcode list.');
    console.log('  Every line in it is commented out by design, so this run will test 0 barcodes.');
    console.log('  This is NOT a coverage measurement. Create your real list first: cp scripts/obf-coverage-barcodes.sample.txt scripts/obf-coverage-barcodes.txt, then edit it.\n');
  }

  if (skippedInvalid.length > 0) {
    console.log(`Skipped ${skippedInvalid.length} line(s) that aren't 8-14 digit barcodes:`);
    skippedInvalid.forEach(l => console.log(`  - "${l}"`));
    console.log('');
  }

  if (barcodes.length === 0) {
    console.error(`No valid barcodes to test in ${actualInputUsed}.`);
    console.error('Edit scripts/obf-coverage-barcodes.txt to add real barcodes, then run this again.');
    process.exit(1);
  }

  console.log(`Testing ${barcodes.length} barcode(s) from: ${actualInputUsed}`);
  console.log(`Pacing: one barcode at a time (sources queried concurrently per barcode), ${DELAY_BETWEEN_BARCODES_MS}ms apart, ${REQUEST_TIMEOUT_MS}ms timeout per source, no retries.\n`);

  const allResults = [];
  for (let i = 0; i < barcodes.length; i++) {
    const barcode = barcodes[i];
    const [obf, inci, pg] = await Promise.all([
      lookupObf(barcode),
      lookupInciApi(barcode),
      lookupProductGuru(barcode),
    ]);
    allResults.push(obf, inci, pg);
    console.log(`[${i + 1}/${barcodes.length}] ${barcode}`);
    console.log(`    OBF:         ${categoryLabel(obf.category)}${obf.detail ? ` — ${obf.detail}` : ''}`);
    console.log(`    INCI API:    ${categoryLabel(inci.category)}${inci.detail ? ` — ${inci.detail}` : ''}`);
    console.log(`    ProductGuru: ${categoryLabel(pg.category)}${pg.detail ? ` — ${pg.detail}` : ''}`);
    if (i < barcodes.length - 1) await sleep(DELAY_BETWEEN_BARCODES_MS);
  }

  const sources = ['open_beauty_facts', 'inci_api', 'productguru'];
  const categories = ['usable_match', 'found_no_ingredients', 'questionable_quality', 'not_found', 'error', 'skipped'];
  const counts = {};
  for (const s of sources) {
    counts[s] = Object.fromEntries(categories.map(c => [c, 0]));
    allResults.filter(r => r.source === s).forEach(r => counts[s][r.category]++);
  }

  const total = barcodes.length;
  const pct = (n) => total > 0 ? `${((n / total) * 100).toFixed(0)}%` : '0%';
  const sourceLabel = { open_beauty_facts: 'Open Beauty Facts', inci_api: 'INCI API', productguru: 'ProductGuru (myproduct.guru)' };

  const summaryLines = ['', '═══════════════════════════════════════════════', 'SUMMARY — copy everything below this line back to report results', '═══════════════════════════════════════════════', `Total barcodes tested: ${total}`, ''];
  for (const s of sources) {
    summaryLines.push(`${sourceLabel[s]}:`);
    summaryLines.push(`  Usable matches: ${counts[s].usable_match} (${pct(counts[s].usable_match)})`);
    summaryLines.push(`  Found, no ingredients: ${counts[s].found_no_ingredients} (${pct(counts[s].found_no_ingredients)})`);
    summaryLines.push(`  Questionable quality (ingredients present, identity sparse — not counted as usable): ${counts[s].questionable_quality} (${pct(counts[s].questionable_quality)})`);
    summaryLines.push(`  Confirmed not found: ${counts[s].not_found} (${pct(counts[s].not_found)})`);
    summaryLines.push(`  Errors (rate-limited/auth/service): ${counts[s].error} (${pct(counts[s].error)})`);
    if (counts[s].skipped > 0) summaryLines.push(`  Skipped: ${counts[s].skipped} (${pct(counts[s].skipped)})`);
    summaryLines.push('');
  }
  summaryLines.push('═══════════════════════════════════════════════');
  const summary = summaryLines.join('\n');
  console.log(summary);

  writeFileSync(OUTPUT_JSON, JSON.stringify({ ranAt: new Date().toISOString(), inputFile: actualInputUsed, usingSampleFile: usingSample, inciApiKeySet: !!INCI_API_KEY, counts, results: allResults }, null, 2));
  console.log(`\nFull per-source, per-barcode detail written to:\n  ${OUTPUT_JSON}`);
}

main();
