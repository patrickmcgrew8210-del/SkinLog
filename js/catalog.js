/* ══════════════════════════════════════════════
   CATALOG — search/filter/category logic over the product data in
   js/catalog-data.js (a generated data file — see its own header for
   data-quality details and DATA-VERIFICATION-REPORT.md for how it was
   compiled). This file is pure logic, no product data, so a future
   catalog refresh only needs to replace catalog-data.js, and a much
   larger catalog (the data file's own header: "a longer-term
   architecture that can support thousands") only needs that one data
   file split further (e.g. one per brand, concatenated at build time)
   without this file changing at all.

   Categories here are the user-facing browse/filter taxonomy — distinct
   from PRODUCT_CATEGORIES in constants.js (the 4 fixed routine-step
   slots + other), which is what My Products actually stores against.
   catalogCategoryToRoutineCategory() below maps one onto the other when
   a catalog entry is added to My Products, so the existing
   routine/chip/trends machinery needs no changes.
══════════════════════════════════════════════ */

const CATALOG_CATEGORIES = ['cleanser', 'moisturizer', 'sunscreen', 'acneTreatment', 'serum', 'toner', 'exfoliant', 'retinoid', 'spotTreatment', 'other'];
const CATALOG_CATEGORY_LABELS = {
  cleanser: 'Cleansers', moisturizer: 'Moisturizers', sunscreen: 'Sunscreens',
  acneTreatment: 'Acne Treatments', serum: 'Serums', toner: 'Toners',
  exfoliant: 'Exfoliants', retinoid: 'Retinoids', spotTreatment: 'Spot Treatments', other: 'Other',
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
    exfoliant: 'treatment',
    retinoid: 'treatment',
    spotTreatment: 'treatment',
    other: 'other',
  }[catalogCategory] || 'other';
}

// Use-case/audience tags — a second, independent filter dimension from
// catalogCategory (a product's physical TYPE). A product can carry any
// number of these; none are mutually exclusive with category.
const CATALOG_TAGS = ['sensitive-skin', 'fragrance-free', 'body', 'baby-kids', 'for-dry-skin', 'for-oily-skin'];
const CATALOG_TAG_LABELS = {
  'sensitive-skin': 'Sensitive skin', 'fragrance-free': 'Fragrance-free', body: 'Body',
  'baby-kids': 'Baby/kids', 'for-dry-skin': 'For dry skin', 'for-oily-skin': 'For oily skin',
};

function getCatalogProduct(id) {
  return PRODUCT_CATALOG.find(p => p.id === id) || null;
}

/** All distinct brand names in the catalog, alphabetically — used to
 *  populate the brand filter dropdown in the analyzer's search view. */
function getCatalogBrands() {
  return [...new Set(PRODUCT_CATALOG.map(p => p.brand))].sort((a, b) => a.localeCompare(b));
}

/** Search by brand/name text, optionally narrowed by catalog category,
 *  a specific brand, a use-case tag, and whether to require the
 *  product to have an ingredient list at all (a quick way for someone
 *  who wants a real score right now to filter out name-only stubs,
 *  without those stubs being hidden from search by default — a
 *  product requirement: an unverified/unavailable-formula product
 *  must still be findable, just clearly labeled). */
function searchCatalog(query, category, opts) {
  opts = opts || {};
  const q = (query || '').trim().toLowerCase();
  return PRODUCT_CATALOG.filter(p => {
    if (category && category !== 'all' && p.catalogCategory !== category) return false;
    if (opts.brand && opts.brand !== 'all' && p.brand !== opts.brand) return false;
    if (opts.tag && opts.tag !== 'all' && !(p.tags || []).includes(opts.tag)) return false;
    if (opts.requireIngredients && !(p.ingredients && p.ingredients.length)) return false;
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || `${p.brand} ${p.name}`.toLowerCase().includes(q);
  });
}
