/* ══════════════════════════════════════════════
   CATALOG — a small, bundled starting set of well-known US OTC
   skincare products, for the searchable product selector.

   DATA QUALITY — READ BEFORE TRUSTING THIS FILE:
   This catalog was built in a network-restricted environment that
   could not reach any live product database, brand site, or ingredient
   API to verify a single entry this session (see
   product-data-sources.md for the specifics). Every `ingredients` list
   below is a REPRESENTATIVE set of well-known key ingredients for a
   long-stable, widely-published US formulation — drawn from general
   knowledge, not a fresh fetch — and is NOT claimed to be a complete,
   verified transcription of the current product label. Every entry
   therefore carries `verified: false` and `ingredientsComplete: false`.
   Formulas also change over time; always defer to the actual product
   packaging. Treat this as a useful starting point for search and
   scoring, not an authoritative ingredient database.

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
    ingredients: ['Cetyl Alcohol', 'Propylene Glycol', 'Sodium Lauryl Sulfate', 'Stearyl Alcohol', 'Methylparaben', 'Propylparaben', 'Butylparaben'],
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
    ingredients: ['Avobenzone', 'Homosalate', 'Octisalate', 'Octocrylene', 'Oxybenzone'],
    note: 'Active sunscreen filters listed only (chemical/organic filters) — the full inactive-ingredients list is not included here.',
  },
  {
    id: 'cat-larocheposay-anthelios-spf60',
    brand: 'La Roche-Posay', name: 'Anthelios Melt-in Milk Sunscreen SPF 60',
    catalogCategory: 'sunscreen',
    ingredients: ['Avobenzone', 'Homosalate', 'Octisalate', 'Octocrylene'],
    note: 'Active sunscreen filters listed only — the full inactive-ingredients list is not included here.',
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
    ingredients: ['Adapalene', 'Carbomer 940', 'Edetate Disodium', 'Methylparaben', 'Propylene Glycol'],
    note: 'Adapalene is the active ingredient at 0.1% (an exact, label-stated concentration — not estimated).',
  },
  {
    id: 'cat-panoxyl-10-wash',
    brand: 'PanOxyl', name: 'Acne Foaming Wash 10% Benzoyl Peroxide',
    catalogCategory: 'acneTreatment',
    ingredients: ['Benzoyl Peroxide'],
    note: 'Benzoyl Peroxide is the active ingredient at 10% (an exact, label-stated concentration — not estimated). Rinse-off wash, not a leave-on treatment.',
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

// Every catalog entry shares the same unverified data-quality posture —
// applied here once rather than repeated on each entry above.
PRODUCT_CATALOG.forEach(p => {
  p.verified = false;
  p.ingredientsComplete = false;
  p.dataSource = 'catalog_unverified';
  p.dataSourceNote = 'Representative key-ingredient list from general knowledge of a well-known, stable formulation — not independently re-verified against current packaging or a live database this session.';
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
