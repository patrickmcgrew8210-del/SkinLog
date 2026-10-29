// SkinFolio — barcode-to-product lookup (Phase 3, Stage A product scanner).
//
// A thin, read-only proxy to Open Beauty Facts. This runs server-side
// rather than being called directly from the browser for one concrete
// reason: Open Beauty Facts' terms of use require a descriptive
// User-Agent on every API call, and browsers refuse to let fetch()/XHR
// set that header at all (it's on the forbidden-header-name list) — so
// there is no way to comply with that requirement from client-side JS.
//
// No secrets and no API key are needed: Open Beauty Facts is a free,
// open database (ODbL-licensed). Callers must be signed-in app users
// (this function is deployed with the default JWT verification on —
// see the deployment note in the repo root report), which keeps this
// from being an anonymous open proxy without adding any per-user
// tracking of its own.

const OBF_FIELDS = "code,product_name,brands,ingredients_text,categories_tags,image_front_small_url";
const USER_AGENT = "SkinFolio-ProductScanner/1.0 (+https://skinlog.app)";

// The app is only ever served from these origins today — production and
// the local dev server used for manual/browser testing. Tightened here
// rather than left as a wildcard since this function is reachable from
// any browser, not just this app.
const ALLOWED_ORIGINS = new Set([
  "https://skinlog.app",
  "http://localhost:8931",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const allowOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://skinlog.app";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

Deno.serve(async (req) => {
  const headers = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers });
  }

  let barcode: unknown;
  try {
    ({ barcode } = await req.json());
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers });
  }

  // EAN-8/EAN-13/UPC-A/UPC-E are 8-14 digits — reject anything else
  // before it ever reaches Open Beauty Facts.
  if (typeof barcode !== "string" || !/^\d{8,14}$/.test(barcode)) {
    return new Response(JSON.stringify({ error: "Invalid barcode" }), { status: 400, headers });
  }

  // Open Beauty Facts (and its sibling Open Food Facts / Open Pet Food
  // Facts — same underlying engine) is documented and independently
  // observed to return a JSON body — {"status":0,"status_verbose":
  // "product not found",...} — on BOTH a 200 and a 404 for a missing
  // product. A 404 here is not automatically a service failure: it's
  // this API's documented way of saying "not found" at least some of
  // the time. (Found and fixed in the coverage script first — see
  // scripts/check-obf-coverage.mjs and commit f0bb723 — this is the
  // same fix applied here, since the Edge Function had the identical
  // bug: checking `!response.ok` before ever reading the body meant a
  // confirmed not-found delivered via 404 was reported to the client
  // as a lookup failure instead of "not found.")
  let obfText: string;
  try {
    const obfResponse = await fetch(
      `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json?fields=${OBF_FIELDS}`,
      { headers: { "User-Agent": USER_AGENT } },
    );
    obfText = await obfResponse.text();
  } catch {
    return new Response(JSON.stringify({ error: "lookup_failed" }), { status: 502, headers });
  }

  let data: any = null;
  try {
    data = JSON.parse(obfText);
  } catch {
    // Not JSON at all — a genuine service problem (an HTML error page,
    // a malformed response), not a confirmed not-found.
    return new Response(JSON.stringify({ error: "lookup_failed" }), { status: 502, headers });
  }

  // status === 1 means Open Beauty Facts has this barcode; 0 (or no
  // product) means it genuinely doesn't — trust the body's own status
  // field over whatever HTTP status it arrived on.
  if (data.status !== 1 || !data.product) {
    return new Response(JSON.stringify({ found: false, barcode }), { headers });
  }

  const p = data.product;
  const ingredientsText = typeof p.ingredients_text === "string" ? p.ingredients_text.trim() : "";

  return new Response(JSON.stringify({
    found: true,
    barcode,
    name: p.product_name || null,
    brand: p.brands || null,
    ingredientsText,
    ingredientsAvailable: ingredientsText.length > 0,
    categories: Array.isArray(p.categories_tags) ? p.categories_tags : [],
    imageUrl: p.image_front_small_url || null,
  }), { headers });
});
