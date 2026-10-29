/* ══════════════════════════════════════════════
   CATALOG — a small, bundled starting set of well-known US OTC
   skincare products, for the searchable product selector.

   DATA QUALITY — READ BEFORE TRUSTING THIS FILE:
   This catalog was originally built in a network-restricted
   environment with zero live access to any product database, brand
   site, or ingredient API (confirmed directly, repeatedly, across
   multiple sessions — see product-data-sources.md). Every entry was
   therefore marked `verified: false` from general knowledge, not a
   fresh fetch.

   A later pass used WebSearch (which, unlike direct fetches, reaches
   outside this sandbox) to cross-check a subset of entries against
   independent retailer/regulatory-label reproductions and corroborate
   or correct them. This is NOT the same as reading an official
   manufacturer source directly — no entry here has had that done, and
   every entry STILL carries `verified: false`. What changed is a new,
   honest middle tier: `corroboration`, recorded per entry below,
   null when no such check has been attempted at all, and otherwise an
   object with what was checked, when, against what kind of source,
   and at what confidence — see DATA-VERIFICATION-REPORT.md for the
   full writeup, including two real issues this pass caught: Neutrogena
   Ultra Sheer SPF 55 was wrongly listing Oxybenzone (multiple
   consistent retailer Drug-Facts reproductions say the product is
   marketed oxybenzone-free) — fixed. Cetaphil Gentle Skin Cleanser's
   entry reflected a pre-2022 formula; multiple independent sources
   describe a 2022 reformulation (SLS and all three parabens removed,
   replaced with Sodium Cocoyl Isethionate as the surfactant, with
   niacinamide/panthenol/glycerin added) that appears to still be
   current as of a December 2025 review — updated to that version,
   still unverified against Galderma's own page.

   `knownIssues` on an entry flags things this pass surfaced that
   don't have a clean fix: ingredient lists that vary by package size,
   region, or label-revision (sunscreen actives especially — several
   products' exact filter percentages differ across the sources found
   for them), or formulas marked unstable/under active reformulation.

   Categories here are the user-facing browse/filter taxonomy
   (cleanser/moisturizer/sunscreen/acneTreatment/serum/toner/other) —
   distinct from PRODUCT_CATEGORIES in constants.js (the 4 fixed
   routine-step slots + other), which is what My Products actually
   stores against. catalogCategoryToRoutineCategory() below maps one
   onto the other when a catalog entry is added to My Products, so the
   existing routine/chip/trends machinery needs no changes.
══════════════════════════════════════════════ */

const CATALOG_CATEGORIES = ['cleanser', 'moisturizer', 'sunscreen', 'acneTreatment', 'serum', 'toner', 'other'];
const CATALOG_CATEGORY_LABELS = {
  cleanser: 'Cleansers', moisturizer: 'Moisturizers', sunscreen: 'Sunscreens',
  acneTreatment: 'Acne Treatments', serum: 'Serums', toner: 'Toners', other: 'Other',
};

/** Maps a catalog browse-category onto the existing 4-slot routine
 *  category (PRODUCT_CATEGORIES in constants.js) used by My Products,
 *  the Log form's routine chips, and Trends' product-impact cards. */
function catalogCategoryToRoutineCategory(catalogCategory) {
  return {
    cleanser: 'cleanser',
    moisturizer: 'moisturizer',
    sunscreen: 'spf',
    acneTreatment: 'treatment',
    serum: 'treatment',
    toner: 'treatment',
    other: 'other',
  }[catalogCategory] || 'other';
}

const PRODUCT_CATALOG = [
  {
    id: 'cat-cerave-moisturizing-cream',
    brand: 'CeraVe', name: 'Moisturizing Cream',
    catalogCategory: 'moisturizer',
    ingredients: ['Glycerin', 'Cetearyl Alcohol', 'Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Hyaluronic Acid', 'Dimethicone', 'Petrolatum', 'Cholesterol', 'Phenoxyethanol', 'Methylparaben', 'Propylparaben'],
  },
  {
    id: 'cat-cerave-hydrating-cleanser',
    brand: 'CeraVe', name: 'Hydrating Facial Cleanser',
    catalogCategory: 'cleanser',
    ingredients: ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Hyaluronic Acid', 'Glycerin', 'Cetearyl Alcohol', 'Sodium Lauroyl Lactylate', 'Phenoxyethanol'],
  },
  {
    id: 'cat-cerave-foaming-cleanser',
    brand: 'CeraVe', name: 'Foaming Facial Cleanser',
    catalogCategory: 'cleanser',
    ingredients: ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Niacinamide', 'Hyaluronic Acid', 'Glycerin', 'Cocamidopropyl Hydroxysultaine', 'Phenoxyethanol'],
  },
  {
    id: 'cat-cetaphil-gentle-cleanser',
    brand: 'Cetaphil', name: 'Gentle Skin Cleanser',
    catalogCategory: 'cleanser',
    // UPDATED from a pre-2022 formula (Sodium Lauryl Sulfate + 3
    // parabens) after this pass found multiple independent sources
    // describing a 2022 reformulation that removed both, which a
    // December 2025 review still describes as current. Not
    // independently confirmed against Galderma's own page.
    ingredients: ['Glycerin', 'Niacinamide', 'Panthenol', 'Sodium Cocoyl Isethionate', 'Cetyl Alcohol'],
    knownIssues: ['Reformulated ~2022 — replaces an older Sodium Lauryl Sulfate + paraben formula that may still be in some sources/old stock. See DATA-VERIFICATION-REPORT.md.'],
    corroboration: {
      checkedDate: '2026-10-29', method: 'websearch_secondary_sources', confidence: 'medium',
      summary: 'Multiple independent third-party sources (reviews, a December 2025 article) consistently describe the same 2022 reformulation and ingredient changes. No official Cetaphil/Galderma page was read directly.',
    },
  },
  {
    id: 'cat-cetaphil-moisturizing-cream',
    brand: 'Cetaphil', name: 'Moisturizing Cream',
    catalogCategory: 'moisturizer',
    ingredients: ['Glycerin', 'Petrolatum', 'Mineral Oil', 'Panthenol', 'Macadamia Seed Oil', 'Tocopheryl Acetate'],
  },
  {
    id: 'cat-neutrogena-hydro-boost',
    brand: 'Neutrogena', name: 'Hydro Boost Water Gel',
    catalogCategory: 'moisturizer',
    ingredients: ['Hyaluronic Acid', 'Dimethicone', 'Glycerin', 'Phenoxyethanol'],
  },
  {
    id: 'cat-neutrogena-ultra-sheer-spf55',
    brand: 'Neutrogena', name: 'Ultra Sheer Dry-Touch Sunscreen SPF 55',
    catalogCategory: 'sunscreen',
    // CORRECTED: previously (wrongly) included Oxybenzone. Multiple
    // independent retailer reproductions of the Drug Facts panel
    // consistently show this product marketed as oxybenzone-free.
    ingredients: ['Avobenzone', 'Homosalate', 'Octisalate', 'Octocrylene'],
    note: 'Active sunscreen filters only (chemical/organic) — the full inactive-ingredients list is not included here. Marketed oxybenzone-free.',
    corroboration: {
      checkedDate: '2026-10-29', method: 'websearch_secondary_sources', confidence: 'medium',
      summary: 'Avobenzone 3% / Homosalate 10% / Octisalate 5% / Octocrylene 10%, oxybenzone-free, consistently reproduced across multiple independent retailer Drug-Facts-panel copies. No official Neutrogena page was read directly.',
    },
  },
  {
    id: 'cat-larocheposay-anthelios-spf60',
    brand: 'La Roche-Posay', name: 'Anthelios Melt-in Milk Sunscreen SPF 60',
    catalogCategory: 'sunscreen',
    ingredients: ['Avobenzone', 'Homosalate', 'Octisalate', 'Octocrylene'],
    note: 'Active sunscreen filters listed only — the full inactive-ingredients list is not included here.',
    knownIssues: ['Some FDA/DailyMed-linked label versions found during research also list Oxybenzone and different filter percentages — retailer copy describes this product as oxybenzone-free, but label versions appear to differ by SKU/revision. See DATA-VERIFICATION-REPORT.md.'],
    corroboration: {
      checkedDate: '2026-10-29', method: 'websearch_secondary_sources', confidence: 'low',
      summary: 'The 4-filter, oxybenzone-free version matches the most consistent retailer copy and is reported to match La Roche-Posay\'s own site content, but other label sources found in the same search list a 5th filter (oxybenzone) and different percentages — treated as a real open discrepancy, not resolved.',
    },
  },
  {
    id: 'cat-larocheposay-toleriane-double-repair',
    brand: 'La Roche-Posay', name: 'Toleriane Double Repair Moisturizer',
    catalogCategory: 'moisturizer',
    ingredients: ['Niacinamide', 'Glycerin', 'Ceramide NP', 'Dimethicone'],
  },
  {
    id: 'cat-vanicream-moisturizing-cream',
    brand: 'Vanicream', name: 'Moisturizing Cream',
    catalogCategory: 'moisturizer',
    ingredients: ['Petrolatum', 'Sorbitol', 'Glycerin', 'Sunflower Seed Oil'],
    note: 'Marketed free of dyes, fragrance, parabens, formaldehyde, and lanolin.',
  },
  {
    id: 'cat-differin-adapalene-gel',
    brand: 'Differin', name: 'Adapalene Gel 0.1%',
    catalogCategory: 'acneTreatment',
    ingredients: ['Adapalene', 'Carbomer 940', 'Edetate Disodium', 'Methylparaben', 'Poloxamer 182', 'Propylene Glycol'],
    note: 'Adapalene is the active ingredient at 0.1% (an exact, label-stated concentration — not estimated).',
    knownIssues: ['The US FDA label also lists Purified Water and Sodium Hydroxide as inactive ingredients (omitted here as unremarkable for scoring). An older non-US (South Africa) label lists Phenoxyethanol as an additional preservative not present in the US version — inactive-ingredient lists differ by region.'],
    corroboration: {
      checkedDate: '2026-10-29', method: 'websearch_secondary_sources', confidence: 'medium',
      summary: 'The core inactive-ingredient vehicle matches two independent reproductions of the US FDA label (via NDC 0299-4910). No official Galderma/DailyMed page was read directly.',
    },
  },
  {
    id: 'cat-panoxyl-10-wash',
    brand: 'PanOxyl', name: 'Acne Foaming Wash 10% Benzoyl Peroxide',
    catalogCategory: 'acneTreatment',
    ingredients: ['Benzoyl Peroxide'],
    note: 'Benzoyl Peroxide is the active ingredient at 10% (an exact, label-stated concentration — not estimated). Rinse-off wash, not a leave-on treatment.',
    knownIssues: ['Inactive ingredients differ by package size/SKU found during research (1oz listings show Water + T-butyl Alcohol; 5.5oz listings show Aqua + Oleic Acid, or Water + T-butyl Alcohol with no oleic acid depending on retailer) — this catalog entry does not specify a size/SKU and only the confirmed active ingredient is listed.'],
    corroboration: {
      checkedDate: '2026-10-29', method: 'websearch_secondary_sources', confidence: 'medium',
      summary: 'Benzoyl Peroxide 10% as the sole active is consistent across every retailer listing found. No manufacturer-run label page was found; inactive ingredients were not added here due to the SKU-level disagreement above.',
    },
  },
  {
    id: 'cat-ordinary-niacinamide',
    brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%',
    catalogCategory: 'serum',
    ingredients: ['Niacinamide', 'Zinc PCA', 'Pentylene Glycol'],
    note: 'Niacinamide 10% / Zinc PCA 1% are label-stated concentrations, not estimated.',
  },
  {
    id: 'cat-ordinary-hyaluronic-acid',
    brand: 'The Ordinary', name: 'Hyaluronic Acid 2% + B5',
    catalogCategory: 'serum',
    ingredients: ['Sodium Hyaluronate', 'Panthenol'],
  },
  {
    id: 'cat-paulaschoice-2pct-bha',
    brand: "Paula's Choice", name: '2% BHA Liquid Exfoliant',
    catalogCategory: 'toner',
    ingredients: ['Salicylic Acid', 'Methylpropanediol', 'Camellia Oleifera Leaf Extract'],
    note: 'Salicylic Acid 2% is a label-stated concentration, not estimated. A leave-on liquid exfoliant, not a traditional toner.',
  },
];

// Every catalog entry shares the same unverified data-quality posture
// — applied here once rather than repeated on each entry above.
// `corroboration` and `knownIssues` are set per-entry where a
// WebSearch cross-check was actually attempted (see each entry and
// DATA-VERIFICATION-REPORT.md); every other entry defaults to null/[]
// here, meaning explicitly "not yet checked," not "checked and clean."
// `sourceUrl`/`verifiedDate` stay null until a real official source is
// independently read and `verified` is deliberately flipped to true —
// nothing in this file does that on its own.
PRODUCT_CATALOG.forEach(p => {
  p.verified = false;
  p.ingredientsComplete = false;
  p.dataSource = 'catalog_unverified';
  p.dataSourceNote = 'Representative key-ingredient list from general knowledge of a well-known, stable formulation — not independently re-verified against current packaging or a live database this session.';
  if (p.corroboration === undefined) p.corroboration = null;
  if (p.knownIssues === undefined) p.knownIssues = [];
  p.sourceUrl = null;
  p.verifiedDate = null;
});

function getCatalogProduct(id) {
  return PRODUCT_CATALOG.find(p => p.id === id) || null;
}

/** Simple, dependency-free search: matches brand or name (case-
 *  insensitive, substring), optionally narrowed by catalog category. */
function searchCatalog(query, category) {
  const q = (query || '').trim().toLowerCase();
  return PRODUCT_CATALOG.filter(p => {
    if (category && category !== 'all' && p.catalogCategory !== category) return false;
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || `${p.brand} ${p.name}`.toLowerCase().includes(q);
  });
}
