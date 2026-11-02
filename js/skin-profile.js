/* ══════════════════════════════════════════════
   SKIN PROFILE — optional preferences used by the compatibility
   scoring engine (js/scoring.js). Stored inside the existing
   `settings` JSONB bag (same pattern as cycleTrackingEnabled,
   pushSubscription, reminderHour) — no new top-level cloud field, no
   SQL migration, same backward-compatible "absent means unset" shape
   every other settings key already uses.

   Shape, all optional (absent/empty is a valid, common state):
     goals:          string[] — keys into SKIN_GOALS
     skinType:       string|null — one of SKIN_TYPES ('sensitive' is a
                     type option here; easilyIrritated below is a
                     separate, finer-grained signal, not a duplicate of it)
     acneTypes:      string[] — keys into SKIN_ACNE_TYPES. 'unsure_or_none'
                     is mutually exclusive with the rest (see the editor
                     UI in js/analyzer.js) — nobody is forced to pick a
                     specific acne type they don't have.
     sensitivities:  string[] — free-text ingredient names the user wants flagged
     easilyIrritated: bool — general sensitivity signal, independent of
                     skinType === 'sensitive' (e.g. an oily-skin user
                     whose skin still reacts easily)
     notes:          string — free text, never read by the scoring
                     engine; purely a note-to-self the user can see
                     when they reopen their profile
══════════════════════════════════════════════ */

const SKIN_GOALS = ['hydration', 'acne_control', 'oil_control', 'barrier_repair', 'redness_reduction', 'texture', 'dark_spots', 'anti_aging'];
const SKIN_GOAL_LABELS = {
  hydration: 'Hydration', acne_control: 'Acne control', oil_control: 'Oil control',
  barrier_repair: 'Improving skin barrier', redness_reduction: 'Reducing redness',
  texture: 'Texture', dark_spots: 'Dark spots', anti_aging: 'Anti-aging',
};
const SKIN_TYPES = ['normal', 'dry', 'oily', 'combination', 'sensitive'];
const SKIN_TYPE_LABELS = { normal: 'Normal', dry: 'Dry', oily: 'Oily', combination: 'Combination', sensitive: 'Sensitive' };

const SKIN_ACNE_TYPES = ['whiteheads', 'blackheads', 'papules', 'pustules', 'cystic_nodular', 'unsure_or_none'];
const SKIN_ACNE_TYPE_LABELS = {
  whiteheads: 'Whiteheads', blackheads: 'Blackheads', papules: 'Papules (small inflamed bumps)',
  pustules: 'Pustules (pus-filled pimples)', cystic_nodular: 'Cystic or nodular acne',
  unsure_or_none: "I'm not sure / I don't have acne",
};

const SKIN_PROFILE_NOTES_MAX_LENGTH = 300;

function getSkinProfile() {
  const sp = (_cloudCache && _cloudCache.settings && _cloudCache.settings.skinProfile) || {};
  return {
    goals: Array.isArray(sp.goals) ? sp.goals : [],
    skinType: sp.skinType || null,
    acneTypes: Array.isArray(sp.acneTypes) ? sp.acneTypes : [],
    sensitivities: Array.isArray(sp.sensitivities) ? sp.sensitivities : [],
    easilyIrritated: sp.easilyIrritated === true,
    notes: typeof sp.notes === 'string' ? sp.notes : '',
  };
}

function saveSkinProfile(profile) {
  if (!_cloudCache) return false;
  _cloudCache.settings = { ..._cloudCache.settings, skinProfile: profile };
  persistCloudData();
  return true;
}

/** Whether a profile has ANY scoring-relevant signal at all (goals,
 *  skin type, acne type, sensitivities, or the irritation flag) — used
 *  to lower scoring confidence when the user hasn't told us anything
 *  yet, rather than silently scoring against an empty profile as if
 *  that were meaningful. `notes` is excluded on purpose: it's never
 *  read by the scoring engine, so its presence shouldn't count as
 *  "the user has a profile" for scoring purposes. */
function isSkinProfileEmpty(profile) {
  return profile.goals.length === 0 && !profile.skinType && profile.acneTypes.length === 0 &&
    profile.sensitivities.length === 0 && !profile.easilyIrritated;
}

/** The 3 "core" fields a profile needs to feel genuinely filled out
 *  (skin type, acne type, at least one goal — sensitivities/
 *  irritation/notes are extras on top). Returns which of those three
 *  are still unset, so the UI can say exactly what's missing instead
 *  of a vague "complete your profile." Answering 'unsure_or_none' for
 *  acne type counts as answered — nobody is forced to claim acne they
 *  don't have just to clear this list. */
function getSkinProfileMissingCoreFields(profile) {
  const missing = [];
  if (!profile.skinType) missing.push('skinType');
  if (profile.acneTypes.length === 0) missing.push('acneTypes');
  if (profile.goals.length === 0) missing.push('goals');
  return missing;
}

const SKIN_PROFILE_FIELD_LABELS = { skinType: 'skin type', acneTypes: 'acne type', goals: 'skin goals' };

function isSkinProfileCoreComplete(profile) {
  return getSkinProfileMissingCoreFields(profile).length === 0;
}

/* ── Dashboard invite banner: dismissible, persisted per-account (same
   "absent means unset" settings bag as everything else here) so it
   doesn't nag someone who's already said no, but also doesn't need a
   fresh dismissal per device. ── */
function isSkinProfileBannerDismissed() {
  return !!(_cloudCache && _cloudCache.settings && _cloudCache.settings.skinProfileBannerDismissed);
}
function dismissSkinProfileBanner() {
  if (!_cloudCache) return;
  _cloudCache.settings = { ..._cloudCache.settings, skinProfileBannerDismissed: true };
  persistCloudData();
  document.getElementById('skin-profile-banner')?.classList.add('hidden');
}
function hydrateSkinProfileBanner() {
  const banner = document.getElementById('skin-profile-banner');
  if (!banner) return;
  const show = !isSkinProfileCoreComplete(getSkinProfile()) && !isSkinProfileBannerDismissed();
  banner.classList.toggle('hidden', !show);
}
