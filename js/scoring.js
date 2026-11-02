/* ══════════════════════════════════════════════
   SCORING — deterministic, rules-based compatibility score (0-100).

   Pure functions only: no DOM, no network, no randomness, no AI call.
   This file can be loaded standalone in Node for testing (see
   scripts/test-scoring.mjs) exactly as it loads in the browser.

   METHODOLOGY v2 — documented here because every score must be
   explainable, not just "high" or "low", and because a flat "every
   under-informed product scores ~50" result is explicitly treated as
   a bug, not a neutral default:

   1. Insufficient-data gate. If the product has no ingredient list at
      all, this returns `{ insufficient: true }` immediately. No score
      is invented from nothing — a missing ingredient list is NEVER
      treated as an average or safe formula.

   1.5. De-duplication (case-insensitive, first-seen casing kept)
      happens before anything is scored — this only affects what's
      SCORED, never what's displayed.

   2. Each (now-unique) ingredient is matched against INGREDIENT_RULES
      (js/ingredient-rules.js) — case-insensitive, alias-aware. An
      ingredient with no entry in that table is tracked as "unknown"
      and never treated as either a positive or a negative.

   3. Scoring starts at a neutral baseline of 50 and moves from there.
      Two separate positive tiers exist specifically so the score
      reflects the PRODUCT's own general formula quality even before
      any personalization is applied — this is what keeps scores from
      clustering at 50 for someone who hasn't filled out a profile yet:

        General-quality tier (+2/ingredient, capped +14): ANY
            ingredient with a recognized beneficial role
            (POSITIVE_ROLES) that ISN'T already credited by the
            goal-match tier below. A sunscreen with real UV filters,
            or a moisturizer with real barrier-support ingredients, is
            a better-than-baseline formula on its own merits — that's
            true independent of what any particular user selected as
            a goal.
        Goal-match tier (+8/ingredient, capped +32): an ingredient
            whose role matches a goal the user actually selected in
            their skin profile. Personalization on top of general
            quality, not a replacement for it. An ingredient gets
            EITHER this tier OR the general-quality tier, never both,
            so stacking two bonuses for the same ingredient can't
            happen.
        Acne-type relevance tier (+4/ingredient, capped +12): an
            ingredient with an acne-/exfoliation-relevant role, counted
            separately from goals, when the user has selected a real
            acne type (not "unsure/none") — acne type is one of this
            app's distinct personalization inputs, not just a proxy
            for the acne_control goal, so it gets its own (smaller)
            scoring effect even when acne_control wasn't separately
            selected. Skipped for an ingredient already credited via
            the goal-match tier, for the same reason as above.
        Sensitivity penalty (-25/ingredient, capped -75): an ingredient
            that matches the user's own stated sensitivity/avoid list,
            EXACTLY, OR — new in v2 — semantically, when the user's
            sensitivity is "fragrance"/"perfume"/"parfum" and the
            ingredient's role in the rules table is itself 'fragrance'
            (covers e.g. specific fragrance allergens like Linalool
            that wouldn't share any text with the word "fragrance").
            An explicit personal flag always outweighs a general
            population-level pattern — this is the single biggest
            lever in the whole system, deliberately.
        General caution (-4/ingredient, capped -20): an ingredient
            carrying a general 'possible_irritant'/'possible_sensitizer'
            note, not already covered by the user's own sensitivities.
            Multiplied ×1.5 (same cap) when the user's skin type is
            'sensitive' or they've flagged their skin as easily
            irritated — a general caution matters more for a profile
            that says it reacts easily, without ever claiming this
            ingredient specifically will cause a reaction FOR them.
        Oily-skin occlusive note (-3/ingredient, capped -9): an
            occlusive ingredient, when skin type is 'oily' — framed as
            "may feel heavy," never as "clogs pores" (comedogenicity
            from old assays is deliberately not asserted anywhere in
            this app — see ingredient-rules.js's header).
        'debated_comedogenic' ingredients never move the score at all.
      Routine-overlap check unchanged from v1: another active product
      supplying the same 'acne_active' role → -10, reported as an
      explicit routine-overlap note, never phrased as the ingredient
      being "bad."

   4. Clamp to [0, 100].

   5. Confidence — always one of 'high' / 'medium' / 'low', never
      hidden. 'low' if the ingredient list is incomplete, has fewer
      than 3 ingredients, isn't verified, OR the skin profile has
      NOTHING set at all (no goals, skin type, acne type, sensitivities,
      or irritation flag). 'high' only if the list is complete AND
      verified AND has ≥3 ingredients AND the profile has something set.
      'medium' otherwise. Separately — and this is the part that
      actually answers "what's missing" — `missingProfileFields` always
      lists which of the three CORE profile fields (skin type, acne
      type, goals) are still unset, so the UI can prompt specifically
      rather than vaguely, and a provisional score is still always
      returned (never blocked) as long as an ingredient list exists.

   6. The explanation text never claims clinical validation, never
      promises a result, and keeps general ingredient information
      (roles in INGREDIENT_RULES) visibly separate from anything
      personalized to the user's own stated profile.
══════════════════════════════════════════════ */

// Local, deliberately duplicated copy of the 3 core profile field
// labels (also defined in js/skin-profile.js for its own UI) — kept
// here so this file has zero cross-file dependency and can still load
// standalone in Node (see the header above).
const SCORING_PROFILE_FIELD_LABELS = { skinType: 'skin type', acneTypes: 'acne type', goals: 'skin goals' };

const SCORE_BASELINE = 50;
const SCORE_GENERAL_POSITIVE_POINTS = 2;
const SCORE_GENERAL_POSITIVE_CAP = 14;
const SCORE_GOAL_MATCH_POINTS = 8;
const SCORE_GOAL_MATCH_CAP = 32;
const SCORE_ACNE_TYPE_RELEVANCE_POINTS = 4;
const SCORE_ACNE_TYPE_RELEVANCE_CAP = 12;
const SCORE_SENSITIVITY_PENALTY = 25;
const SCORE_SENSITIVITY_CAP = 75;
const SCORE_GENERAL_CAUTION_PENALTY = 4;
const SCORE_GENERAL_CAUTION_CAP = 20;
const SCORE_IRRITATION_CAUTION_MULTIPLIER = 1.5;
const SCORE_OILY_OCCLUSIVE_PENALTY = 3;
const SCORE_OILY_OCCLUSIVE_CAP = 9;
const SCORE_ROUTINE_OVERLAP_PENALTY = 10;

// Roles that count as a general formula-quality positive, independent
// of what the user selected as a goal. Deliberately excludes nothing
// that's a real, recognized "does something good" role — sun_filter,
// acne_active etc. all count, same as a goal-matched one would, just
// at the smaller general-quality rate instead of the goal-match rate.
const POSITIVE_ROLES = ['humectant', 'barrier_support', 'occlusive', 'acne_active', 'exfoliant', 'sun_filter', 'brightening', 'oil_control', 'redness_soothing', 'texture', 'anti_aging'];
const ACNE_TYPE_RELEVANT_ROLES = ['acne_active', 'exfoliant'];
const FRAGRANCE_SENSITIVITY_TOKENS = ['fragrance', 'perfume', 'parfum'];

const GOAL_TO_ROLES = {
  hydration: ['humectant', 'barrier_support'],
  acne_control: ['acne_active'],
  oil_control: ['oil_control'],
  barrier_repair: ['barrier_support'],
  redness_reduction: ['redness_soothing'],
  texture: ['texture', 'exfoliant'],
  dark_spots: ['brightening'],
  anti_aging: ['anti_aging'],
};

// Informational only — never affects the score. General, widely-held
// dermatological guidance, not a diagnosis of any individual.
const ACNE_TYPE_ADVISORY = {
  cystic_nodular: 'Cystic or nodular acne often responds best to a dermatologist-prescribed treatment plan — over-the-counter products can still play a supporting role, but may not be enough on their own.',
};

/** @param product { ingredients: string[], ingredientsComplete?: bool, verified?: bool }
 *  @param skinProfile { goals?: string[], skinType?: string, acneTypes?: string[], sensitivities?: string[], easilyIrritated?: bool }
 *  @param otherActiveIngredientLists string[][] — ingredient lists of
 *         the user's other currently-active routine products, for the
 *         routine-overlap check. Optional; defaults to none.
 */
function computeCompatibilityScore(product, skinProfile, otherActiveIngredientLists) {
  const rawIngredients = Array.isArray(product && product.ingredients) ? product.ingredients : [];
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
  const profile = skinProfile || {};
  const sensitivities = (profile.sensitivities || []).map(s => s.trim().toLowerCase()).filter(Boolean);
  const goals = profile.goals || [];
  const acneTypes = profile.acneTypes || [];
  const skinType = profile.skinType || null;
  const easilyIrritated = profile.easilyIrritated === true;
  const wantedRoles = new Set(goals.flatMap(g => GOAL_TO_ROLES[g] || []));
  const hasRealAcneType = acneTypes.some(a => a !== 'unsure_or_none');
  const fragranceSensitive = sensitivities.some(s => FRAGRANCE_SENSITIVITY_TOKENS.includes(s));
  const amplifyCaution = skinType === 'sensitive' || easilyIrritated;

  if (ingredients.length === 0) {
    return {
      insufficient: true,
      reason: 'No ingredient list is available for this product yet — add one manually, or check back once it\'s been researched.',
    };
  }

  let score = SCORE_BASELINE;
  const positives = [];       // goal-matched
  const generalPositives = []; // generally beneficial, not goal-matched
  const tradeoffs = [];
  const flagged = [];
  const unknownIngredients = [];
  let goalPointsUsed = 0;
  let generalPositivePointsUsed = 0;
  let acneTypePointsUsed = 0;
  let cautionPointsUsed = 0;
  let sensitivityPointsUsed = 0;
  let oilyOcclusivePointsUsed = 0;

  for (const rawName of ingredients) {
    const name = String(rawName || '').trim();
    if (!name) continue;
    const lower = name.toLowerCase();
    const rule = lookupIngredientRule(name);

    // A user's own stated sensitivity always takes priority. Checked
    // two ways: literal text match (as before), or — new — a semantic
    // match when the user said "fragrance" and this ingredient's own
    // role IS 'fragrance', even if its name shares no text with the
    // word (e.g. Linalool).
    const literalHit = sensitivities.find(s => lower === s || lower.includes(s) || s.includes(lower));
    const fragranceHit = !literalHit && fragranceSensitive && rule && (rule.roles || []).includes('fragrance');
    if (literalHit || fragranceHit) {
      let applied = 0;
      if (sensitivityPointsUsed < SCORE_SENSITIVITY_CAP) {
        applied = Math.min(SCORE_SENSITIVITY_PENALTY, SCORE_SENSITIVITY_CAP - sensitivityPointsUsed);
        score -= applied;
        sensitivityPointsUsed += applied;
      }
      flagged.push({
        ingredient: name,
        reason: literalHit
          ? `Matches your stated sensitivity/avoid entry: "${literalHit}"`
          : 'Matches your stated fragrance sensitivity (this is a recognized fragrance ingredient, even though its name doesn\'t say "fragrance")',
        affectsScore: applied > 0,
      });
      continue; // a sensitivity hit supersedes the general rule-table read for this ingredient
    }

    if (!rule) {
      unknownIngredients.push(name);
      continue;
    }

    const roles = rule.roles || [];
    const matchedGoalRoles = roles.filter(r => wantedRoles.has(r));

    // An ingredient matching a selected goal ALWAYS lists in
    // `positives`, even once the goal-match cap is reached — honest
    // about the cap (affectsScore:false past it, same pattern as
    // flagged/tradeoffs below) rather than silently re-counting it
    // against the separate general-quality pool, which would let
    // enough goal-matching ingredients blow past SCORE_GOAL_MATCH_CAP
    // through a back door.
    if (matchedGoalRoles.length > 0) {
      let applied = 0;
      if (goalPointsUsed < SCORE_GOAL_MATCH_CAP) {
        applied = Math.min(SCORE_GOAL_MATCH_POINTS, SCORE_GOAL_MATCH_CAP - goalPointsUsed);
        score += applied;
        goalPointsUsed += applied;
      }
      positives.push({
        ingredient: name,
        roles: matchedGoalRoles,
        explanation: matchedGoalRoles.map(r => INGREDIENT_ROLES[r]).join('; '),
        affectsScore: applied > 0,
      });
    } else {
      const matchedGeneralRoles = roles.filter(r => POSITIVE_ROLES.includes(r));
      if (matchedGeneralRoles.length > 0) {
        let applied = 0;
        if (generalPositivePointsUsed < SCORE_GENERAL_POSITIVE_CAP) {
          applied = Math.min(SCORE_GENERAL_POSITIVE_POINTS, SCORE_GENERAL_POSITIVE_CAP - generalPositivePointsUsed);
          score += applied;
          generalPositivePointsUsed += applied;
        }
        generalPositives.push({
          ingredient: name,
          roles: matchedGeneralRoles,
          explanation: matchedGeneralRoles.map(r => INGREDIENT_ROLES[r]).join('; '),
          affectsScore: applied > 0,
        });
      }
    }

    // Acne-type relevance is a separate personalization input from
    // goals (see methodology above) — only awarded when NOT already
    // credited via the goal-match tier for an acne-relevant role, so
    // selecting both acne_control AND a specific acne type doesn't
    // double-count the same ingredient.
    const matchedAcneRoles = roles.filter(r => ACNE_TYPE_RELEVANT_ROLES.includes(r));
    const alreadyCreditedForAcneRole = matchedGoalRoles.some(r => ACNE_TYPE_RELEVANT_ROLES.includes(r));
    if (hasRealAcneType && matchedAcneRoles.length > 0 && !alreadyCreditedForAcneRole) {
      let applied = 0;
      if (acneTypePointsUsed < SCORE_ACNE_TYPE_RELEVANCE_CAP) {
        applied = Math.min(SCORE_ACNE_TYPE_RELEVANCE_POINTS, SCORE_ACNE_TYPE_RELEVANCE_CAP - acneTypePointsUsed);
        score += applied;
        acneTypePointsUsed += applied;
      }
      positives.push({
        ingredient: name,
        roles: matchedAcneRoles,
        explanation: `Relevant to the acne type(s) you selected: ${matchedAcneRoles.map(r => INGREDIENT_ROLES[r]).join('; ')}`,
        affectsScore: applied > 0,
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
        const basePenalty = amplifyCaution ? Math.round(SCORE_GENERAL_CAUTION_PENALTY * SCORE_IRRITATION_CAUTION_MULTIPLIER) : SCORE_GENERAL_CAUTION_PENALTY;
        applied = Math.min(basePenalty, SCORE_GENERAL_CAUTION_CAP - cautionPointsUsed);
        score -= applied;
        cautionPointsUsed += applied;
      }
      tradeoffs.push({
        ingredient: name,
        note: generalCautionNotes.join(', '),
        explanation: generalCautionNotes.map(n => INGREDIENT_ROLES[n]).join('; ') + (amplifyCaution ? ' (weighted higher because your profile notes easily-irritated/sensitive skin)' : ''),
        affectsScore: applied > 0,
      });
    }

    if (skinType === 'oily' && roles.includes('occlusive') && oilyOcclusivePointsUsed < SCORE_OILY_OCCLUSIVE_CAP) {
      const applied = Math.min(SCORE_OILY_OCCLUSIVE_PENALTY, SCORE_OILY_OCCLUSIVE_CAP - oilyOcclusivePointsUsed);
      score -= applied;
      oilyOcclusivePointsUsed += applied;
      tradeoffs.push({
        ingredient: name,
        note: 'oily_skin_fit',
        explanation: 'An occlusive ingredient — may feel heavy for oily skin specifically (this is a texture/fit note, not a claim that it clogs pores).',
        affectsScore: applied > 0,
      });
    }
  }

  // Routine-overlap check: does another active product already supply
  // the same acne-active role?
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
  const profileIsEmpty = goals.length === 0 && sensitivities.length === 0 && !skinType && acneTypes.length === 0 && !easilyIrritated;
  const missingProfileFields = [];
  if (!skinType) missingProfileFields.push('skinType');
  if (acneTypes.length === 0) missingProfileFields.push('acneTypes');
  if (goals.length === 0) missingProfileFields.push('goals');

  let confidence;
  if (!ingredientsComplete || ingredients.length < 3 || !verified || profileIsEmpty) {
    confidence = 'low';
  } else {
    confidence = 'medium';
  }
  if (ingredientsComplete && verified && ingredients.length >= 3 && !profileIsEmpty) {
    confidence = 'high';
  }

  const acneAdvisory = acneTypes.map(a => ACNE_TYPE_ADVISORY[a]).find(Boolean) || null;

  const explanationParts = [
    'This is a general compatibility estimate from a deterministic rules table — not a clinical evaluation, not a guarantee, and not a diagnosis.',
  ];
  if (profileIsEmpty) {
    explanationParts.push('Your skin profile is empty, so this score only reflects the product\'s general ingredient quality — nothing here is personalized to you yet. Complete your skin profile for a more meaningful, personalized result.');
  } else if (missingProfileFields.length > 0) {
    const labels = missingProfileFields.map(f => SCORING_PROFILE_FIELD_LABELS[f]);
    explanationParts.push(`Your profile is missing ${labels.join(', ')} — adding ${missingProfileFields.length > 1 ? 'these' : 'this'} would make this score more personalized.`);
  }
  if (!ingredientsComplete) explanationParts.push('This product\'s ingredient list is marked incomplete, which lowers confidence.');
  if (!verified) explanationParts.push('This product\'s data hasn\'t been independently verified, which lowers confidence.');
  if (unknownIngredients.length > 0) explanationParts.push(`${unknownIngredients.length} ingredient(s) aren't in this app's reference table and were not scored in either direction.`);

  return {
    insufficient: false,
    score,
    confidence,
    missingProfileFields,
    profileIsEmpty,
    positives,
    generalPositives,
    tradeoffs,
    flagged,
    unknownIngredients,
    routineOverlap,
    acneAdvisory,
    explanation: explanationParts.join(' '),
  };
}
