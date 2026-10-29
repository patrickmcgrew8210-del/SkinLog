/* ══════════════════════════════════════════════
   SCORING — deterministic, rules-based compatibility score (0-100).

   Pure functions only: no DOM, no network, no randomness, no AI call.
   This file can be loaded standalone in Node for testing (see
   scripts/test-scoring.mjs) exactly as it loads in the browser.

   METHODOLOGY — documented here because Phase 5 requires every score
   to be explainable, not just "high" or "low":

   1. Insufficient-data gate. If the product has no ingredient list at
      all, this returns `{ insufficient: true }` immediately. No score
      is invented from nothing.

   1.5. De-duplication (case-insensitive, first-seen casing kept)
      happens before anything is scored — this only affects what's
      SCORED, never what's displayed; the UI still shows the
      ingredient list exactly as entered or sourced. Without this, the
      same ingredient listed twice (a copy-paste accident in manual
      entry, a messy source list) would be scored twice, and a single
      real ingredient repeated 4 times could reach the same scoring
      cap as 4 genuinely different ingredients would — found and
      fixed during a scoring audit, with a regression test.

   2. Each (now-unique) ingredient in the product's list is matched against
      INGREDIENT_RULES (js/ingredient-rules.js) — case-insensitive,
      alias-aware. An ingredient with no entry in that table is tracked
      as "unknown" and never treated as either a positive or a
      negative; it's surfaced to the user as a real gap, not silently
      dropped or silently assumed safe.

   3. Scoring starts at a neutral baseline of 50 and moves from there:
        +8  for each matched ingredient whose role supports a goal the
            user selected in their skin profile (capped at +32 total —
            a long ingredient list can't run away with the score just
            by being long).
        -25 for each ingredient that matches one of the user's own
            stated sensitivities/avoid-list, EXACTLY (capped at -75).
            An explicit personal flag always outweighs a general
            population-level pattern — this is the single biggest
            lever in the whole system, deliberately.
        -4  for each ingredient carrying a general 'possible_irritant'
            or 'possible_sensitizer' note in the rules table, that
            ISN'T already covered by the user's own sensitivities
            (capped at -20) — a mild, general caution, never a
            personalized verdict about this specific user.
        'debated_comedogenic' ingredients never move the score at all
            — the evidence behind that label is explicitly unsettled
            (see ingredient-rules.js's header). They're listed in the
            explanation so the user can decide for themselves, never
            used as a scoring input.
      Routine-overlap check: if another currently-active product in the
      user's routine already supplies the same role (most meaningfully
      for 'acne_active', where stacking actives is a common real
      irritation risk), -10, reported as an explicit routine-overlap
      note — never phrased as an ingredient being "bad."

   4. Clamp to [0, 100].

   5. Confidence — always one of 'high' / 'medium' / 'low', never
      hidden:
        'low'    if the product's ingredient list is explicitly marked
                 incomplete, OR has fewer than 3 ingredients, OR the
                 product isn't marked verified, OR the user's skin
                 profile is empty (no goals, sensitivities, or skin
                 type set — there's nothing to meaningfully compare
                 against).
        'high'   only if the ingredient list is marked complete AND
                 the product is marked verified AND the list has at
                 least 3 ingredients AND the profile has at least one
                 goal or sensitivity set.
        'medium' everything else.

   6. The explanation text never claims clinical validation, never
      promises a result, and keeps general ingredient information
      (roles in INGREDIENT_RULES) visibly separate from anything
      personalized to the user's own stated profile.
══════════════════════════════════════════════ */

const SCORE_BASELINE = 50;
const SCORE_GOAL_MATCH_POINTS = 8;
const SCORE_GOAL_MATCH_CAP = 32;
const SCORE_SENSITIVITY_PENALTY = 25;
const SCORE_SENSITIVITY_CAP = 75;
const SCORE_GENERAL_CAUTION_PENALTY = 4;
const SCORE_GENERAL_CAUTION_CAP = 20;
const SCORE_ROUTINE_OVERLAP_PENALTY = 10;

const GOAL_TO_ROLES = {
  hydration: ['humectant', 'barrier_support'],
  acne_control: ['acne_active'],
  barrier_repair: ['barrier_support'],
  brightening: ['brightening'],
  sun_protection: ['sun_filter'],
};

/** @param product { ingredients: string[], ingredientsComplete?: bool, verified?: bool }
 *  @param skinProfile { goals: string[], skinType?: string, sensitivities: string[] }
 *  @param otherActiveIngredientLists string[][] — ingredient lists of
 *         the user's other currently-active routine products, for the
 *         routine-overlap check. Optional; defaults to none.
 */
function computeCompatibilityScore(product, skinProfile, otherActiveIngredientLists) {
  const rawIngredients = Array.isArray(product && product.ingredients) ? product.ingredients : [];
  // De-duplicated (case-insensitive, first-seen casing kept) before any
  // scoring happens. Without this, the same ingredient listed twice
  // (a copy-paste accident in manual entry, or a messy source list)
  // would be scored twice — a single real ingredient repeated 4 times
  // could reach the same +32 goal-match cap as 4 genuinely different
  // beneficial ingredients, which is not a meaningful signal about the
  // product. This only affects what's SCORED, not what's displayed —
  // the UI still shows the ingredient list exactly as entered/sourced.
  const seenIngredients = new Set();
  const ingredients = [];
  for (const raw of rawIngredients) {
    const name = String(raw || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seenIngredients.has(key)) continue;
    seenIngredients.add(key);
    ingredients.push(name);
  }
  otherActiveIngredientLists = otherActiveIngredientLists || [];
  const profile = skinProfile || { goals: [], sensitivities: [], skinType: null };
  const sensitivities = (profile.sensitivities || []).map(s => s.trim().toLowerCase()).filter(Boolean);
  const goals = profile.goals || [];
  const wantedRoles = new Set(goals.flatMap(g => GOAL_TO_ROLES[g] || []));

  if (ingredients.length === 0) {
    return {
      insufficient: true,
      reason: 'No ingredient list is available for this product yet.',
    };
  }

  let score = SCORE_BASELINE;
  const positives = [];
  const tradeoffs = [];
  const flagged = [];
  const unknownIngredients = [];
  let goalPointsUsed = 0;
  let cautionPointsUsed = 0;
  let sensitivityPointsUsed = 0;

  for (const rawName of ingredients) {
    const name = String(rawName || '').trim();
    if (!name) continue;
    const lower = name.toLowerCase();

    // A user's own stated sensitivity always takes priority, whether
    // or not this ingredient has a rules-table entry at all.
    const sensitivityHit = sensitivities.find(s => lower === s || lower.includes(s) || s.includes(lower));
    if (sensitivityHit) {
      let applied = 0;
      if (sensitivityPointsUsed < SCORE_SENSITIVITY_CAP) {
        applied = Math.min(SCORE_SENSITIVITY_PENALTY, SCORE_SENSITIVITY_CAP - sensitivityPointsUsed);
        score -= applied;
        sensitivityPointsUsed += applied;
      }
      // affectsScore mirrors the tradeoffs entries below: once the
      // sensitivity penalty cap is reached, a further match is still
      // worth showing the user (it's still their ingredient, still
      // worth knowing about) but shouldn't be implied to have moved
      // the number any further than it already did.
      flagged.push({ ingredient: name, reason: `Matches your stated sensitivity/avoid entry: "${sensitivityHit}"`, affectsScore: applied > 0 });
      continue; // a sensitivity hit supersedes the general rule-table read for this ingredient
    }

    const rule = lookupIngredientRule(name);
    if (!rule) {
      unknownIngredients.push(name);
      continue;
    }

    const matchedGoalRoles = (rule.roles || []).filter(r => wantedRoles.has(r));
    if (matchedGoalRoles.length > 0 && goalPointsUsed < SCORE_GOAL_MATCH_CAP) {
      const applied = Math.min(SCORE_GOAL_MATCH_POINTS, SCORE_GOAL_MATCH_CAP - goalPointsUsed);
      score += applied;
      goalPointsUsed += applied;
      positives.push({
        ingredient: name,
        roles: matchedGoalRoles,
        explanation: matchedGoalRoles.map(r => INGREDIENT_ROLES[r]).join('; '),
      });
    }

    const notes = rule.notes || [];
    if (notes.includes('debated_comedogenic')) {
      tradeoffs.push({ ingredient: name, note: 'debated_comedogenic', explanation: INGREDIENT_ROLES.debated_comedogenic, affectsScore: false });
    }
    const generalCautionNotes = notes.filter(n => n === 'possible_irritant' || n === 'possible_sensitizer');
    if (generalCautionNotes.length > 0) {
      let applied = 0;
      if (cautionPointsUsed < SCORE_GENERAL_CAUTION_CAP) {
        applied = Math.min(SCORE_GENERAL_CAUTION_PENALTY, SCORE_GENERAL_CAUTION_CAP - cautionPointsUsed);
        score -= applied;
        cautionPointsUsed += applied;
      }
      tradeoffs.push({
        ingredient: name,
        note: generalCautionNotes.join(', '),
        explanation: generalCautionNotes.map(n => INGREDIENT_ROLES[n]).join('; '),
        affectsScore: applied > 0,
      });
    }
  }

  // Routine-overlap check: does another active product already supply
  // the same acne-active role? (The role most worth flagging for real
  // stacking irritation; other roles rarely cause harm by repeating.)
  let routineOverlap = null;
  const thisHasAcneActive = ingredients.some(n => (lookupIngredientRule(n)?.roles || []).includes('acne_active'));
  if (thisHasAcneActive) {
    const otherHasAcneActive = otherActiveIngredientLists.some(list =>
      (list || []).some(n => (lookupIngredientRule(n)?.roles || []).includes('acne_active'))
    );
    if (otherHasAcneActive) {
      score -= SCORE_ROUTINE_OVERLAP_PENALTY;
      routineOverlap = {
        role: 'acne_active',
        explanation: 'Another product already active in your routine also contains a recognized acne-treatment active. Layering multiple actives is a common source of irritation — not a certainty, but worth a closer look at your routine.',
      };
    }
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  const ingredientsComplete = product.ingredientsComplete !== false; // undefined treated as complete (e.g. a manual entry the user says is accurate)
  const verified = product.verified === true;
  const profileIsEmpty = goals.length === 0 && sensitivities.length === 0 && !profile.skinType;

  let confidence;
  if (!ingredientsComplete || ingredients.length < 3 || !verified || profileIsEmpty) {
    confidence = 'low';
  } else {
    confidence = 'medium';
  }
  if (ingredientsComplete && verified && ingredients.length >= 3 && (goals.length > 0 || sensitivities.length > 0)) {
    confidence = 'high';
  }

  const explanationParts = [
    'This is a general compatibility estimate from a deterministic rules table — not a clinical evaluation, not a guarantee, and not a diagnosis.',
  ];
  if (profileIsEmpty) explanationParts.push('No skin goals or sensitivities are set yet, so this score mostly reflects general ingredient information rather than anything personalized to you.');
  if (!ingredientsComplete) explanationParts.push('This product\'s ingredient list is marked incomplete, which lowers confidence.');
  if (!verified) explanationParts.push('This product\'s data hasn\'t been independently verified, which lowers confidence.');
  if (unknownIngredients.length > 0) explanationParts.push(`${unknownIngredients.length} ingredient(s) aren't in this app's reference table and were not scored in either direction.`);

  return {
    insufficient: false,
    score,
    confidence,
    positives,
    tradeoffs,
    flagged,
    unknownIngredients,
    routineOverlap,
    explanation: explanationParts.join(' '),
  };
}
