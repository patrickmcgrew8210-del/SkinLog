/* ══════════════════════════════════════════════
   BACKEND — Supabase client, auth, and the cloud-backed data cache.
   storage.js reads/writes _cloudCache synchronously; this file is the
   only place that talks to the network.
══════════════════════════════════════════════ */

const SUPABASE_URL = 'https://cmndknueukcaahjyityg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbmRrbnVldWtjYWFoanlpdHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA3NjIsImV4cCI6MjEwMTI1Njc2Mn0._z4p-PjPLrHWkJ_n_RZ5qS6j1m9O97tEfsHYZ0S3K8Q';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// In-memory mirror of the user's cloud row. Everything in storage.js
// reads/writes this object directly and synchronously.
let _cloudCache = null;
let _cloudUserId = null;
let _persistTimer = null;
let _isNewCloudUser = false;
let _loadingUserId = null;
let _loadPromise = null;
let _lastServerUpdatedAt = null; // updated_at from the last server row we fetched — see reconcilePendingWriteForUser()

function emptyCloudRow() {
  return { entries: [], products: [], current_products: {}, settings: {}, display_name: '' };
}

/** Fetches (or creates) the signed-in user's row and populates _cloudCache.
 *  Sets _isNewCloudUser when this is the very first time this account has
 *  signed in (no row existed yet), regardless of provider.
 *
 *  Both a successful sign-up/sign-in AND the app-wide auth-state listener
 *  (which exists to catch the Google OAuth redirect) can end up calling
 *  this for the same user around the same time. If a load for this exact
 *  user is already in flight, piggyback on it instead of racing it —
 *  otherwise the second call finding the row the first just inserted
 *  would wrongly clear _isNewCloudUser. */
async function loadCloudData(userId) {
  if (_cloudUserId === userId && _cloudCache) return;
  if (_loadingUserId === userId && _loadPromise) return _loadPromise;

  _loadingUserId = userId;
  _loadPromise = (async () => {
    _cloudUserId = userId;
    _isNewCloudUser = false;
    const { data, error } = await sb.from('skinlog_data').select('*').eq('user_id', userId).maybeSingle();
    if (error) {
      showToast('Could not reach the cloud — showing your last saved data.', 'error');
      _cloudCache = emptyCloudRow();
      return;
    }
    if (data) {
      _cloudCache = {
        entries: data.entries || [],
        products: data.products || [],
        current_products: data.current_products || {},
        settings: data.settings || {},
        display_name: data.display_name || '',
      };
      _lastServerUpdatedAt = data.updated_at || null;
    } else {
      // First sign-in — create the row.
      _cloudCache = emptyCloudRow();
      _isNewCloudUser = true;
      await sb.from('skinlog_data').insert({ user_id: userId, ...toRow(_cloudCache) });
    }
  })();

  try {
    await _loadPromise;
  } finally {
    _loadingUserId = null;
    _loadPromise = null;
  }
}

function toRow(cache) {
  return {
    entries: cache.entries,
    products: cache.products,
    current_products: cache.current_products,
    settings: cache.settings,
    display_name: cache.display_name,
    updated_at: new Date().toISOString(),
  };
}

/** Debounced upsert of the whole row — callers don't await this.
 *
 *  Every call durably queues the current state to the outbox
 *  immediately (before the debounce timer, so it survives a tab close
 *  even within the 400ms window), freezing a single timestamp for that
 *  snapshot so a retry of the same write is byte-identical rather than
 *  drifting its own updated_at on every attempt. */
function persistCloudData() {
  if (!_cloudUserId || !_cloudCache) return;
  const capturedAt = new Date().toISOString();
  const payload = { ..._cloudCache };
  queuePendingWrite(_cloudUserId, payload, capturedAt);

  clearTimeout(_persistTimer);
  _persistTimer = setTimeout(() => flushPendingWrite(_cloudUserId), 400);
}

/** Sends whatever is currently queued for this user, if anything.
 *  Shared by the debounce timer above, the online-reconnect retry, and
 *  boot-time reconciliation below, so there's one write path and one
 *  place that decides when it's actually safe to clear the outbox.
 *
 *  The outbox entry is cleared ONLY on confirmed success, and only if
 *  it's still the exact entry just sent — a newer edit queued while
 *  this request was in flight is left untouched rather than wiped out
 *  by this request's own success landing after the fact. */
async function flushPendingWrite(userId) {
  const pending = await getPendingWrite(userId);
  if (!pending) return;
  const row = toRow(pending.payload);
  row.updated_at = pending.capturedAt;
  const { error } = await sb.from('skinlog_data').update(row).eq('user_id', userId);
  if (error) {
    showToast('Could not sync to the cloud — check your connection.', 'error');
    return; // stays queued; retried on reconnect, next edit, or next boot
  }
  await clearPendingWriteIfMatches(userId, pending.capturedAt);
}

/** Reads and decides — but does not yet act on — any pending offline
 *  write for this user. Must run before dismissAuthScreen()'s
 *  setUserName() call, which harmlessly re-saves the display name on
 *  every sign-in (even when it hasn't changed) and, like any other
 *  edit, calls persistCloudData() — which would otherwise overwrite
 *  this user's single outbox slot with that redundant save before this
 *  function ever gets to look at the real pending entry. Capturing the
 *  payload here and carrying it through to applyPendingReconciliation()
 *  makes the decision immune to whatever else queues a write in
 *  between.
 *
 *  This is a conflict-RISK heuristic, not proof of a conflict:
 *  updated_at is a client-clock timestamp with no server-side
 *  authority, so it can't fully rule out a genuine multi-device
 *  conflict — it only distinguishes "nothing else plausibly wrote
 *  while we were offline" from "something plausibly did." */
async function preparePendingReconciliation(userId) {
  const pending = await getPendingWrite(userId);
  if (!pending) return { type: 'none' };
  const serverMayBeNewer = !!(_lastServerUpdatedAt && _lastServerUpdatedAt > pending.capturedAt);
  return { type: serverMayBeNewer ? 'ask' : 'safe', pending };
}

/** Acts on a decision from preparePendingReconciliation(). Runs after
 *  the auth/biometric overlays are gone so a conflict-risk prompt (the
 *  'ask' case) is actually visible and interactive, not hidden behind
 *  them — see the call site in app.js.
 *
 *  - 'safe' (server not newer than the pending write): adopt it into
 *    _cloudCache (so the UI shows the real unsynced state, not the
 *    stale server snapshot) and attempt to flush it. Per
 *    flushPendingWrite() above, the outbox entry is only cleared once
 *    that attempt actually succeeds.
 *  - 'ask' (server appears newer): ask, rather than silently pick a
 *    side. Dismissing/ignoring the prompt (backdrop click, Escape, or
 *    simply not answering) resolves as "keep the synced version" — an
 *    unresolved offline edit is a smaller loss than silently
 *    overwriting data another device may depend on.
 *
 *  Both act using the captured payload directly and re-queue it before
 *  flushing, rather than trusting whatever the outbox slot currently
 *  holds — it may have since been overwritten by an unrelated
 *  persistCloudData() call, as above. */
async function applyPendingReconciliation(userId, reconciliation) {
  if (!reconciliation || reconciliation.type === 'none') return;
  const { pending } = reconciliation;

  const adoptAndFlush = async () => {
    _cloudCache = { ...pending.payload };
    hydrateDashboard();
    await queuePendingWrite(userId, pending.payload, pending.capturedAt);
    flushPendingWrite(userId);
  };

  if (reconciliation.type === 'safe') {
    await adoptAndFlush();
    return;
  }

  showConfirmDialog({
    title: 'Unsynced change from last time',
    message: "We found a change from a previous session that never finished syncing, and this account now has a newer synced version. Keeping the offline change will overwrite that newer version.",
    confirmLabel: 'Keep offline change',
    cancelLabel: 'Keep synced version',
    danger: true,
    onConfirm: adoptAndFlush,
    onCancel: () => {
      clearPendingWrite(userId);
    },
  });
}

/* ── Auth actions ── */

async function signUpWithEmail(email, password, displayName) {
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) return { error };
  if (data.user && !data.session) {
    return { needsConfirmation: true };
  }
  if (data.user) {
    await loadCloudData(data.user.id);
    _cloudCache.display_name = displayName;
    persistCloudData();
  }
  return { user: data.user };
}

async function signInWithEmail(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { error };
  await loadCloudData(data.user.id);
  return { user: data.user };
}

async function signInWithGoogleClick() {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.href },
  });
  if (error) showToast('Google sign-in isn\'t set up yet.', 'error');
}

async function doCloudSignOut() {
  await sb.auth.signOut();
  _cloudCache = null;
  _cloudUserId = null;
}

/** Permanently deletes the signed-in user's account and all their data. */
async function deleteAccount() {
  const { error } = await sb.rpc('delete_user');
  if (error) return { error };
  await sb.auth.signOut();
  _cloudCache = null;
  _cloudUserId = null;
  return {};
}
