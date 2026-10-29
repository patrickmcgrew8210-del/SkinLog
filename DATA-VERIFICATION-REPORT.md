# Catalog ingredient data — verification report

Covers every entry in `js/catalog.js` (`PRODUCT_CATALOG`). Read this before trusting, displaying as authoritative, or marking any entry "verified" in the app.

## What "verified" actually requires here

An entry only becomes `verified: true` in code once someone — a future session with real network access, or a person checking by hand — reads the ingredient list directly from an official manufacturer page or physical packaging, records the exact source URL and date in `sourceUrl`/`verifiedDate`, and flips the flag deliberately. **Nothing in this report does that.** This pass used `WebSearch` (reaches outside this environment's network sandbox) to cross-check entries against independent secondary sources — retailer reproductions of Drug Facts panels, FDA/NDC label copies, review sites — which is corroboration, not verification. Every entry below is still `verified: false` in the code.

## Why this distinction matters

This sandboxed session has no live network access to any brand site, Open Beauty Facts, or any ingredient API — confirmed directly, again, this session (`curl`/`WebFetch` to cerave.com, cetaphil.com, google.com all returned connection-refused/DNS failures before any research began). `WebSearch` is a separate pathway that does reach outside the sandbox, which is what made this pass possible at all — but a search snippet or a third-party retailer's copy of a label is not the same as reading the manufacturer's own page, and this report does not pretend otherwise.

## Status per entry

| Product | Status | Source type | Checked | Confidence | Notes |
|---|---|---|---|---|---|
| CeraVe Moisturizing Cream | Unverified | none this pass | — | — | Not checked this pass — unchanged from original build. |
| CeraVe Hydrating Facial Cleanser | Unverified | none this pass | — | — | Not checked this pass. |
| CeraVe Foaming Facial Cleanser | Unverified | none this pass | — | — | Not checked this pass. |
| **Cetaphil Gentle Skin Cleanser** | Unverified, **corrected** | Multiple independent reviews/articles (secondary) | 2026-10-29 | Medium | **The old entry reflected a pre-2022 formula** (Sodium Lauryl Sulfate + 3 parabens). Multiple independent sources describe a 2022 reformulation — SLS and all parabens removed, replaced with Sodium Cocoyl Isethionate, niacinamide/panthenol/glycerin added — still described as current in a December 2025 review. Updated to the newer formula. Not read from Cetaphil/Galderma's own page. |
| Cetaphil Moisturizing Cream | Unverified | none this pass | — | — | Not checked this pass. |
| Neutrogena Hydro Boost Water Gel | Unverified | none this pass | — | — | Not checked this pass. |
| **Neutrogena Ultra Sheer Dry-Touch SPF 55** | Unverified, **error fixed** | Multiple independent retailer Drug-Facts-panel reproductions (secondary) | 2026-10-29 | Medium | **The old entry wrongly included Oxybenzone.** Every retailer source found agrees the product is marketed oxybenzone-free, with Avobenzone 3% / Homosalate 10% / Octisalate 5% / Octocrylene 10%. Corrected. Not read from Neutrogena's own page. |
| La Roche-Posay Anthelios Melt-in Milk SPF 60 | Unverified, **open discrepancy flagged** | Mixed retailer + FDA/DailyMed-linked sources (secondary) | 2026-10-29 | Low | Sources disagree: the most consistent retailer copy (reportedly matching La Roche-Posay's own site) shows 4 filters, oxybenzone-free; other FDA/DailyMed-linked label sources found in the same search show a 5th filter (oxybenzone) and different percentages. Left as the 4-filter version but flagged as an unresolved discrepancy — may reflect different SKUs or label revisions. |
| La Roche-Posay Toleriane Double Repair Moisturizer | Unverified | none this pass | — | — | Not checked this pass. |
| Vanicream Moisturizing Cream | Unverified | none this pass | — | — | Not checked this pass. |
| **Differin Adapalene Gel 0.1%** | Unverified, **expanded** | Two independent reproductions of the US FDA label (secondary) | 2026-10-29 | Medium | Core vehicle confirmed and one ingredient added (Poloxamer 182 was already present; added nothing missing from the prior entry beyond matching wording). Flagged: a non-US (South Africa) label found in the same search lists Phenoxyethanol as an additional preservative not in the US version — regional variation exists. Not read from Galderma/DailyMed directly. |
| **PanOxyl Acne Foaming Wash 10% Benzoyl Peroxide** | Unverified, confirmed active only | Multiple retailer listings (secondary) | 2026-10-29 | Medium | Benzoyl Peroxide 10% as the sole active is consistent everywhere found. Inactive ingredients were NOT added: they differ by package size/SKU in the sources found (1oz vs 5.5oz show different inactive ingredients), and this catalog entry doesn't specify a size — flagged rather than guessed. |
| The Ordinary Niacinamide 10% + Zinc 1% | Unverified | none this pass | — | — | Not checked this pass. |
| The Ordinary Hyaluronic Acid 2% + B5 | Unverified | none this pass | — | — | Not checked this pass. |
| Paula's Choice 2% BHA Liquid Exfoliant | Unverified | none this pass | — | — | Not checked this pass. |

**9 of 15 entries were not touched this pass** — not because they're assumed fine, but because this pass prioritized the highest-stakes items (active drug ingredients: Differin, PanOxyl; and a category with a confirmed real error once checked: sunscreen actives) over spreading a fixed search budget thin across all 15 with no depth. None of the 15 should be presented to a user as independently verified.

## Safe to display as "verified" right now?

**No — none of them.** Every entry's UI badge correctly says "Unverified" and must keep saying so until a real primary-source check happens. The two corrections above (Neutrogena, Cetaphil) are improvements in accuracy relative to the previous unverified data, not promotions to verified status — they're still unverified, just less wrong.

## What a real verification pass would need to do, per entry

1. Open the manufacturer's own product page (or, better, a label image/PDF from DailyMed/FDA for anything with a drug facts panel) directly.
2. Confirm the exact variant/size/SKU — this pass found concrete evidence (PanOxyl, Anthelios) that ingredient lists can differ by package size or label revision for the same named product.
3. Record `sourceUrl` and `verifiedDate` on the catalog entry, and only then set `verified: true`.
4. Note explicitly if the source only gives active ingredients (common for OTC drug products) vs. a full INCI list.

## Workflow improvement made this pass

`js/catalog.js` now has a `corroboration` field (method/date/confidence/summary) distinct from `verified`, and a `knownIssues` array for flagged regional/SKU/reformulation uncertainty — both null/empty by default, both surfaced in the analyzer's detail view (an amber note for `knownIssues`, a neutral "cross-checked, not verified" note for `corroboration`) so this distinction is visible to the user, not just in source comments. `sourceUrl`/`verifiedDate` fields exist on every entry, null until a real verification fills them in.
