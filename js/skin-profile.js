/* ══════════════════════════════════════════════
   SKIN PROFILE — minimal, optional preferences used only by the
   compatibility scoring engine (js/scoring.js). Stored inside the
   existing `settings` JSONB bag (same pattern as cycleTrackingEnabled,
   pushSubscription, reminderHour) — no new top-level cloud field, no
   SQL migration, same backward-compatible "absent means unset" shape
   every other settings key already uses.
══════════════════════════════════════════════ */

const SKIN_GOALS = ['hydration', 'acne_control', 'barrier_repair', 'brightening', 'sun_protection'];
const SKIN_GOAL_LABELS = {
  hydration: 'Hydration', acne_control: 'Acne control', barrier_repair: 'Barrier repair',
  brightening: 'Brightening / even tone', sun_protection: 'Sun protection',
};
const SKIN_TYPES = ['normal', 'dry', 'oily', 'combination', 'sensitive'];
const SKIN_TYPE_LABELS = { normal: 'Normal', dry: 'Dry', oily: 'Oily', combination: 'Combination', sensitive: 'Sensitive' };

function getSkinProfile() {
  const sp = (_cloudCache && _cloudCache.settings && _cloudCache.settings.skinProfile) || {};
  return {
    goals: Array.isArray(sp.goals) ? sp.goals : [],
    skinType: sp.skinType || null,
    sensitivities: Array.isArray(sp.sensitivities) ? sp.sensitivities : [], // free-text ingredient names the user wants flagged
  };
}

function saveSkinProfile(profile) {
  if (!_cloudCache) return false;
  _cloudCache.settings = { ..._cloudCache.settings, skinProfile: profile };
  persistCloudData();
  return true;
}

/** Whether a profile has anything in it at all — used to lower scoring
 *  confidence when the user hasn't set any preferences yet, rather than
 *  silently scoring against an empty profile as if that were meaningful. */
function isSkinProfileEmpty(profile) {
  return profile.goals.length === 0 && !profile.skinType && profile.sensitivities.length === 0;
}
