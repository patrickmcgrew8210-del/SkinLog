#!/usr/bin/env node
// Standalone unit test for the compatibility-scoring engine
// (js/scoring.js + js/ingredient-rules.js), run independently of the
// UI per Phase 5's requirement. Loads the ACTUAL committed browser
// files into a Node vm context (no test-only copy, no modification to
// the source files) so this genuinely exercises the shipped code.

import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const context = {};
vm.createContext(context);
for (const file of ['ingredient-rules.js', 'scoring.js']) {
  const code = readFileSync(path.join(__dirname, '..', 'js', file), 'utf8');
  vm.runInContext(code, context, { filename: file });
}
const { computeCompatibilityScore } = context;

const results = [];
const record = (name, pass, detail) => { results.push({ name, pass }); console.log(`${pass ? 'PASS' : 'FAIL'} — ${name}\n  ${detail}\n`); };

const emptyProfile = { goals: [], sensitivities: [], skinType: null };

// 1. Insufficient data
{
  const r = computeCompatibilityScore({ ingredients: [] }, emptyProfile);
  record('No ingredients at all -> insufficient:true, no score invented', r.insufficient === true && r.score === undefined, JSON.stringify(r));
}

// 2. Empty profile -> low confidence, score still computes
{
  const product = { ingredients: ['Niacinamide', 'Glycerin', 'Ceramide NP'], ingredientsComplete: true, verified: true };
  const r = computeCompatibilityScore(product, emptyProfile);
  record('Empty skin profile -> confidence is low even with a complete, verified product',
    r.confidence === 'low', JSON.stringify({ score: r.score, confidence: r.confidence }));
}

// 3. Goal match raises score and is explained
{
  const product = { ingredients: ['Niacinamide', 'Ceramide NP', 'Glycerin'], ingredientsComplete: true, verified: true };
  const profile = { goals: ['barrier_repair'], sensitivities: [], skinType: 'dry' };
  const r = computeCompatibilityScore(product, profile);
  record('Goal match (barrier_repair) raises score above baseline and lists positives',
    r.score > 50 && r.positives.some(p => p.ingredient === 'Niacinamide') && r.positives.some(p => p.ingredient === 'Ceramide NP'),
    JSON.stringify({ score: r.score, positives: r.positives.map(p => p.ingredient) }));
}

// 4. Explicit sensitivity match drops score hard and is flagged, not
// just noted. Compared against the SAME other ingredients without the
// sensitive one present, rather than an absolute floor — v2's general
// formula-quality layer means other real ingredients in the product
// legitimately still contribute their own credit on top, so the
// invariant to check is the SIZE of the sensitivity penalty itself,
// not where the final number lands.
{
  const profile = { goals: [], sensitivities: ['fragrance'], skinType: null };
  const withSensitive = computeCompatibilityScore({ ingredients: ['Fragrance', 'Glycerin', 'Niacinamide'], ingredientsComplete: true, verified: true }, profile);
  const withoutSensitive = computeCompatibilityScore({ ingredients: ['Glycerin', 'Niacinamide'], ingredientsComplete: true, verified: true }, profile);
  record('An ingredient matching the user\'s own stated sensitivity is FLAGGED (not just a general caution) and drops the score by the full penalty',
    withSensitive.flagged.length === 1 && withSensitive.flagged[0].ingredient === 'Fragrance' && (withoutSensitive.score - withSensitive.score) >= 25,
    JSON.stringify({ withSensitiveScore: withSensitive.score, withoutSensitiveScore: withoutSensitive.score, flagged: withSensitive.flagged }));
}

// 5. General caution (not personalized) applies a SMALL penalty, distinct from a flagged sensitivity
{
  const product = { ingredients: ['Benzoyl Peroxide', 'Glycerin'], ingredientsComplete: true, verified: true };
  const r = computeCompatibilityScore(product, emptyProfile);
  const bpTradeoff = r.tradeoffs.find(t => t.ingredient === 'Benzoyl Peroxide');
  record('A general possible_irritant note (no personal sensitivity set) is a mild tradeoff, not a hard flag',
    bpTradeoff && bpTradeoff.affectsScore === true && r.flagged.length === 0 && (50 - r.score) < 25,
    JSON.stringify({ score: r.score, tradeoffs: r.tradeoffs, flagged: r.flagged }));
}

// 6. The debated_comedogenic NOTE itself never affects the score —
// checked by comparing Coconut Oil (occlusive, debated_comedogenic)
// against Dimethicone (occlusive, no notes at all): both share the
// same real, legitimate 'occlusive' role, which DOES earn ordinary
// general-formula-quality credit in v2 (an occlusive ingredient
// genuinely seals in moisture, note or no note) — so the two must
// score IDENTICALLY, proving the debated reputation itself adds no
// extra penalty beyond what any other occlusive ingredient would get.
{
  const withCoconut = computeCompatibilityScore({ ingredients: ['Coconut Oil'], ingredientsComplete: true, verified: true }, emptyProfile);
  const withDimethicone = computeCompatibilityScore({ ingredients: ['Dimethicone'], ingredientsComplete: true, verified: true }, emptyProfile);
  const flaggedCorrectly = withCoconut.tradeoffs.some(t => t.ingredient === 'Coconut Oil' && t.note === 'debated_comedogenic' && t.affectsScore === false);
  record('A debated_comedogenic ingredient (Coconut Oil) is surfaced but the comedogenic reputation itself never moves the score beyond its ordinary occlusive-role credit',
    flaggedCorrectly && withCoconut.score === withDimethicone.score,
    JSON.stringify({ withCoconutScore: withCoconut.score, withDimethiconeScore: withDimethicone.score, tradeoffs: withCoconut.tradeoffs }));
}

// 7. Unknown ingredient is tracked, not silently dropped or scored
{
  const product = { ingredients: ['Unobtainium Extract', 'Glycerin'], ingredientsComplete: true, verified: true };
  const r = computeCompatibilityScore(product, emptyProfile);
  record('An ingredient with no rules-table entry is listed as unknown, not scored either way',
    r.unknownIngredients.includes('Unobtainium Extract'),
    JSON.stringify(r.unknownIngredients));
}

// 8. Confidence: high requires complete + verified + >=3 ingredients + a non-empty profile
{
  const product = { ingredients: ['Niacinamide', 'Glycerin', 'Ceramide NP'], ingredientsComplete: true, verified: true };
  const profile = { goals: ['hydration'], sensitivities: [], skinType: null };
  const r = computeCompatibilityScore(product, profile);
  record('All conditions met -> confidence is high', r.confidence === 'high', JSON.stringify({ confidence: r.confidence }));
}

// 9. Confidence: low when ingredientsComplete is false, regardless of everything else being favorable
{
  const product = { ingredients: ['Niacinamide', 'Glycerin', 'Ceramide NP'], ingredientsComplete: false, verified: true };
  const profile = { goals: ['hydration'], sensitivities: [], skinType: null };
  const r = computeCompatibilityScore(product, profile);
  record('Incomplete ingredient list forces confidence down to low even with a filled-in profile',
    r.confidence === 'low', JSON.stringify({ confidence: r.confidence }));
}

// 10. Routine overlap: two acne-active products -> penalty + explicit note
{
  const product = { ingredients: ['Adapalene', 'Glycerin'], ingredientsComplete: true, verified: true };
  const withoutOverlap = computeCompatibilityScore(product, emptyProfile, []);
  const withOverlap = computeCompatibilityScore(product, emptyProfile, [['Benzoyl Peroxide']]);
  record('A second active-already-in-routine acne product triggers a routine-overlap penalty and explicit note',
    withOverlap.routineOverlap !== null && withOverlap.score === withoutOverlap.score - 10,
    JSON.stringify({ without: withoutOverlap.score, with: withOverlap.score, note: withOverlap.routineOverlap }));
}

// 11. Score never goes below 0 even with many sensitivity matches
{
  const product = { ingredients: ['Fragrance', 'Essential Oil', 'Limonene', 'Linalool', 'Citronellol'], ingredientsComplete: true, verified: true };
  const profile = { goals: [], sensitivities: ['fragrance', 'essential oil', 'limonene', 'linalool', 'citronellol'], skinType: null };
  const r = computeCompatibilityScore(product, profile);
  record('Score is clamped at 0, never negative, even with every ingredient flagged as a personal sensitivity',
    r.score === 0 && r.score >= 0, JSON.stringify({ score: r.score, flaggedCount: r.flagged.length }));
}

// 12. Goal-match bonus is capped, not unbounded
{
  const manyBarrierIngredients = { ingredients: ['Niacinamide', 'Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Cholesterol', 'Squalane', 'Shea Butter', 'Panthenol'], ingredientsComplete: true, verified: true };
  const profile = { goals: ['barrier_repair'], sensitivities: [], skinType: null };
  const r = computeCompatibilityScore(manyBarrierIngredients, profile);
  record('Goal-match bonus is capped at +32 even with 8 matching ingredients (8 x 8 = 64 uncapped)',
    r.score === 50 + 32, JSON.stringify({ score: r.score, positivesCount: r.positives.length }));
}

// 13. Duplicate-ingredient bug fix: a single real ingredient listed
// multiple times must NOT score the same as several genuinely
// different ones. Found during a scoring audit — this is a
// regression test for a real, confirmed bug, not a hypothetical.
{
  const dup = computeCompatibilityScore({ ingredients: ['Niacinamide', 'Niacinamide', 'Niacinamide', 'Niacinamide'], ingredientsComplete: true, verified: true }, { goals: ['barrier_repair'], sensitivities: [], skinType: null });
  const single = computeCompatibilityScore({ ingredients: ['Niacinamide'], ingredientsComplete: true, verified: true }, { goals: ['barrier_repair'], sensitivities: [], skinType: null });
  record('A single ingredient listed 4 times scores identically to listing it once — duplicates no longer inflate the score',
    dup.score === single.score && dup.positives.length === 1,
    JSON.stringify({ duplicateListedScore: dup.score, singleListingScore: single.score, positivesFromDuplicateList: dup.positives.length }));
}

// 14. flagged entries honestly report whether they actually moved the
// score, once the sensitivity penalty cap is reached — matching the
// same affectsScore pattern tradeoffs already had, so the UI's
// explanation never implies a flagged ingredient changed the number
// when the cap already maxed out the penalty.
{
  const profile = { goals: [], sensitivities: ['fragrance', 'essential oil', 'limonene', 'linalool'], skinType: null }; // 4 distinct sensitivities, cap is -75 at -25 each = 3 before the cap is hit
  const r = computeCompatibilityScore({ ingredients: ['Fragrance', 'Essential Oil', 'Limonene', 'Linalool'], ingredientsComplete: true, verified: true }, profile);
  const affectingCount = r.flagged.filter(f => f.affectsScore).length;
  const notAffectingCount = r.flagged.filter(f => f.affectsScore === false).length;
  record('Once the sensitivity penalty cap is reached, further flagged matches are explicitly marked as not having moved the score further',
    r.flagged.length === 4 && affectingCount === 3 && notAffectingCount === 1,
    JSON.stringify({ flagged: r.flagged, score: r.score }));
}

// ═══ v2 personalization tests ═══

// 15. The SAME product genuinely scores differently for two different
// skin profiles — the core promise of personalization, checked
// directly rather than inferred from smaller unit checks.
{
  const product = { ingredients: ['Niacinamide', 'Salicylic Acid', 'Glycerin', 'Fragrance'], ingredientsComplete: true, verified: true };
  const profileA = { goals: ['oil_control'], sensitivities: [], skinType: 'oily', acneTypes: ['blackheads'] };
  const profileB = { goals: [], sensitivities: ['fragrance'], skinType: 'dry', acneTypes: [] };
  const rA = computeCompatibilityScore(product, profileA);
  const rB = computeCompatibilityScore(product, profileB);
  record('The same product scores differently for an oily/blackhead-focused profile vs. a dry/fragrance-sensitive profile',
    rA.score !== rB.score, JSON.stringify({ scoreA: rA.score, scoreB: rB.score }));
}

// 16. Acne-type relevance is its own scoring input, distinct from the
// acne_control goal — a selected acne type alone (no acne_control
// goal) still credits an acne-relevant ingredient.
{
  const product = { ingredients: ['Salicylic Acid', 'Glycerin'], ingredientsComplete: true, verified: true };
  const withAcneType = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: ['blackheads'] });
  const withoutAcneType = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: [] });
  record('Selecting a real acne type (without the acne_control goal) still credits an acne-relevant ingredient',
    withAcneType.score > withoutAcneType.score && withAcneType.positives.some(p => p.ingredient === 'Salicylic Acid'),
    JSON.stringify({ withAcneType: withAcneType.score, withoutAcneType: withoutAcneType.score }));
}

// 16b. "unsure/none" must NOT count as a real acne type for the
// relevance bonus — nobody who declined to answer should be treated
// as if they'd picked every acne type.
{
  const product = { ingredients: ['Salicylic Acid', 'Glycerin'], ingredientsComplete: true, verified: true };
  const withUnsure = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: ['unsure_or_none'] });
  const withNone = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: [] });
  record('"I\'m not sure / I don\'t have acne" does not trigger the acne-type relevance bonus',
    withUnsure.score === withNone.score, JSON.stringify({ withUnsure: withUnsure.score, withNone: withNone.score }));
}

// 17. Fragrance sensitivity matches SEMANTICALLY (by role), not just by
// literal text — Linalool shares no text with "fragrance" but is a
// recognized fragrance-role ingredient.
{
  const profile = { goals: [], sensitivities: ['fragrance'], skinType: null, acneTypes: [] };
  const r = computeCompatibilityScore({ ingredients: ['Linalool', 'Glycerin'], ingredientsComplete: true, verified: true }, profile);
  record('A fragrance sensitivity catches a specific fragrance allergen (Linalool) by role, not just by name match',
    r.flagged.some(f => f.ingredient === 'Linalool' && f.affectsScore === true),
    JSON.stringify(r.flagged));
}

// 18. "Easily irritated" amplifies the general-caution penalty for an
// ingredient that ISN'T a personal sensitivity match.
{
  const product = { ingredients: ['Benzoyl Peroxide'], ingredientsComplete: true, verified: true };
  const normal = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: [], easilyIrritated: false });
  const irritated = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: [], easilyIrritated: true });
  record('An "easily irritated" profile weighs a general-caution ingredient more heavily than the same ingredient for a non-irritated profile',
    irritated.score < normal.score, JSON.stringify({ normal: normal.score, irritated: irritated.score }));
}

// 19. Oily skin + an occlusive ingredient produces an explicit
// "may feel heavy" fit note, distinct from a general irritant caution
// and distinct from a comedogenicity claim.
{
  const r = computeCompatibilityScore({ ingredients: ['Dimethicone'], ingredientsComplete: true, verified: true }, { goals: [], sensitivities: [], skinType: 'oily', acneTypes: [] });
  record('Oily skin type + an occlusive ingredient surfaces a fit-specific "may feel heavy" note (explicitly not a clogged-pores claim)',
    r.tradeoffs.some(t => t.note === 'oily_skin_fit' && /heavy/i.test(t.explanation) && /not a claim/i.test(t.explanation)),
    JSON.stringify(r.tradeoffs));
}

// 20. Selecting cystic/nodular acne surfaces an informational advisory
// that NEVER affects the score — it's guidance, not a scoring input.
{
  const product = { ingredients: ['Salicylic Acid', 'Glycerin'], ingredientsComplete: true, verified: true };
  const withCystic = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: ['cystic_nodular'] });
  const withBlackheads = computeCompatibilityScore(product, { goals: [], sensitivities: [], skinType: null, acneTypes: ['blackheads'] });
  record('Cystic/nodular acne shows a dermatologist-consultation advisory that does not change the score vs. an equivalent non-cystic acne-type profile',
    typeof withCystic.acneAdvisory === 'string' && withCystic.acneAdvisory.length > 0 && withBlackheads.acneAdvisory === null && withCystic.score === withBlackheads.score,
    JSON.stringify({ advisory: withCystic.acneAdvisory, cysticScore: withCystic.score, blackheadsScore: withBlackheads.score }));
}

// 21. missingProfileFields reports exactly what's unset, so the UI can
// prompt specifically instead of vaguely.
{
  const r = computeCompatibilityScore({ ingredients: ['Glycerin'], ingredientsComplete: true, verified: true }, { goals: [], sensitivities: ['fragrance'], skinType: null, acneTypes: [] });
  record('missingProfileFields lists every unset core field (skin type, acne type, goals — only a sensitivity was set here)',
    r.missingProfileFields.includes('skinType') && r.missingProfileFields.includes('acneTypes') && r.missingProfileFields.includes('goals'),
    JSON.stringify(r.missingProfileFields));
}
{
  const r = computeCompatibilityScore({ ingredients: ['Glycerin'], ingredientsComplete: true, verified: true }, { goals: ['hydration'], sensitivities: [], skinType: 'dry', acneTypes: ['unsure_or_none'] });
  record('missingProfileFields is empty once skin type, acne type, and at least one goal are all set',
    r.missingProfileFields.length === 0, JSON.stringify(r.missingProfileFields));
}

// 22. A completely empty profile is NEVER "insufficient" as long as an
// ingredient list exists — a provisional, low-confidence score is
// always still returned, per the explicit "never block, just lower
// confidence" requirement.
{
  const r = computeCompatibilityScore({ ingredients: ['Glycerin', 'Niacinamide', 'Water'], ingredientsComplete: true, verified: true }, { goals: [], sensitivities: [], skinType: null, acneTypes: [] });
  record('An empty skin profile still returns a provisional score (never "insufficient") as long as ingredients exist',
    r.insufficient === false && typeof r.score === 'number' && r.confidence === 'low' && r.profileIsEmpty === true,
    JSON.stringify({ insufficient: r.insufficient, score: r.score, confidence: r.confidence }));
}

console.log(`\n${results.filter(r => r.pass).length}/${results.length} checks passed.`);
if (results.some(r => !r.pass)) process.exitCode = 1;
