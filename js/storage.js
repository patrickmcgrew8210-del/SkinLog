/* ══════════════════════════════════════════════
   STORAGE — reads/writes the cloud-backed cache (see backend.js).
   Same synchronous shape as before; every other module is unaffected
   by the move from localStorage to Supabase.
══════════════════════════════════════════════ */

/** Reads entries and migrates legacy records (no id / no ISO dateKey) in place. */
function getLogs() {
  if (!_cloudCache) return [];
  const arr = _cloudCache.entries;
  let migrated = false;
  arr.forEach(l => {
    if (!l.id) { l.id = uid(); migrated = true; }
    if (!l.dateKey) {
      const parsed = new Date(l.date);
      l.dateKey = isNaN(parsed) ? isoDate(new Date()) : isoDate(parsed);
      migrated = true;
    }
    if (!l.products) { l.products = {}; migrated = true; }
    if (!l.breakoutAreas) { l.breakoutAreas = []; migrated = true; }
    if (l.cycleDay === undefined) { l.cycleDay = null; migrated = true; }
  });
  if (migrated) saveLogs(arr);
  return arr;
}
/** Persists entries to the cloud cache (fire-and-forget sync in the background). */
function saveLogs(arr) {
  if (!_cloudCache) return false;
  _cloudCache.entries = arr;
  persistCloudData();
  return true;
}
function getProducts() {
  return _cloudCache ? _cloudCache.products : [];
}
function saveProducts(arr) {
  if (!_cloudCache) return false;
  _cloudCache.products = arr;
  persistCloudData();
  return true;
}
function getCurrentProducts() {
  const map = _cloudCache ? _cloudCache.current_products : {};
  return { cleanser: null, treatment: null, moisturizer: null, spf: null, ...map };
}
function saveCurrentProducts(map) {
  if (!_cloudCache) return;
  _cloudCache.current_products = map;
  persistCloudData();
}

function isCycleTrackingEnabled() {
  return !!(_cloudCache && _cloudCache.settings.cycleTrackingEnabled);
}
function setCycleTrackingEnabled(on) {
  if (!_cloudCache) return;
  _cloudCache.settings = { ..._cloudCache.settings, cycleTrackingEnabled: !!on };
  persistCloudData();
}
