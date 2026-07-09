/* ══════════════════════════════════════════════
   STORAGE — localStorage read/write primitives (entries, products, settings)
══════════════════════════════════════════════ */

/** Reads entries and migrates legacy records (no id / no ISO dateKey) in place. */
function getLogs() {
  let arr;
  try { arr = JSON.parse(localStorage.getItem('skinlog-entries') || '[]'); }
  catch (e) { arr = []; }
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
/** Persists entries; returns false (and toasts) if storage write failed,
 *  e.g. quota exceeded from accumulated photos, so callers can react
 *  instead of silently losing the entry. */
function saveLogs(arr) {
  try {
    localStorage.setItem('skinlog-entries', JSON.stringify(arr));
    return true;
  } catch (e) {
    showToast('Could not save — device storage is full. Try removing an old photo.', 'error');
    return false;
  }
}
function getProducts() {
  try { return JSON.parse(localStorage.getItem('skinlog-products') || '[]'); }
  catch (e) { return []; }
}
function saveProducts(arr) {
  try {
    localStorage.setItem('skinlog-products', JSON.stringify(arr));
    return true;
  } catch (e) {
    showToast('Could not save — device storage is full.', 'error');
    return false;
  }
}
function getCurrentProducts() {
  let map;
  try { map = JSON.parse(localStorage.getItem('skinlog-current-products') || '{}'); }
  catch (e) { map = {}; }
  return { cleanser: null, treatment: null, moisturizer: null, spf: null, ...map };
}
function saveCurrentProducts(map) {
  try { localStorage.setItem('skinlog-current-products', JSON.stringify(map)); } catch (e) {}
}

function isCycleTrackingEnabled() {
  return localStorage.getItem('skinlog-cycle-tracking-enabled') === '1';
}
