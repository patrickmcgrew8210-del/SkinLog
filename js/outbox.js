/* ══════════════════════════════════════════════
   OUTBOX — durable local copy of the not-yet-synced cloud write, so a
   save survives a tab close/app kill before the network call to
   Supabase completes. One pending entry per user, keyed by user id.

   Deliberately isolated: nothing outside backend.js talks to IndexedDB
   or knows this file exists. If IndexedDB is unavailable (private
   browsing, storage disabled, very old browser), every function here
   fails soft — the debounced network write in backend.js still happens
   exactly as before this feature existed; the device just loses the
   offline-durability safety net, it doesn't lose the ability to save.
══════════════════════════════════════════════ */

const OUTBOX_DB_NAME = 'skinlog-outbox';
const OUTBOX_DB_VERSION = 1;
const OUTBOX_STORE = 'pending';

let _outboxDbPromise = null;
function openOutboxDb() {
  if (_outboxDbPromise) return _outboxDbPromise;
  _outboxDbPromise = new Promise((resolve, reject) => {
    if (!window.indexedDB) { reject(new Error('IndexedDB unavailable')); return; }
    const req = indexedDB.open(OUTBOX_DB_NAME, OUTBOX_DB_VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(OUTBOX_STORE)) {
        req.result.createObjectStore(OUTBOX_STORE, { keyPath: 'userId' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _outboxDbPromise;
}

/** Overwrites this user's single pending-write slot with the latest
 *  snapshot — a later call always supersedes an earlier still-unsynced
 *  one, since it represents the same device's newer edit. `capturedAt`
 *  is frozen once by the caller (not regenerated here) so that retrying
 *  the same queued write is byte-identical. */
async function queuePendingWrite(userId, payload, capturedAt) {
  try {
    const db = await openOutboxDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(OUTBOX_STORE, 'readwrite');
      tx.objectStore(OUTBOX_STORE).put({ userId, capturedAt, payload });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) { /* see file header — fails soft */ }
}

async function getPendingWrite(userId) {
  try {
    const db = await openOutboxDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(OUTBOX_STORE, 'readonly');
      const req = tx.objectStore(OUTBOX_STORE).get(userId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) { return null; }
}

/** Clears the pending entry only if it's still the exact one identified
 *  by capturedAt — guards against a newer edit (queued while a flush
 *  was in flight) being wiped out by that in-flight request's own
 *  eventual success. Used after a CONFIRMED successful sync. */
async function clearPendingWriteIfMatches(userId, capturedAt) {
  try {
    const db = await openOutboxDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(OUTBOX_STORE, 'readwrite');
      const store = tx.objectStore(OUTBOX_STORE);
      const req = store.get(userId);
      req.onsuccess = () => {
        const current = req.result;
        if (current && current.capturedAt === capturedAt) store.delete(userId);
      };
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) { /* see file header — fails soft */ }
}

/** Unconditional clear — used only once a pending write has been
 *  explicitly resolved by the user choosing to discard it in favor of
 *  the synced version (never used for a failed sync attempt). */
async function clearPendingWrite(userId) {
  try {
    const db = await openOutboxDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(OUTBOX_STORE, 'readwrite');
      tx.objectStore(OUTBOX_STORE).delete(userId);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) { /* see file header — fails soft */ }
}
