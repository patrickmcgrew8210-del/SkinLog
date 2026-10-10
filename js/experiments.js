/* ══════════════════════════════════════════════
   EXPERIMENTS — self-tracked before/during/after comparisons for a
   deliberate product or routine change. Distinct from the always-on,
   automatic product-impact cards in Trends: an experiment is something
   the user explicitly declares they're testing, with a real start (and,
   once they say so, end) point — not just "when I started tagging this
   product."
══════════════════════════════════════════════ */

const EXPERIMENT_STATUS_LABELS = { active: 'Active', completed: 'Completed', abandoned: 'Abandoned' };

function openExperimentsModal() {
  renderExperimentsModalBody();
  document.getElementById('experiments-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeExperimentsModal() {
  document.getElementById('experiments-modal').classList.add('hidden');
  document.body.style.overflow = '';
}
function handleExperimentsModalBackdrop(e) {
  if (e.target === document.getElementById('experiments-modal')) closeExperimentsModal();
}

function renderExperimentsModalBody() {
  const body = document.getElementById('experiments-modal-body');
  const experiments = getExperiments();
  const logs = getLogs();
  const products = getProducts();

  const addButtonHtml = `
    <button type="button" onclick="promptAddExperiment()" style="width:100%;text-align:left;padding:12px 14px;border-radius:12px;border:1.5px dashed rgba(212,144,138,0.4);background:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#b5706a;">
      + New Experiment
    </button>`;

  if (experiments.length === 0) {
    body.innerHTML = `
      <div class="flex flex-col items-center justify-center py-8 gap-3 text-center">
        <span class="text-2xl">🧪</span>
        <p class="text-sm font-semibold text-bark">No experiments yet</p>
        <p class="text-xs text-bark-muted" style="max-width:260px;">Testing a new product or routine change? Start one to see your own before/during/after — not just what you tagged, your actual logged days.</p>
      </div>
      ${addButtonHtml}`;
    return;
  }

  // Active first (by most recently started), then completed/abandoned,
  // archived last — mirrors the "archived sinks to the bottom, dimmed"
  // pattern already used for products rather than hiding them outright.
  const sorted = [...experiments].sort((a, b) => {
    if (!!a.archived !== !!b.archived) return a.archived ? 1 : -1;
    if (a.status !== b.status) return a.status === 'active' ? -1 : (b.status === 'active' ? 1 : 0);
    return b.startDate.localeCompare(a.startDate);
  });

  const cardsHtml = sorted.map(exp => renderExperimentCard(exp, logs, products, experiments)).join('');
  body.innerHTML = `<div class="space-y-3">${cardsHtml}</div><div class="mt-3">${addButtonHtml}</div>`;
}

function periodStatHtml(label, period) {
  if (period === null) {
    return `<div class="rounded-xl p-2 text-center bg-white/60">
      <div class="text-[9px] font-bold uppercase tracking-wide text-bark-muted">${label}</div>
      <div class="text-[10px] text-bark-muted mt-1.5">Still ongoing</div>
    </div>`;
  }
  if (period.insufficient) {
    return `<div class="rounded-xl p-2 text-center bg-white/60">
      <div class="text-[9px] font-bold uppercase tracking-wide text-bark-muted">${label}</div>
      <div class="text-[10px] text-bark-muted mt-1.5">Not enough yet<br/>(${period.count} of ${period.needed})</div>
    </div>`;
  }
  return `<div class="rounded-xl p-2 text-center bg-white/60">
    <div class="text-[9px] font-bold uppercase tracking-wide text-bark-muted">${label}</div>
    <div class="text-xs font-semibold text-bark mt-1.5">🔴 ${period.avgBreakout} &nbsp;🌡️ ${period.avgRedness}</div>
    <div class="text-[9px] text-bark-muted mt-0.5">${period.count} entries</div>
  </div>`;
}

function renderExperimentCard(exp, logs, products, allExperiments) {
  const impact = computeExperimentImpact(exp, logs, products);
  const linkedProduct = exp.linkedProductId ? products.find(p => p.id === exp.linkedProductId) : null;
  const overlaps = exp.status === 'active' ? findOverlappingExperiments(exp, allExperiments) : [];

  const statusColors = {
    active: 'background:#dde8db;color:#3f5c3c',
    completed: 'background:#f2e0de;color:#b5706a',
    abandoned: 'background:#f0e8e6;color:#9e8a80',
  };

  const dateRangeText = exp.endDate ? `${exp.startDate} → ${exp.endDate}` : `${exp.startDate} → ongoing`;

  const overlapHtml = overlaps.length ? `
    <p class="text-[10px] mt-2 px-2.5 py-1.5 rounded-lg" style="background:#fef3c7;color:#92400e;">
      ⚠️ Overlaps ${overlaps.length === 1 ? `"${escapeHtml(overlaps[0].title)}"` : `${overlaps.length} other active experiments`} — results may reflect more than one change.
    </p>` : '';

  const productUsedHtml = (linkedProduct && impact.duringProductUsedCount !== null) ? `
    <p class="text-[10px] text-bark-muted mt-2">Used ${escapeHtml(linkedProduct.name)} on ${impact.duringProductUsedCount} of ${impact.during.count} during-period days.</p>` : '';

  const actionsHtml = exp.archived ? `
    <button onclick="unarchiveExperiment('${exp.id}')" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Unarchive</button>
  ` : `
    <div class="flex flex-wrap gap-x-3 gap-y-1">
      ${exp.status === 'active' ? `<button onclick="promptEditExperiment('${exp.id}')" class="text-[11px] font-bold text-bark-muted underline underline-offset-2">Edit</button>` : ''}
      ${exp.status === 'active' ? `<button onclick="promptCompleteExperiment('${exp.id}', 'completed')" class="text-[11px] font-bold text-sage-dark underline underline-offset-2">Mark Complete</button>` : ''}
      ${exp.status === 'active' ? `<button onclick="promptCompleteExperiment('${exp.id}', 'abandoned')" class="text-[11px] font-bold text-bark-muted underline underline-offset-2">Abandon</button>` : ''}
      <button onclick="deleteOrArchiveExperiment('${exp.id}')" class="text-[11px] font-bold text-blush-dark underline underline-offset-2">${experimentHasAnyEntries(exp, logs) ? 'Archive' : 'Delete'}</button>
    </div>`;

  return `
    <div class="card rounded-2xl p-3.5 ${exp.archived ? 'opacity-60' : ''}">
      <div class="flex items-start justify-between gap-2 mb-1">
        <p class="text-sm font-semibold text-bark">${escapeHtml(exp.title)}</p>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style="${statusColors[exp.status] || statusColors.active}">${EXPERIMENT_STATUS_LABELS[exp.status] || exp.status}</span>
      </div>
      <p class="text-[10px] text-bark-muted">${dateRangeText}${linkedProduct ? ` · ${escapeHtml(linkedProduct.name)}` : ''}${exp.archived ? ' · Archived' : ''}</p>
      ${exp.notes ? `<p class="text-[11px] text-bark-muted mt-1.5 italic">${escapeHtml(exp.notes)}</p>` : ''}
      ${overlapHtml}
      <div class="grid grid-cols-3 gap-2 mt-3">
        ${periodStatHtml('Before', impact.before)}
        ${periodStatHtml('During', impact.during)}
        ${periodStatHtml('After', impact.after)}
      </div>
      ${productUsedHtml}
      <div class="mt-3 pt-3 border-t border-blush-light/60 flex items-center justify-between">
        ${actionsHtml}
      </div>
    </div>`;
}

/** Whether any logged entry falls within this experiment's date window
 *  — the same "has real history, so archive instead of delete" check
 *  deleteOrArchiveProduct() already uses, applied to experiments. */
function experimentHasAnyEntries(exp, logs) {
  const upper = exp.endDate || isoDate(new Date());
  return logs.some(l => l.dateKey >= exp.startDate && l.dateKey <= upper);
}

/* ── Create / edit form popup — same centered-overlay pattern as promptAddProduct() ── */
function closeExperimentFormPopup() {
  document.getElementById('sl-experiment-form-overlay')?.remove();
}
function promptAddExperiment() {
  showExperimentFormPopup(null);
}
function promptEditExperiment(id) {
  const exp = getExperiments().find(e => e.id === id);
  if (exp) showExperimentFormPopup(exp);
}
function showExperimentFormPopup(existing) {
  closeExperimentFormPopup();
  const products = getProducts().filter(p => !p.archived);
  const isEdit = !!existing;

  const overlay = document.createElement('div');
  overlay.id = 'sl-experiment-form-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '260';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:340px;width:calc(100% - 40px);margin:0 auto;padding:24px;max-height:85vh;overflow-y:auto;box-shadow:0 12px 40px rgba(58,46,40,0.2);animation:lbSlideUp 0.25s cubic-bezier(.34,1.1,.64,1) both;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 4px;">${isEdit ? 'Edit experiment' : 'New experiment'}</h3>
      <p style="font-size:12px;color:#9e8a80;margin:0 0 14px;">Describe what you're testing — your own logged days before and during will show how things looked.</p>

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">What are you testing?</label>
      <input id="sl-exp-title" type="text" maxlength="80" placeholder="e.g. Niacinamide serum, PM double-cleanse…"
        value="${isEdit ? escapeHtml(existing.title) : ''}"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:10px;" />

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Linked product <span style="font-weight:500;text-transform:none;">(optional)</span></label>
      <select id="sl-exp-product" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:10px;">
        <option value="">None</option>
        ${products.map(p => `<option value="${p.id}" ${isEdit && existing.linkedProductId === p.id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('')}
      </select>

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Start date</label>
      <input id="sl-exp-start" type="date" value="${isEdit ? existing.startDate : isoDate(new Date())}"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:10px;" />

      <label style="display:block;font-size:11px;font-weight:700;color:#9e8a80;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Notes <span style="font-weight:500;text-transform:none;">(optional)</span></label>
      <textarea id="sl-exp-notes" rows="2" maxlength="300" placeholder="Why you're trying this…"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:13px;color:#3a2e28;outline:none;margin-bottom:10px;resize:none;">${isEdit ? escapeHtml(existing.notes || '') : ''}</textarea>

      <p id="sl-exp-error" style="display:none;color:#943f3a;font-size:12px;font-weight:600;margin:0 0 10px;padding:8px 12px;background:#fdf2f2;border-radius:10px;">Please enter what you're testing.</p>

      <div style="display:flex;gap:10px;">
        <button id="sl-exp-cancel" style="flex:1;padding:12px;border-radius:14px;border:1.5px solid #f0e8e6;background:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#7a6055;">Cancel</button>
        <button id="sl-exp-save" style="flex:1;padding:12px;border-radius:14px;border:none;background:linear-gradient(110deg,#b5706a,#d4908a);font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">${isEdit ? 'Save' : 'Start'}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeExperimentFormPopup(); });
  document.getElementById('sl-exp-cancel').onclick = closeExperimentFormPopup;
  const titleField = document.getElementById('sl-exp-title');
  setTimeout(() => titleField.focus(), 80);

  document.getElementById('sl-exp-save').onclick = () => {
    const title = titleField.value.trim();
    if (!title) { document.getElementById('sl-exp-error').style.display = 'block'; titleField.focus(); return; }
    const linkedProductId = document.getElementById('sl-exp-product').value || null;
    const startDate = document.getElementById('sl-exp-start').value || isoDate(new Date());
    const notes = document.getElementById('sl-exp-notes').value.trim();

    const experiments = getExperiments();
    if (isEdit) {
      const idx = experiments.findIndex(e => e.id === existing.id);
      if (idx >= 0) experiments[idx] = { ...experiments[idx], title, linkedProductId, startDate, notes };
    } else {
      experiments.unshift({
        id: uid(), title, linkedProductId, startDate, endDate: null, notes,
        status: 'active', archived: false, createdAt: new Date().toISOString(),
      });
    }
    if (!saveExperiments(experiments)) return;
    closeExperimentFormPopup();
    renderExperimentsModalBody();
    showToast(isEdit ? 'Experiment updated' : 'Experiment started', 'success');
  };
}

/* ── Complete / abandon — records the ACTUAL end date, confirmed at the
   moment the user says this is over, never a date set in advance. ── */
function closeCompleteExperimentPopup() {
  document.getElementById('sl-exp-complete-overlay')?.remove();
}
function promptCompleteExperiment(id, newStatus) {
  closeCompleteExperimentPopup();
  const exp = getExperiments().find(e => e.id === id);
  if (!exp) return;
  const isAbandon = newStatus === 'abandoned';

  const overlay = document.createElement('div');
  overlay.id = 'sl-exp-complete-overlay';
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '260';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;max-width:320px;width:calc(100% - 40px);margin:0 auto;padding:24px;box-shadow:0 12px 40px rgba(58,46,40,0.2);animation:lbSlideUp 0.25s cubic-bezier(.34,1.1,.64,1) both;">
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3a2e28;margin:0 0 8px;">${isAbandon ? 'Abandon experiment?' : 'Mark complete'}</h3>
      <p style="font-size:13px;color:#7a6055;line-height:1.55;margin:0 0 14px;">When did this actually end? Entries from after this date will count toward "after."</p>
      <input id="sl-exp-end-date" type="date" value="${isoDate(new Date())}" max="${isoDate(new Date())}"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1.5px solid #f0e8e6;background:#faf7f4;font-family:'DM Sans',sans-serif;font-size:14px;color:#3a2e28;outline:none;margin-bottom:16px;" />
      <div style="display:flex;gap:10px;">
        <button id="sl-exp-complete-cancel" style="flex:1;padding:12px;border-radius:14px;border:1.5px solid #f0e8e6;background:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#7a6055;">Cancel</button>
        <button id="sl-exp-complete-ok" style="flex:1;padding:12px;border-radius:14px;border:none;background:${isAbandon ? 'linear-gradient(110deg,#943f3a,#c77c74)' : 'linear-gradient(110deg,#b5706a,#d4908a)'};font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">${isAbandon ? 'Abandon' : 'Complete'}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeCompleteExperimentPopup(); });
  document.getElementById('sl-exp-complete-cancel').onclick = closeCompleteExperimentPopup;
  document.getElementById('sl-exp-complete-ok').onclick = () => {
    const endDate = document.getElementById('sl-exp-end-date').value || isoDate(new Date());
    const experiments = getExperiments();
    const idx = experiments.findIndex(e => e.id === id);
    if (idx < 0) return;
    experiments[idx] = { ...experiments[idx], status: newStatus, endDate };
    if (!saveExperiments(experiments)) return;
    closeCompleteExperimentPopup();
    renderExperimentsModalBody();
    showToast(isAbandon ? 'Experiment abandoned' : 'Experiment marked complete', 'success');
  };
}

function deleteOrArchiveExperiment(id) {
  const experiments = getExperiments();
  const exp = experiments.find(e => e.id === id);
  if (!exp) return;
  const logs = getLogs();

  if (!experimentHasAnyEntries(exp, logs)) {
    showConfirmDialog({
      title: 'Delete this experiment?',
      message: `<strong>${escapeHtml(exp.title)}</strong> has no logged entries in its date range, so this fully removes it. This can't be undone.`,
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        if (!saveExperiments(experiments.filter(e => e.id !== id))) return;
        renderExperimentsModalBody();
        showToast('Experiment deleted', 'info');
      },
    });
    return;
  }

  exp.archived = true;
  if (!saveExperiments(experiments)) return;
  renderExperimentsModalBody();
  showToast('Experiment archived', 'info');
}

function unarchiveExperiment(id) {
  const experiments = getExperiments();
  const exp = experiments.find(e => e.id === id);
  if (!exp) return;
  exp.archived = false;
  if (!saveExperiments(experiments)) return;
  renderExperimentsModalBody();
  showToast('Experiment unarchived', 'success');
}
