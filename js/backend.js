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

function emptyCloudRow() {
  return { entries: [], products: [], current_products: {}, settings: {}, display_name: '' };
}

/** Fetches (or creates) the signed-in user's row and populates _cloudCache. */
async function loadCloudData(userId) {
  _cloudUserId = userId;
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
  } else {
    // First sign-in — create the row.
    _cloudCache = emptyCloudRow();
    await sb.from('skinlog_data').insert({ user_id: userId, ...toRow(_cloudCache) });
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

/** Debounced upsert of the whole row — callers don't await this. */
function persistCloudData() {
  if (!_cloudUserId || !_cloudCache) return;
  clearTimeout(_persistTimer);
  _persistTimer = setTimeout(async () => {
    const { error } = await sb.from('skinlog_data')
      .update(toRow(_cloudCache))
      .eq('user_id', _cloudUserId);
    if (error) showToast('Could not sync to the cloud — check your connection.', 'error');
  }, 400);
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
