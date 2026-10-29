# Product ingredient data sources — research notes

Phase 2 research for the Product Ingredient Analyzer. This documents what
was actually checked, what wasn't, and why the feature is built the way
it is. Written from a network-restricted environment — see the caveat in
each section before treating anything here as independently re-verified.

## Sources evaluated

### Open Beauty Facts (`world.openbeautyfacts.org`) — primary source, in use

- **What it is:** a free, crowd-sourced cosmetics database, Open Food
  Facts' sibling project. ODbL-licensed (database) + CC-BY-SA (images).
- **Barcode lookup:** yes — `GET /api/v2/product/{barcode}.json`.
- **Ingredients:** present when contributed, absent otherwise — coverage
  is not guaranteed per barcode.
- **Coverage:** small in absolute terms. The project's own homepage
  shows roughly 77,000 products globally, across every category and
  country — versus 4M+ for the food side. No official breakdown by
  country or category was found, so US-skincare-specific coverage is
  unverified by the source itself.
- **Real test result (this app's own 17-barcode sample):** 6/17 found
  (5 with an ingredient list, 1 without), 11/17 confirmed not-found.
  Those 17 barcodes were sourced online rather than read off physical
  packaging, so treat this as preliminary, not a reliable benchmark —
  see `scripts/check-obf-coverage.mjs` to re-run it against a verified
  list.
- **Pricing/limits:** free, no key. Documented rate limit: 15 product
  reads/minute/IP. A custom `User-Agent` header is required on every
  call — browsers refuse to let client-side JS set that header at all,
  which is why the lookup runs through a server-side Edge Function
  (`supabase/functions/lookup-product/index.ts`) instead of being called
  directly from `js/scanner.js`.
- **Not-found behavior (important, previously a real bug):** a missing
  product can come back as HTTP 404 *or* HTTP 200, both with a real JSON
  body (`{"status":0,"status_verbose":"product not found"}`). Code that
  checks `!response.ok` before reading the body misclassifies a 404
  not-found as a service error. This was found and fixed in the
  coverage script (commit `f0bb723`) and is fixed in the Edge Function
  in this same change (see `lookup-product/index.ts`).

### INCI API (`inciapi.com`) — evaluated, not integrated in v1

- **What it is:** a commercial API purpose-built for cosmetics —
  barcode lookup plus ingredient/safety analysis, and a barcode-free
  `POST /v1/analyze` endpoint that takes a raw ingredient list.
- **Free tier:** 2,000 requests/month, no credit card, per their
  pricing page.
- **Paid tiers:** pay-as-you-go at $0.003/matched lookup; named
  subscription tiers exist (10k/60k/150k requests/month) but their
  exact dollar prices could not be confirmed from any source reachable
  during this research — check `inciapi.com/pricing` directly.
- **Auth:** API key via `X-API-Key` header, issued from their dashboard.
  **This repo never generates, stores, or commits one.**
- **Coverage caveat, from their own blog:** ~1.29M products in their
  barcode index, but only ~35K distinct ingredients catalogued with
  ~49% safety-score coverage — meaning a real fraction of their own
  barcode matches may still lack usable ingredient data. Unverified
  first-hand.
- **Why not integrated yet:** it requires an account only the app owner
  can create (no credentials were available to this build), and a
  second live Edge Function target is a second thing that can break or
  need deploying. `scripts/compare-ingredient-sources.mjs` is already
  built and ready — set `INCI_API_KEY` and run it to get a real
  head-to-head number against Open Beauty Facts before deciding whether
  it's worth adding as a paid-tier fallback. It stays free up to
  2,000 lookups/month either way.

### ProductGuru — evaluated, not integrated

- **The URL originally given for this source, `www.product-guru.org`,
  returns no search results anywhere and could not be confirmed to
  exist.** The barcode/product-lookup service actually findable under
  the name "ProductGuru" lives at a *different* domain, `myproduct.guru`.
  Confirm which one was intended before using it for anything.
- Every description found of that service (including its own
  submission to the public-apis.org list) frames it as **product
  identity + government product-recall data** (EU Safety Gate, US FDA,
  US CPSC) — a recall-lookup service, not an ingredients database. No
  source found mentions an ingredients field at all.
- **Conclusion: not usable for this feature regardless of its general
  catalog size (44M+ products).** A large barcode catalog doesn't
  substitute for cosmetic-ingredient data it was never built to hold.
  Not integrated.

## A hard limitation of this research

This build ran in a network-restricted sandbox that could not reach
`world.openbeautyfacts.org`, `inciapi.com`, `myproduct.guru`, or this
project's own Supabase instance — confirmed directly (connection
refused / DNS failure on every one), consistent with every prior session
working on this feature. Everything above comes from documentation
fragments surfaced by web search, not a live reading of each source's
own docs page, and none of it was re-verified by an actual API call in
this session. The **initial product catalog** (`js/catalog.js`) is
built the same way: ingredient lists for well-known, long-stable US
OTC skincare formulations (CeraVe, Cetaphil, Neutrogena, etc.), drawn
from general trained knowledge rather than a URL fetched this session.
Every catalog entry is marked `verified: false` with an explicit note
to that effect — see that file's header comment. Treat the catalog as a
useful starting point, not an authoritative source, until someone with
real network access cross-checks each entry against the product's own
packaging or a live database and flips that flag.

## Recommendation

- **Primary, as built:** Open Beauty Facts. Free forever, already
  wired in, and the 404-handling bug that undercounted it is now fixed.
- **Always-available fallback:** manual entry (brand/name + pasted
  ingredient list) and a small bundled catalog of well-known products —
  this is not a "nice to have," it's required, since Open Beauty
  Facts' real-world hit rate on this app's own test was roughly a
  third of barcodes tried.
- **Worth evaluating, not yet integrated:** INCI API, once someone with
  an account can run `scripts/compare-ingredient-sources.mjs` for a
  real number. Stays free up to 2,000 lookups/month.
- **Not recommended:** ProductGuru/myproduct.guru — no evidence it
  carries ingredient data at all.
- **Cost at any of the tested volumes (100 / 1,000 / 10,000
  lookups/month) with the current architecture: $0.** Open Beauty
  Facts has no paid tier. Caching a product's ingredient list after
  its first successful lookup (this build does, via the catalog/My
  Products entry) keeps repeat scans from costing anything further,
  which matters more than raw scan volume if INCI API is ever added.
