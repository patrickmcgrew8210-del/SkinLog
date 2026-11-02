/* ══════════════════════════════════════════════
   INGREDIENT RULES — a small, curated, deterministic reference table
   mapping common skincare ingredients to general roles (humectant,
   barrier-support, acne-treatment active, sun filter, possible
   irritant/sensitizer). This is the ONLY thing the scoring engine
   (js/scoring.js) reads to decide what an ingredient "does" — nothing
   here is AI-generated, and nothing here is a verdict on any specific
   product or formulation.

   Ground rules this table follows throughout (do not violate these
   when editing it):
   - No ingredient is tagged as universally good or bad. 'possible_*'
     tags describe a GENERAL population-level pattern, not a guarantee
     for any individual or any specific finished product.
   - No concentration is ever implied by a role tag — concentration
     matters enormously (e.g. retinoids, AHA/BHA) and this table has no
     way to know a product's actual %, so it never claims to.
   - "Comedogenic" lists from decades-old rabbit-ear assays are widely
     considered unreliable for real-world finished products; ingredients
     with that reputation are tagged 'debated_comedogenic', never
     'comedogenic', and the scoring engine must never treat that tag as
     a hard negative on its own.
══════════════════════════════════════════════ */

const INGREDIENT_ROLES = {
  // role -> short, user-facing description of what it means to match it
  humectant: 'Draws and holds moisture in the skin',
  barrier_support: 'Associated with supporting the skin barrier',
  occlusive: 'Seals in moisture by sitting on the skin\'s surface',
  acne_active: 'A recognized over-the-counter or prescription acne-treatment active',
  exfoliant: 'Chemically exfoliates the skin surface',
  sun_filter: 'A UV filter (chemical or mineral)',
  brightening: 'Commonly associated with an even-tone/brightening goal',
  oil_control: 'Commonly associated with reducing visible oiliness/shine',
  redness_soothing: 'Commonly associated with calming visible redness or irritation',
  texture: 'Commonly associated with smoothing skin texture over time',
  anti_aging: 'Commonly associated with a fine-lines/firmness/anti-aging goal',
  possible_irritant: 'Sometimes reported as irritating, especially at higher concentrations or for sensitive skin — not universal',
  possible_sensitizer: 'A recognized contact-allergen category for some people — not a predictor for any individual',
  debated_comedogenic: 'Has an older reputation for clogging pores from assays not well validated for finished products — evidence is mixed, not settled',
  fragrance: 'A fragrance ingredient — a common, though not universal, source of sensitivity',
};

/** Each entry: canonical `name`, optional `aliases` (other INCI/common
 *  names the same ingredient is listed under), and `roles` (keys into
 *  INGREDIENT_ROLES above). Intentionally small — this is a starting
 *  reference table, not an attempt at a complete INCI dictionary. */
const INGREDIENT_RULES = [
  { name: 'Glycerin', aliases: ['glycerine', 'glycerol'], roles: ['humectant'] },
  { name: 'Hyaluronic Acid', aliases: ['sodium hyaluronate', 'hyaluronan'], roles: ['humectant'] },
  { name: 'Sodium Hyaluronate', aliases: ['hyaluronic acid'], roles: ['humectant'] },
  { name: 'Panthenol', aliases: ['pro-vitamin b5', 'vitamin b5'], roles: ['humectant', 'barrier_support', 'redness_soothing'] },
  { name: 'Propylene Glycol', roles: ['humectant'], notes: ['possible_irritant'] },
  { name: 'Pentylene Glycol', roles: ['humectant'] },
  { name: 'Sorbitol', roles: ['humectant'] },
  { name: 'Urea', roles: ['humectant', 'exfoliant'] },

  { name: 'Ceramide NP', aliases: ['ceramide 3'], roles: ['barrier_support'] },
  { name: 'Ceramide AP', roles: ['barrier_support'] },
  { name: 'Ceramide EOP', roles: ['barrier_support'] },
  { name: 'Cholesterol', roles: ['barrier_support'] },
  { name: 'Niacinamide', aliases: ['vitamin b3', 'nicotinamide'], roles: ['barrier_support', 'brightening', 'oil_control', 'redness_soothing'] },
  { name: 'Squalane', roles: ['barrier_support', 'occlusive'] },
  { name: 'Shea Butter', aliases: ['butyrospermum parkii'], roles: ['barrier_support', 'occlusive'] },
  { name: 'Sunflower Seed Oil', aliases: ['helianthus annuus seed oil'], roles: ['barrier_support'] },

  { name: 'Dimethicone', roles: ['occlusive'] },
  { name: 'Petrolatum', aliases: ['petroleum jelly'], roles: ['occlusive'] },
  { name: 'Mineral Oil', aliases: ['paraffinum liquidum'], roles: ['occlusive'] },
  { name: 'Cetearyl Alcohol', roles: ['occlusive'] },
  { name: 'Cetyl Alcohol', roles: ['occlusive'] },
  { name: 'Stearyl Alcohol', roles: ['occlusive'] },

  { name: 'Benzoyl Peroxide', roles: ['acne_active'], notes: ['possible_irritant'] },
  { name: 'Salicylic Acid', aliases: ['bha'], roles: ['acne_active', 'exfoliant'], notes: ['possible_irritant'] },
  { name: 'Adapalene', roles: ['acne_active', 'texture'], notes: ['possible_irritant'] },
  { name: 'Tretinoin', aliases: ['retinoic acid'], roles: ['acne_active', 'anti_aging', 'texture'], notes: ['possible_irritant'] },
  { name: 'Retinol', roles: ['acne_active', 'brightening', 'anti_aging', 'texture'], notes: ['possible_irritant'] },
  { name: 'Azelaic Acid', roles: ['acne_active', 'brightening', 'redness_soothing'] },
  { name: 'Sulfur', roles: ['acne_active'], notes: ['possible_irritant'] },
  { name: 'Zinc PCA', roles: ['acne_active', 'oil_control'] },
  { name: 'Retinaldehyde', aliases: ['retinal'], roles: ['acne_active', 'anti_aging', 'texture'], notes: ['possible_irritant'] },
  { name: 'Bakuchiol', roles: ['anti_aging', 'texture'] },
  { name: 'Tea Tree Oil', aliases: ['melaleuca alternifolia leaf oil', 'melaleuca alternifolia'], roles: ['acne_active'], notes: ['possible_irritant', 'possible_sensitizer'] },

  { name: 'Glycolic Acid', roles: ['exfoliant', 'texture'], notes: ['possible_irritant'] },
  { name: 'Lactic Acid', roles: ['exfoliant', 'humectant', 'texture'], notes: ['possible_irritant'] },
  { name: 'Mandelic Acid', roles: ['exfoliant', 'texture'] },
  { name: 'Gluconolactone', roles: ['exfoliant', 'texture'] },
  { name: 'Lactobionic Acid', roles: ['exfoliant', 'texture'] },

  { name: 'Avobenzone', roles: ['sun_filter'] },
  { name: 'Homosalate', roles: ['sun_filter'] },
  { name: 'Octisalate', roles: ['sun_filter'] },
  { name: 'Octocrylene', roles: ['sun_filter'], notes: ['possible_sensitizer'] },
  { name: 'Oxybenzone', roles: ['sun_filter'], notes: ['possible_sensitizer'] },
  { name: 'Zinc Oxide', roles: ['sun_filter', 'barrier_support'] },
  { name: 'Titanium Dioxide', roles: ['sun_filter'] },

  { name: 'Fragrance', aliases: ['parfum', 'perfume'], roles: ['fragrance'], notes: ['possible_irritant', 'possible_sensitizer'] },
  { name: 'Essential Oil', roles: ['fragrance'], notes: ['possible_irritant', 'possible_sensitizer'] },
  { name: 'Limonene', roles: ['fragrance'], notes: ['possible_sensitizer'] },
  { name: 'Linalool', roles: ['fragrance'], notes: ['possible_sensitizer'] },
  { name: 'Citronellol', roles: ['fragrance'], notes: ['possible_sensitizer'] },
  { name: 'Alcohol Denat.', aliases: ['denatured alcohol', 'sd alcohol'], roles: [], notes: ['possible_irritant'] },
  { name: 'Sodium Lauryl Sulfate', aliases: ['sls'], roles: [], notes: ['possible_irritant'] },
  { name: 'Witch Hazel', aliases: ['hamamelis virginiana'], roles: [], notes: ['possible_irritant'] },
  { name: 'Methylisothiazolinone', aliases: ['mit'], roles: [], notes: ['possible_sensitizer'] },

  { name: 'Coconut Oil', aliases: ['cocos nucifera oil'], roles: ['occlusive'], notes: ['debated_comedogenic'] },
  { name: 'Isopropyl Myristate', roles: ['occlusive'], notes: ['debated_comedogenic'] },
  { name: 'Lanolin', roles: ['occlusive'], notes: ['debated_comedogenic', 'possible_sensitizer'] },
  { name: 'Cocoa Butter', aliases: ['theobroma cacao seed butter'], roles: ['occlusive'], notes: ['debated_comedogenic'] },

  { name: 'Methylparaben', roles: [] },
  { name: 'Propylparaben', roles: [] },
  { name: 'Butylparaben', roles: [] },
  { name: 'Phenoxyethanol', roles: [] },
  { name: 'Ethylhexylglycerin', roles: [] },
  { name: 'Caprylyl Glycol', roles: ['humectant'] },
  { name: 'Propanediol', roles: ['humectant'] },
  { name: 'Butylene Glycol', roles: ['humectant'] },
  { name: 'Sodium PCA', roles: ['humectant'] },
  { name: 'Betaine', roles: ['humectant'] },
  { name: 'Xanthan Gum', roles: [] },
  { name: 'Carbomer', aliases: ['carbomer 940'], roles: [] },
  { name: 'Disodium EDTA', roles: [] },
  { name: 'Caprylic/Capric Triglyceride', roles: ['occlusive', 'barrier_support'] },

  // ── Vitamin C / antioxidant / brightening / anti-aging actives ──
  { name: 'Ascorbic Acid', aliases: ['vitamin c', 'l-ascorbic acid'], roles: ['brightening', 'anti_aging'], notes: ['possible_irritant'] },
  { name: 'Ethyl Ascorbic Acid', aliases: ['3-o-ethyl ascorbic acid'], roles: ['brightening', 'anti_aging'] },
  { name: 'Sodium Ascorbyl Phosphate', roles: ['brightening', 'anti_aging'] },
  { name: 'Ascorbyl Glucoside', roles: ['brightening', 'anti_aging'] },
  { name: 'Magnesium Ascorbyl Phosphate', roles: ['brightening', 'anti_aging'] },
  { name: 'Ferulic Acid', roles: ['anti_aging'] },
  { name: 'Tocopherol', aliases: ['vitamin e'], roles: ['anti_aging'] },
  { name: 'Tocopheryl Acetate', aliases: ['vitamin e acetate'], roles: ['anti_aging'] },
  { name: 'Resveratrol', roles: ['anti_aging'] },
  { name: 'Adenosine', roles: ['anti_aging'] },
  { name: 'Tranexamic Acid', roles: ['brightening'] },
  { name: 'Arbutin', aliases: ['alpha-arbutin', 'beta-arbutin'], roles: ['brightening'] },
  { name: 'Kojic Acid', roles: ['brightening'], notes: ['possible_irritant'] },
  { name: 'Licorice Root Extract', aliases: ['glycyrrhiza glabra root extract', 'glycyrrhiza glabra'], roles: ['brightening', 'redness_soothing'] },
  { name: 'Green Tea Extract', aliases: ['camellia sinensis leaf extract', 'camellia sinensis'], roles: ['anti_aging', 'redness_soothing'] },
  { name: 'Caffeine', roles: ['oil_control'] },

  // ── Soothing / barrier-adjacent actives common in "sensitive skin" and K-beauty-style formulas ──
  { name: 'Centella Asiatica Extract', aliases: ['centella asiatica', 'cica'], roles: ['redness_soothing', 'barrier_support'] },
  { name: 'Madecassoside', roles: ['redness_soothing', 'barrier_support'] },
  { name: 'Allantoin', roles: ['redness_soothing', 'barrier_support'] },
  { name: 'Bisabolol', roles: ['redness_soothing'] },
  { name: 'Colloidal Oatmeal', aliases: ['avena sativa kernel flour', 'avena sativa'], roles: ['redness_soothing', 'barrier_support'] },
  { name: 'Aloe Vera', aliases: ['aloe barbadensis leaf juice', 'aloe barbadensis'], roles: ['redness_soothing', 'humectant'] },
  { name: 'Beta-Glucan', roles: ['barrier_support', 'redness_soothing'] },
  { name: 'Snail Secretion Filtrate', aliases: ['snail mucin'], roles: ['barrier_support', 'humectant'] },
  { name: 'Propolis Extract', roles: ['barrier_support', 'redness_soothing'] },
  { name: 'Mugwort Extract', aliases: ['artemisia princeps extract', 'artemisia vulgaris extract'], roles: ['redness_soothing'] },
  { name: 'Ginseng Root Extract', aliases: ['panax ginseng root extract'], roles: ['anti_aging'] },
  { name: 'Phytosphingosine', roles: ['barrier_support'] },
  { name: 'Ceramide 1', roles: ['barrier_support'] },
  { name: 'Ceramide 3', roles: ['barrier_support'] },
  { name: 'Ceramide 6-II', roles: ['barrier_support'] },
];

/** Case-insensitive, alias-aware lookup. Returns the matching rule
 *  entry, or null when an ingredient has no entry in this table — the
 *  scoring engine treats that as "unknown," never as "safe" or
 *  "unsafe" by default. */
function lookupIngredientRule(rawName) {
  const name = (rawName || '').trim().toLowerCase();
  if (!name) return null;
  return INGREDIENT_RULES.find(rule =>
    rule.name.toLowerCase() === name ||
    (rule.aliases || []).some(a => a.toLowerCase() === name)
  ) || null;
}
