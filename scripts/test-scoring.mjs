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

// 4. Explicit sensitivity match drops score hard and is flagged, not just noted
{
  const product = { ingredients: ['Fragrance', 'Glycerin', 'Niacinamide'], ingredientsComplete: true, verified: true };
  const profile = { goals: [], sensitivities: ['fragrance'], skinType: null };
  const r = computeCompatibilityScore(product, profile);
  record('An ingredient matching the user\'s own stated sensitivity is FLAGGED (not just a general caution) and drops the score sharply',
    r.flagged.length === 1 && r.flagged[0].ingredient === 'Fragrance' && r.score <= 50 - 25,
    JSON.stringify({ score: r.score, flagged: r.flagged }));
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

// 6. debated_comedogenic NEVER affects the score
{
  const withCoconut = computeCompatibilityScore({ ingredients: ['Coconut Oil', 'Glycerin'], ingredientsComplete: true, verified: true }, emptyProfile);
  const withoutCoconut = computeCompatibilityScore({ ingredients: ['Glycerin'], ingredientsComplete: true, verified: true }, emptyProfile);
  const flaggedCorrectly = withCoconut.tradeoffs.some(t => t.ingredient === 'Coconut Oil' && t.note === 'debated_comedogenic' && t.affectsScore === false);
  record('A debated_comedogenic ingredient (Coconut Oil) is surfaced but never moves the score',
    flaggedCorrectly && withCoconut.score === withoutCoconut.score,
    JSON.stringify({ withCoconut: withCoconut.score, withoutCoconut: withoutCoconut.score, tradeoffs: withCoconut.tradeoffs }));
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

console.log(`\n${results.filter(r => r.pass).length}/${results.length} checks passed.`);
if (results.some(r => !r.pass)) process.exitCode = 1;
