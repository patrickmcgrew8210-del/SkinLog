/* ══════════════════════════════════════════════
   LOG FORM — sliders, routine, sleep, cycle field, save/reset/load lifecycle
══════════════════════════════════════════════ */

function syncCycleFieldVisibility() {
  document.getElementById('cycle-day-field')?.classList.toggle('hidden', !isCycleTrackingEnabled());
}
/** Reads/validates the cycle-day input; when tracking is currently
 *  disabled, falls back to the entry's existing value so re-saving an
 *  entry while the field is hidden doesn't silently wipe it. */
function readCycleDayInput(editingEntry) {
  if (!isCycleTrackingEnabled()) return editingEntry?.cycleDay ?? null;
  const v = parseInt(document.getElementById('cycle-day-input')?.value, 10);
  return (Number.isInteger(v) && v >= 1 && v <= 40) ? v : null;
}
function toggleCycleTracking() {
  const next = !isCycleTrackingEnabled();
  if (next) localStorage.setItem('skinlog-cycle-tracking-enabled', '1');
  else localStorage.removeItem('skinlog-cycle-tracking-enabled');
  const stateEl = document.getElementById('cycle-toggle-state');
  if (stateEl) { stateEl.textContent = next ? 'ON' : 'OFF'; stateEl.style.color = next ? '#607a5c' : '#9e8a80'; }
  syncCycleFieldVisibility();
  showToast(next ? 'Cycle day tracking on' : 'Cycle day tracking off', 'success');
}

function updateSlider(type, val) {
  val = parseInt(val);
  const pct    = ((val - 1) / 4) * 100;
  const slider = document.getElementById(`${type}-slider`);
  const labels = type === 'breakout' ? BREAKOUT_LABELS : REDNESS_LABELS;
  const colors = type === 'breakout' ? BREAKOUT_COLORS : REDNESS_COLORS;
  const color  = colors[val];
  slider.style.setProperty('--val', pct + '%');
  slider.style.setProperty('--thumb-color', color);
  document.getElementById(`${type}-val`).textContent   = val;
  document.getElementById(`${type}-label`).textContent = labels[val];
  const badge = document.getElementById(`${type}-badge`);
  badge.style.background  = `linear-gradient(135deg, ${color}22, ${color}11)`;
  badge.style.borderColor = `${color}55`;
  badge.querySelectorAll('span').forEach(s => s.style.color = color);
}

function toggleRoutine(btn) {
  const cls = btn.dataset.period === 'am' ? 'active-am' : 'active-pm';
  btn.classList.toggle(cls);
  updateRoutineProgress();
}
function updateRoutineProgress() {
  const total  = document.querySelectorAll('.routine-toggle:not([style*="pointer-events:none"])').length;
  const active = document.querySelectorAll('.routine-toggle.active-am, .routine-toggle.active-pm').length;
  document.getElementById('routine-count').textContent    = `${active} / ${total}`;
  document.getElementById('routine-progress').style.width = `${(active / total) * 100}%`;
}

function setSleep(btn) {
  document.querySelectorAll('.sleep-btn').forEach(b => {
    b.style.background = b.style.borderColor = b.style.color = '';
  });
  const s = SLEEP_STYLES[btn.dataset.sleep];
  btn.style.background = s.bg; btn.style.borderColor = s.border; btn.style.color = s.color;
}

let _editingEntryId        = null;  // id of the entry being edited, or null for a fresh entry
/** Clears the whole log form back to a blank entry and exits edit mode. */
function resetLogForm() {
  _editingEntryId = null;
  _editingOriginalPhoto = null;
  _pendingPhotoDataUrl = null;
  _photoExplicitlyCleared = false;

  const bSlider = document.getElementById('breakout-slider');
  const rSlider = document.getElementById('redness-slider');
  bSlider.value = 1; updateSlider('breakout', 1);
  rSlider.value = 1; updateSlider('redness', 1);
  setBreakoutAreas([]);
  document.querySelectorAll('.routine-toggle').forEach(b => b.classList.remove('active-am', 'active-pm'));
  updateRoutineProgress();
  document.getElementById('note-diet').value = '';
  document.getElementById('note-triggers').value = '';
  document.getElementById('cycle-day-input').value = '';
  syncCycleFieldVisibility();
  document.querySelectorAll('.sleep-btn').forEach(b => { b.style.background = b.style.borderColor = b.style.color = ''; });

  const input = document.getElementById('log-photo-input');
  if (input) input.value = '';
  const img = document.getElementById('photo-preview-img');
  if (img) img.src = '';
  document.getElementById('photo-preview-wrap')?.classList.add('hidden');
  document.getElementById('photo-upload-zone')?.classList.remove('hidden');

  const label = document.getElementById('log-date-label');
  if (label) label.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  updateLogHeader(false);

  _formProducts = { ...getCurrentProducts(), other: [] };
  renderAllProductChips();
  renderOtherProductPills();
}

/** Populates the log form's inputs from an existing entry, for editing. */
function loadEntryIntoForm(entry) {
  const bSlider = document.getElementById('breakout-slider');
  const rSlider = document.getElementById('redness-slider');
  bSlider.value = entry.breakout; updateSlider('breakout', entry.breakout);
  rSlider.value = entry.redness;  updateSlider('redness', entry.redness);
  setBreakoutAreas(entry.breakoutAreas);

  document.querySelectorAll('.routine-toggle').forEach(b => {
    b.classList.remove('active-am', 'active-pm');
    const key = `${b.dataset.step}-${b.dataset.period}`;
    if ((entry.routine || []).includes(key)) b.classList.add(b.dataset.period === 'am' ? 'active-am' : 'active-pm');
  });
  updateRoutineProgress();

  document.getElementById('note-diet').value = entry.diet || '';
  document.getElementById('note-triggers').value = entry.triggers || '';
  document.getElementById('cycle-day-input').value = entry.cycleDay ?? '';
  syncCycleFieldVisibility();

  document.querySelectorAll('.sleep-btn').forEach(b => {
    b.style.background = b.style.borderColor = b.style.color = '';
    if (b.dataset.sleep === entry.sleep) setSleep(b);
  });

  _pendingPhotoDataUrl = null;
  _photoExplicitlyCleared = false;
  _editingOriginalPhoto = entry.photo || null;
  const img = document.getElementById('photo-preview-img');
  const zone = document.getElementById('photo-upload-zone');
  const wrap = document.getElementById('photo-preview-wrap');
  if (entry.photo) {
    img.src = entry.photo;
    document.getElementById('photo-preview-date').textContent = entry.date;
    zone.classList.add('hidden'); wrap.classList.remove('hidden');
  } else {
    img.src = ''; zone.classList.remove('hidden'); wrap.classList.add('hidden');
  }

  _formProducts = { cleanser: null, treatment: null, moisturizer: null, spf: null, ...(entry.products || {}), other: [...(entry.products?.other || [])] };
  renderAllProductChips();
  renderOtherProductPills();
}

/** Shows/hides the "you're editing an existing entry" banner on the Log screen. */
function updateLogHeader(isEditing, entry) {
  const banner = document.getElementById('editing-banner');
  const text = document.getElementById('editing-banner-text');
  if (!banner || !text) return;
  if (isEditing && entry) {
    const todayKey = isoDate(new Date());
    text.textContent = entry.dateKey === todayKey ? "Updating today's entry" : `Editing entry from ${entry.date}`;
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}

/** Opens the Log screen pre-filled with an existing entry (from History). */
function openLogForEntry(entry) {
  _editingEntryId = entry.id;
  loadEntryIntoForm(entry);
  const label = document.getElementById('log-date-label');
  if (label) label.textContent = entry.date;
  updateLogHeader(true, entry);
  setNav('log', document.querySelector('[data-view="log"]'));
}

function editEntryById(id) {
  const entry = getLogs().find(l => l.id === id);
  if (entry) openLogForEntry(entry);
}

/** Opens the Log screen for today — loads today's entry for amending if
 *  one already exists, otherwise starts blank. Used by nav + dashboard CTA. */
function openLogForToday() {
  resetLogForm();
  const todayEntry = getLogs().find(l => l.dateKey === isoDate(new Date()));
  if (todayEntry) {
    _editingEntryId = todayEntry.id;
    loadEntryIntoForm(todayEntry);
    updateLogHeader(true, todayEntry);
  }
  setNav('log', document.querySelector('[data-view="log"]'));
}

function cancelEditLog() {
  resetLogForm();
  setNav('dashboard', document.querySelector('[data-view="dashboard"]'));
}

function saveLog() {
  const btn = document.getElementById('save-btn');
  btn.disabled      = true;
  btn.style.opacity = '0.75';

  function _commit(photoDataUrl) {
    const logs = getLogs();
    const editing = _editingEntryId ? logs.find(l => l.id === _editingEntryId) : null;
    const dateKey = editing ? editing.dateKey : isoDate(new Date());
    const date    = editing ? editing.date    : new Date().toLocaleDateString();

    const entry = {
      id:       editing ? editing.id : uid(),
      dateKey,
      date,
      breakout: document.getElementById('breakout-slider').value,
      redness:  document.getElementById('redness-slider').value,
      breakoutAreas: getActiveBreakoutAreas(),
      routine:  [...document.querySelectorAll('.routine-toggle.active-am,.routine-toggle.active-pm')]
                  .map(b => `${b.dataset.step}-${b.dataset.period}`),
      diet:     document.getElementById('note-diet').value,
      triggers: document.getElementById('note-triggers').value,
      cycleDay: readCycleDayInput(editing),
      sleep:    document.querySelector('.sleep-btn[style*="background"]')?.dataset.sleep || 'not set',
      photo:    photoDataUrl || null,   // compressed JPEG data URL or null
      products: { ..._formProducts, other: [..._formProducts.other] },
    };

    // Upsert: editing replaces by id; a fresh save replaces any existing
    // entry for the same day instead of creating a duplicate.
    const idx = editing
      ? logs.findIndex(l => l.id === editing.id)
      : logs.findIndex(l => l.dateKey === dateKey);
    if (idx >= 0) logs[idx] = entry; else logs.unshift(entry);

    const ok = saveLogs(logs);

    btn.disabled      = false;
    btn.style.opacity = '1';

    if (!ok) return; // saveLogs() already surfaced the error via toast

    btn.innerHTML     = `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>Entry Saved!`;
    btn.style.background = 'linear-gradient(110deg,#607a5c,#8fa88a)';
    btn.style.animation  = 'none';

    const wasEditingPastEntry = !!editing && editing.dateKey !== isoDate(new Date());

    setTimeout(() => {
      btn.innerHTML = `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Save Today's Log`;
      btn.style.background = '';
      resetLogForm();
      const dest = wasEditingPastEntry ? 'history' : 'dashboard';
      setNav(dest, document.querySelector(`[data-view="${dest}"]`));
    }, 1600);
  }

  resolveFormPhoto(_commit);
}

