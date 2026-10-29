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
  { name: 'Panthenol', aliases: ['pro-vitamin b5', 'vitamin b5'], roles: ['humectant', 'barrier_support'] },
  { name: 'Propylene Glycol', roles: ['humectant'], notes: ['possible_irritant'] },
  { name: 'Pentylene Glycol', roles: ['humectant'] },
  { name: 'Sorbitol', roles: ['humectant'] },
  { name: 'Urea', roles: ['humectant', 'exfoliant'] },

  { name: 'Ceramide NP', aliases: ['ceramide 3'], roles: ['barrier_support'] },
  { name: 'Ceramide AP', roles: ['barrier_support'] },
  { name: 'Ceramide EOP', roles: ['barrier_support'] },
  { name: 'Cholesterol', roles: ['barrier_support'] },
  { name: 'Niacinamide', aliases: ['vitamin b3', 'nicotinamide'], roles: ['barrier_support', 'brightening'] },
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
  { name: 'Adapalene', roles: ['acne_active'], notes: ['possible_irritant'] },
  { name: 'Tretinoin', aliases: ['retinoic acid'], roles: ['acne_active'], notes: ['possible_irritant'] },
  { name: 'Retinol', roles: ['acne_active', 'brightening'], notes: ['possible_irritant'] },
  { name: 'Azelaic Acid', roles: ['acne_active', 'brightening'] },
  { name: 'Sulfur', roles: ['acne_active'], notes: ['possible_irritant'] },
  { name: 'Zinc PCA', roles: ['acne_active'] },

  { name: 'Glycolic Acid', roles: ['exfoliant'], notes: ['possible_irritant'] },
  { name: 'Lactic Acid', roles: ['exfoliant', 'humectant'], notes: ['possible_irritant'] },
  { name: 'Mandelic Acid', roles: ['exfoliant'] },

  { name: 'Avobenzone', roles: ['sun_filter'] },
  { name: 'Homosalate', roles: ['sun_filter'] },
  { name: 'Octisalate', roles: ['sun_filter'] },
  { name: 'Octocrylene', roles: ['sun_filter'], notes: ['possible_sensitizer'] },
  { name: 'Oxybenzone', roles: ['sun_filter'], notes: ['possible_sensitizer'] },
  { name: 'Zinc Oxide', roles: ['sun_filter', 'barrier_support'] },
  { name: 'Titanium Dioxide', roles: ['sun_filter'] },

  { name: 'Fragrance', aliases: ['parfum', 'perfume'], roles: ['fragrance'], notes: ['possible_irritant', 'possible_sensitizer'] },
  { name: 'Essential Oil', roles: ['fragrance'], notes: ['possible_irritant', 'possible_sensitizer'] },
  { name: 'Limonene', roles: [], notes: ['possible_sensitizer'] },
  { name: 'Linalool', roles: [], notes: ['possible_sensitizer'] },
  { name: 'Citronellol', roles: [], notes: ['possible_sensitizer'] },
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
