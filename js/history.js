/* ══════════════════════════════════════════════
   HISTORY — timeline rendering, delete, before/after photo compare
══════════════════════════════════════════════ */

let _compareIdx = { before: 0, after: 0 }; // indices into getPhotoEntries(), oldest→newest

function renderHistory() {
  const logs = getLogs();
  const timeline = document.getElementById('history-timeline');
  const empty    = document.getElementById('history-empty');
  const statsEl  = document.getElementById('history-stats');
  const trendCard= document.getElementById('history-trend-card');

  // Clear previous render (keep spine div)
  [...timeline.children].forEach(c => { if (!c.classList.contains('timeline-spine')) c.remove(); });
  statsEl.innerHTML = '';

  document.getElementById('compare-cta')?.classList.toggle('hidden', getPhotoEntries().length < 2);

  if (logs.length === 0) {
    empty.classList.remove('hidden');
    trendCard.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');

  /* ── AGGREGATE STATS ── */
  const bVals = logs.map(l => parseInt(l.breakout));
  const rVals = logs.map(l => parseInt(l.redness));
  const avgB  = avg(bVals);
  const avgR  = avg(rVals);
  const bestB = Math.min(...bVals);
  const totalRoutineSteps = logs.reduce((acc,l) => acc + (l.routine?.length||0), 0);
  const avgRoutine = (totalRoutineSteps / (logs.length * 7) * 100).toFixed(0);

  const statItems = [
    { label:'Entries',   value: logs.length,     sub:'logged',    bg:'#f2e0de', color:'#b5706a' },
    { label:'Avg Break', value: avgB,             sub:'out of 5',  bg:'#f2e0de', color:'#943f3a' },
    { label:'Avg Red.',  value: avgR,             sub:'out of 5',  bg:'#dde8db', color:'#607a5c' },
    { label:'Routine',   value: avgRoutine+'%',   sub:'completed', bg:'#fef3c7', color:'#92400e' },
  ];
  statItems.forEach(s => {
    const el = document.createElement('div');
    el.className = 'rounded-2xl p-3 text-center';
    el.style.background = s.bg + '80';
    el.innerHTML = `
      <div class="font-serif text-xl font-semibold" style="color:${s.color}">${s.value}</div>
      <div class="text-[9px] font-bold uppercase tracking-wider text-bark-muted leading-tight mt-0.5">${s.label}</div>
      <div class="text-[9px] text-bark-muted">${s.sub}</div>`;
    statsEl.appendChild(el);
  });

  /* ── SPARKLINES ── */
  const recent = logs.slice(0, 14).reverse(); // oldest→newest for chart
  trendCard.classList.remove('hidden');
  buildSparkline('sparkline-breakout', recent.map(l=>parseInt(l.breakout)), BREAKOUT_COLORS);
  buildSparkline('sparkline-redness',  recent.map(l=>parseInt(l.redness)),  REDNESS_COLORS);
  const bTrend = trendArrow(recent.map(l=>parseInt(l.breakout)));
  const rTrend = trendArrow(recent.map(l=>parseInt(l.redness)));
  document.getElementById('trend-breakout-label').textContent = `${bTrend.arrow} ${bTrend.label}`;
  document.getElementById('trend-breakout-label').style.color = bTrend.color;
  document.getElementById('trend-redness-label').textContent  = `${rTrend.arrow} ${rTrend.label}`;
  document.getElementById('trend-redness-label').style.color  = rTrend.color;

  /* ── TIMELINE CARDS ── */
  logs.forEach((entry, idx) => {
    const b  = parseInt(entry.breakout);
    const r  = parseInt(entry.redness);
    const bC = severityColor(b);
    const rC = REDNESS_COLORS[r] || '#8fa88a';
    const routinePct = Math.round((entry.routine?.length||0) / 7 * 100);
    const isLatest   = idx === 0;
    const dateSafe   = escapeHtml(entry.date);

    const wrap = document.createElement('div');
    wrap.className = 'flex gap-3 items-start';
    wrap.innerHTML = `
      <!-- Timeline dot -->
      <div class="timeline-dot mt-1 flex-shrink-0" style="background:${bC}; color:${bC}"></div>

      <!-- Card -->
      <div class="history-card card flex-1 rounded-2xl p-4 mb-1 ${isLatest ? 'ring-2 ring-blush/40' : ''}">
        <!-- Row 1: date + sleep + edit/delete -->
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest text-bark-muted">${isLatest ? '⭐ Latest · ' : ''}${dateSafe}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-base">${SLEEP_EMOJI[entry.sleep] || '—'}</span>
            <span class="text-[10px] font-semibold text-bark-muted capitalize">${escapeHtml(entry.sleep)}</span>
            <div class="flex items-center gap-1 no-print ml-1">
              <button type="button" data-action="edit-entry" data-entry-id="${entry.id}" class="w-7 h-7 rounded-full bg-white/70 border border-blush/20 flex items-center justify-center active:scale-90 transition-transform" aria-label="Edit entry">
                <svg class="w-3.5 h-3.5 text-bark-muted pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button type="button" data-action="delete-entry" data-entry-id="${entry.id}" class="w-7 h-7 rounded-full bg-white/70 border border-blush/20 flex items-center justify-center active:scale-90 transition-transform" aria-label="Delete entry">
                <svg class="w-3.5 h-3.5 text-blush-dark pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Row 2: score bars -->
        <div class="space-y-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold text-bark-muted w-14 flex-shrink-0">BREAKOUT</span>
            <div class="flex-1 score-bar-track">
              <div class="score-bar-fill" style="width:${(b/5)*100}%; background:${bC}"></div>
            </div>
            <span class="text-xs font-bold w-4 text-right flex-shrink-0" style="color:${bC}">${b}</span>
            <span class="text-[10px] text-bark-muted w-16 flex-shrink-0">${BREAKOUT_LABELS[b]}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold text-bark-muted w-14 flex-shrink-0">REDNESS</span>
            <div class="flex-1 score-bar-track" style="background:#dde8db">
              <div class="score-bar-fill" style="width:${(r/5)*100}%; background:${rC}"></div>
            </div>
            <span class="text-xs font-bold w-4 text-right flex-shrink-0" style="color:${rC}">${r}</span>
            <span class="text-[10px] text-bark-muted w-16 flex-shrink-0">${REDNESS_LABELS[r]}</span>
          </div>
        </div>

        <!-- Row 3: routine pill + notes -->
        <div class="flex items-start gap-2 flex-wrap">
          <span class="text-[10px] font-semibold px-2 py-1 rounded-lg" style="background:${routinePct>=80?'#dde8db':'#f2e0de'};color:${routinePct>=80?'#607a5c':'#b5706a'}">
            ✓ ${routinePct}% routine
          </span>
          ${entry.triggers ? `<span class="text-[10px] text-bark-muted flex-1 line-clamp-1">⚡ ${escapeHtml(entry.triggers)}</span>` : ''}
        </div>
        ${entry.diet ? `<p class="text-[10px] text-bark-muted mt-1.5 line-clamp-1">🥗 ${escapeHtml(entry.diet)}</p>` : ''}
        ${(entry.breakoutAreas||[]).length || entry.cycleDay ? `<div class="flex flex-wrap gap-1 mt-2">
          ${entry.cycleDay ? `<span class="text-[9px] font-semibold px-2 py-0.5 rounded-full" style="background:#fce7f3;color:#9d174d">Day ${entry.cycleDay}</span>` : ''}
          ${entry.breakoutAreas.map(a => `<span class="text-[9px] font-semibold px-2 py-0.5 rounded-full" style="background:#f2e0de;color:#b5706a">${escapeHtml(FACE_REGION_LABELS[a]||a)}</span>`).join('')}
        </div>` : ''}

        ${entry.photo ? `
        <!-- Phase 5: progress photo thumbnail -->
        <div class="relative mt-3 photo-thumb-wrap" data-action="view-photo" data-entry-id="${entry.id}">
          <img src="${entry.photo}"
            alt="Progress photo ${dateSafe}"
            class="history-photo"
            loading="lazy" />
          <div class="photo-date-badge">📸 ${dateSafe}</div>
          <div style="position:absolute;top:8px;right:8px;background:rgba(30,20,16,0.5);backdrop-filter:blur(4px);border-radius:99px;padding:3px 8px;display:flex;align-items:center;gap:4px;">
            <svg style="width:10px;height:10px;color:#fff" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
            <span style="color:#fff;font-size:9px;font-weight:700;letter-spacing:0.04em">VIEW</span>
          </div>
        </div>` : ''}

      </div>`;
    timeline.appendChild(wrap);
  });
}

/** Delegated click handler for history cards — set up once so it survives
 *  renderHistory() re-rendering the timeline's children. */
document.getElementById('history-timeline')?.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const id = target.dataset.entryId;
  const action = target.dataset.action;
  if (action === 'view-photo') {
    const entry = getLogs().find(l => l.id === id);
    if (entry?.photo) openPhotoLightbox(entry.photo, entry.date);
  } else if (action === 'edit-entry') {
    editEntryById(id);
  } else if (action === 'delete-entry') {
    confirmDeleteEntry(id);
  }
});

function confirmDeleteEntry(id) {
  const entry = getLogs().find(l => l.id === id);
  if (!entry) return;
  showConfirmDialog({
    title: 'Delete this entry?',
    message: `This permanently removes your entry from <strong>${escapeHtml(entry.date)}</strong>${entry.photo ? ' and its progress photo' : ''}. This can’t be undone.`,
    confirmLabel: 'Delete',
    danger: true,
    onConfirm: () => deleteEntry(id),
  });
}

function deleteEntry(id) {
  const logs = getLogs().filter(l => l.id !== id);
  if (!saveLogs(logs)) return;
  renderHistory();
  hydrateDashboard();
  showToast('Entry deleted', 'info');
}

function buildSparkline(containerId, values, colorArr) {
  const el  = document.getElementById(containerId);
  el.innerHTML = '';
  const max = 5;
  values.forEach(v => {
    const bar = document.createElement('div');
    const pct = (v / max) * 100;
    bar.style.cssText = `
      flex:1; border-radius:3px 3px 0 0;
      height:${pct}%;
      background:${colorArr[v] || '#d4908a'};
      opacity:0.85;
      transition: height 0.5s ease;`;
    el.appendChild(bar);
  });
}

function openCompareModal() {
  const entries = getPhotoEntries();
  if (entries.length < 2) return;
  _compareIdx = { before: 0, after: entries.length - 1 }; // earliest vs. latest by default
  document.getElementById('compare-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderCompareModal();
}
function closeCompareModal() {
  document.getElementById('compare-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}
function handleCompareModalBackdrop(e) {
  if (e.target === document.getElementById('compare-modal')) closeCompareModal();
}

function renderCompareModal() {
  const entries = getPhotoEntries();
  const beforeEntry = entries[_compareIdx.before];
  const afterEntry = entries[_compareIdx.after];
  if (!beforeEntry || !afterEntry) return;

  document.getElementById('compare-before-img').src = beforeEntry.photo;
  document.getElementById('compare-after-img').src = afterEntry.photo;
  document.getElementById('compare-before-date').textContent = beforeEntry.date;
  document.getElementById('compare-after-date').textContent = afterEntry.date;

  const scoreLine = (entry) => `🔴 ${BREAKOUT_LABELS[parseInt(entry.breakout)]} · 🌡️ ${REDNESS_LABELS[parseInt(entry.redness)]}`;
  document.getElementById('compare-before-scores').textContent = scoreLine(beforeEntry);
  document.getElementById('compare-after-scores').textContent = scoreLine(afterEntry);

  const slider = document.querySelector('#compare-modal input[type=range]');
  if (slider) slider.value = 50;
  updateCompareReveal(50);
}

function updateCompareReveal(val) {
  const afterImg = document.getElementById('compare-after-img');
  const divider = document.querySelector('#compare-modal .compare-divider');
  const slider = document.querySelector('#compare-modal input[type=range]');
  if (afterImg) afterImg.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
  if (divider) divider.style.left = `${val}%`;
  if (slider) slider.style.setProperty('--val', val + '%');
}

/** Tap-to-pick popup for either date in the compare modal — same
 *  centered-popup pattern as openProductPicker, with a thumbnail per row
 *  since recognizing a photo by date alone is harder than by product name. */
function closeComparePicker() {
  document.getElementById('sl-compare-picker-overlay')?.remove();
}
function openComparePicker(side) {
  closeComparePicker();
  const entries = getPhotoEntries();
  const overlay = document.createElement('div');
  overlay.id = 'sl-compare-picker-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '260';
  overlay.style.alignItems = 'center';
  const rows = entries.map(entry => {
    const scoreLabel = `🔴 ${BREAKOUT_LABELS[parseInt(entry.breakout)]} · 🌡️ ${REDNESS_LABELS[parseInt(entry.redness)]}`;
    return `
      <button type="button" data-entry-id="${entry.id}" style="width:100%;display:flex;align-items:center;gap:10px;text-align:left;padding:8px;border-radius:12px;border:1.5px solid #f0e8e6;background:#fff;margin-bottom:8px;">
        <img src="${entry.photo}" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:8px;flex-shrink:0;" />
        <span style="flex:1;overflow:hidden;">
          <span style="display:block;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#3a2e28;">${escapeHtml(entry.date)}</span>
          <span style="display:block;font-family:'DM Sans',sans-serif;font-size:11px;color:#9e8a80;">${scoreLabel}</span>
        </span>
      </button>`;
  }).join('');
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:340px;width:calc(100% - 40px);margin:0 auto;padding:24px;max-height:70vh;overflow-y:auto;box-shadow:0 12px 40px rgba(58,46,40,0.2);animation:lbSlideUp 0.25s cubic-bezier(.34,1.1,.64,1) both;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 14px;">Pick a ${side === 'before' ? 'before' : 'after'} photo</h3>
      ${rows}
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeComparePicker(); });
  overlay.querySelectorAll('[data-entry-id]').forEach(btn => {
    btn.addEventListener('click', () => selectCompareEntry(side, btn.dataset.entryId));
  });
}
function selectCompareEntry(side, entryId) {
  const idx = getPhotoEntries().findIndex(e => e.id === entryId);
  if (idx < 0) return;
  _compareIdx[side] = idx;
  closeComparePicker();
  renderCompareModal();
}

