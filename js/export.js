/* ══════════════════════════════════════════════
   EXPORT & BACKUP — clinical report modal, JSON backup/restore
══════════════════════════════════════════════ */

function openExportModal() {
  const logs = getLogs();
  const modal = document.getElementById('export-modal');
  const body  = document.getElementById('report-body');
  const meta  = document.getElementById('report-meta');

  if (logs.length === 0) {
    alert('No entries found. Log at least one skin entry before exporting.');
    return;
  }

  /* — computed values — */
  const bVals    = logs.map(l => parseInt(l.breakout));
  const rVals    = logs.map(l => parseInt(l.redness));
  const avgB     = avg(bVals);
  const avgR     = avg(rVals);
  const minDate  = logs[logs.length-1]?.date || '—';
  const maxDate  = logs[0]?.date || '—';
  const bTrend   = trendArrow([...bVals].reverse());
  const rTrend   = trendArrow([...rVals].reverse());
  const sleepMap = {};
  logs.forEach(l => { sleepMap[l.sleep] = (sleepMap[l.sleep]||0)+1; });
  const topSleep = Object.entries(sleepMap).sort((a,b)=>b[1]-a[1])[0];
  const allTriggers = logs.map(l=>l.triggers).filter(Boolean).map(escapeHtml).join('; ');
  const allDiet     = logs.map(l=>l.diet).filter(Boolean).map(escapeHtml).join('; ');
  const totalRoutineSteps = logs.reduce((acc,l) => acc + (l.routine?.length||0), 0);
  const avgRoutinePct = ((totalRoutineSteps / (logs.length * 7)) * 100).toFixed(0);

  /* — severity label helper for report — */
  function sLabel(v) {
    const bg  = parseInt(v) <= 2 ? '#dde8db' : parseInt(v) === 3 ? '#fef3c7' : '#f2e0de';
    const col = parseInt(v) <= 2 ? '#607a5c' : parseInt(v) === 3 ? '#92400e' : '#943f3a';
    return `<span class="severity-pill" style="background:${bg};color:${col}">${v} – ${BREAKOUT_LABELS[v]||v}</span>`;
  }

  /* — products referenced by any entry in range — */
  const productsInRange = getProducts().filter(p => logs.some(l => productUsedInEntry(l, p)));
  const productsTableRows = productsInRange.map(p => {
    const usedLogs = logs.filter(l => productUsedInEntry(l, p));
    return `
      <tr>
        <td style="font-weight:600">${escapeHtml(p.name)}</td>
        <td style="text-transform:capitalize">${escapeHtml(PRODUCT_CATEGORY_LABELS[p.category])}</td>
        <td style="white-space:nowrap">${escapeHtml(p.startDate)}</td>
        <td>${usedLogs.length}</td>
        <td>${sLabel(Math.round(avg(usedLogs.map(l => parseInt(l.breakout)))))}</td>
        <td>${sLabel(Math.round(avg(usedLogs.map(l => parseInt(l.redness)))))}</td>
      </tr>`;
  }).join('');
  const productsSectionHtml = productsInRange.length === 0 ? `
    <div style="background:#faf7f4;border-radius:12px;padding:18px;text-align:center;font-size:12px;color:#9e8a80;">
      No products were tagged during this observation period.
    </div>` : `
    <table class="report-table" style="border:1px solid #f2e0de;border-radius:12px;overflow:hidden;">
      <thead>
        <tr><th>Product</th><th>Category</th><th>Since</th><th># Entries</th><th>Avg Breakout</th><th>Avg Redness</th></tr>
      </thead>
      <tbody>${productsTableRows}</tbody>
    </table>
    <p style="font-size:10px;color:#9e8a80;margin:8px 0 0;font-style:italic;">Correlational only — reflects entries logged while a product was tagged, not a clinical conclusion about efficacy.</p>`;

  /* — affected-area frequency across the exported range — */
  const areaFrequency = computeAreaFrequency(logs);
  const areaHasData = areaFrequency.some(a => a.count > 0);
  const areaTableRows = areaFrequency.map(a => `
    <tr>
      <td style="font-weight:600">${escapeHtml(a.label)}</td>
      <td>${a.count} of ${logs.length}</td>
      <td>${a.pct}%</td>
    </tr>`).join('');
  const areaSectionHtml = !areaHasData ? `
    <div style="background:#faf7f4;border-radius:12px;padding:18px;text-align:center;font-size:12px;color:#9e8a80;">
      No breakout areas were marked during this observation period.
    </div>` : `
    <table class="report-table" style="border:1px solid #f2e0de;border-radius:12px;overflow:hidden;">
      <thead>
        <tr><th>Area</th><th>Days Logged</th><th>% of Entries</th></tr>
      </thead>
      <tbody>${areaTableRows}</tbody>
    </table>
    <p style="font-size:10px;color:#9e8a80;margin:8px 0 0;font-style:italic;">Self-reported location, facing the patient. Not a substitute for clinical examination.</p>`;

  meta.textContent = `Observation period: ${minDate} – ${maxDate}  ·  ${logs.length} entries  ·  Generated ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}`;

  /* — build report sections — */
  body.innerHTML = `

    <!-- SECTION 1: Clinical Overview -->
    <section>
      <p class="report-section-title">1. Clinical Overview</p>
      <div style="background:#faf7f4;border-radius:12px;padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px;">
        <div><span style="color:#9e8a80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Patient</span><br/><strong>${escapeHtml(userName)}</strong></div>
        <div><span style="color:#9e8a80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Observation Period</span><br/><strong>${minDate} → ${maxDate}</strong></div>
        <div><span style="color:#9e8a80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Total Entries</span><br/><strong>${logs.length} days</strong></div>
        <div><span style="color:#9e8a80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Avg. Routine Adherence</span><br/><strong>${avgRoutinePct}%</strong></div>
        <div><span style="color:#9e8a80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Predominant Sleep Quality</span><br/><strong>${topSleep ? escapeHtml(topSleep[0]) : '—'} (${topSleep ? topSleep[1] : 0} nights)</strong></div>
        <div><span style="color:#9e8a80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">Tracking Tool</span><br/><strong>SkinLog v1.0</strong></div>
      </div>
    </section>

    <!-- SECTION 2: Severity Summary -->
    <section>
      <p class="report-section-title">2. Severity Summary</p>
      <table class="report-table" style="border:1px solid #f2e0de;border-radius:12px;overflow:hidden;">
        <thead>
          <tr>
            <th>Metric</th><th>Average</th><th>Lowest</th><th>Highest</th><th>Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Breakout Severity</strong></td>
            <td>${sLabel(Math.round(avgB))}</td>
            <td>${sLabel(Math.min(...bVals))}</td>
            <td>${sLabel(Math.max(...bVals))}</td>
            <td style="color:${bTrend.color};font-weight:700">${bTrend.arrow} ${bTrend.label}</td>
          </tr>
          <tr>
            <td><strong>Redness / Irritation</strong></td>
            <td>${sLabel(Math.round(avgR))}</td>
            <td>${sLabel(Math.min(...rVals))}</td>
            <td>${sLabel(Math.max(...rVals))}</td>
            <td style="color:${rTrend.color};font-weight:700">${rTrend.arrow} ${rTrend.label}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 3: Affected Areas Summary -->
    <section>
      <p class="report-section-title">3. Affected Areas Summary</p>
      ${areaSectionHtml}
    </section>

    <!-- SECTION 4: Diet & Trigger Notes -->
    <section>
      <p class="report-section-title">4. Dietary & Lifestyle Notes</p>
      <div style="background:#faf7f4;border-radius:12px;padding:14px;font-size:12px;color:#3a2e28;line-height:1.7;white-space:pre-wrap;">${allDiet || 'No dietary notes recorded.'}</div>
    </section>

    <section>
      <p class="report-section-title">5. Reported Flare-up Triggers</p>
      <div style="background:#fef2f2;border-radius:12px;padding:14px;font-size:12px;color:#3a2e28;line-height:1.7;white-space:pre-wrap;">${allTriggers || 'No triggers recorded.'}</div>
    </section>

    <!-- SECTION 6: Products in Use -->
    <section>
      <p class="report-section-title">6. Products in Use</p>
      ${productsSectionHtml}
    </section>

    <!-- SECTION 7: Chronological Log -->
    <section>
      <p class="report-section-title">7. Chronological Entry Log</p>
      <div style="overflow-x:auto;border-radius:12px;border:1px solid #f2e0de;">
        <table class="report-table" style="min-width:480px">
          <thead>
            <tr>
              <th>Date</th>
              <th>Breakout</th>
              <th>Redness</th>
              <th>Sleep</th>
              <th>Routine %</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(l => `
              <tr>
                <td style="white-space:nowrap;font-weight:600">${escapeHtml(l.date)}</td>
                <td>${sLabel(l.breakout)}</td>
                <td>${sLabel(l.redness)}</td>
                <td style="text-transform:capitalize">${SLEEP_EMOJI[l.sleep]||''} ${escapeHtml(l.sleep)}</td>
                <td>${Math.round((l.routine?.length||0)/7*100)}%</td>
                <td style="font-size:11px;color:#7a6055;max-width:140px">${escapeHtml(l.triggers||l.diet||'—')}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Disclaimer -->
    <section style="padding:14px;background:#faf7f4;border-radius:12px;border-left:3px solid #d4908a">
      <p style="font-size:11px;color:#9e8a80;line-height:1.6;margin:0">
        <strong style="color:#7a6055">Clinical Disclaimer:</strong>
        This report is a patient-generated self-assessment log compiled via the SkinLog application.
        Severity ratings are subjective and self-reported on a scale of 1–5.
        This document is intended as supplementary context for a qualified dermatologist
        and does not constitute a medical diagnosis or clinical record.
      </p>
    </section>

    <!-- SECTION 8: Visual Progress Gallery -->
    ${(function(){
      const photoLogs = [...logs].reverse().filter(l => l.photo);
      if (photoLogs.length === 0) return `
        <section>
          <p class="report-section-title">8. Visual Progress Gallery</p>
          <div style="background:#faf7f4;border-radius:12px;padding:18px;text-align:center;font-size:12px;color:#9e8a80;">
            No progress photos were recorded during this observation period.
          </div>
        </section>`;

      const cells = photoLogs.map(l => {
        const bv = parseInt(l.breakout);
        const rv = parseInt(l.redness);
        const bBg  = bv <= 2 ? '#dde8db' : bv === 3 ? '#fef3c7' : '#f2e0de';
        const bCol = bv <= 2 ? '#607a5c' : bv === 3 ? '#92400e' : '#943f3a';
        const rBg  = rv <= 2 ? '#dde8db' : rv === 3 ? '#fef3c7' : '#f2e0de';
        const rCol = rv <= 2 ? '#607a5c' : rv === 3 ? '#92400e' : '#943f3a';
        return `
          <div style="border-radius:12px;overflow:hidden;border:1px solid #f0e8e6;background:#fff;break-inside:avoid;">
            <img src="${l.photo}"
              alt="Progress photo ${escapeHtml(l.date)}"
              style="width:100%;height:120px;object-fit:cover;display:block;border-bottom:1px solid #f0e8e6;" />
            <div style="padding:8px 10px 10px;">
              <div style="font-size:11px;font-weight:700;color:#3a2e28;margin-bottom:5px;">${escapeHtml(l.date)}</div>
              <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:4px;">
                <span style="font-size:9px;font-weight:700;background:${bBg};color:${bCol};padding:2px 7px;border-radius:99px;">
                  Breakout ${l.breakout}/5
                </span>
                <span style="font-size:9px;font-weight:700;background:${rBg};color:${rCol};padding:2px 7px;border-radius:99px;">
                  Redness ${l.redness}/5
                </span>
                ${l.sleep && l.sleep !== 'not set' ? `<span style="font-size:9px;font-weight:700;background:#eff6ff;color:#1e3a8a;padding:2px 7px;border-radius:99px;text-transform:capitalize;">${SLEEP_EMOJI[l.sleep]||''} ${escapeHtml(l.sleep)}</span>` : ''}
              </div>
              ${l.triggers ? `<div style="font-size:9px;color:#9e8a80;line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">⚡ ${escapeHtml(l.triggers)}</div>` : ''}
            </div>
          </div>`;
      }).join('');

      return `
        <section style="page-break-before:auto;">
          <p class="report-section-title">8. Visual Progress Gallery</p>
          <p style="font-size:11px;color:#9e8a80;margin:0 0 12px;">
            ${photoLogs.length} progress photo${photoLogs.length > 1 ? 's' : ''} recorded
            (earliest → most recent). Photos compressed and stored locally via SkinLog.
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            ${cells}
          </div>
        </section>`;
    })()}
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeExportModal() {
  document.getElementById('export-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleModalBackdrop(e) {
  if (e.target === document.getElementById('export-modal')) closeExportModal();
}

function exportBackup() {
  const payload = {
    app: 'SkinLog',
    version: 1,
    exportedAt: new Date().toISOString(),
    username: userName,
    entries: getLogs(),
    products: getProducts(),
    currentProducts: getCurrentProducts(),
    cycleTrackingEnabled: isCycleTrackingEnabled(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `skinlog-backup-${isoDate(new Date())}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  showToast('Backup downloaded', 'success');
  document.getElementById('account-popup')?.remove();
}

function triggerRestoreBackup() {
  document.getElementById('backup-restore-input')?.click();
}

function handleRestoreFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onerror = () => { showToast('Could not read that file.', 'error'); input.value = ''; };
  reader.onload = (ev) => {
    let data;
    try { data = JSON.parse(ev.target.result); }
    catch (e) { showToast("That file isn't a valid SkinLog backup.", 'error'); input.value = ''; return; }

    if (!data || !Array.isArray(data.entries)) {
      showToast("That file isn't a valid SkinLog backup.", 'error');
      input.value = '';
      return;
    }

    const currentCount = getLogs().length;
    const incomingCount = data.entries.length;
    showConfirmDialog({
      title: 'Restore backup?',
      message: `This replaces your current <strong>${currentCount}</strong> ${currentCount === 1 ? 'entry' : 'entries'} with <strong>${incomingCount}</strong> ${incomingCount === 1 ? 'entry' : 'entries'} from this backup file. This can’t be undone.`,
      confirmLabel: 'Restore',
      danger: true,
      onConfirm: () => {
        const cleaned = data.entries.map(l => ({
          id:       l.id || uid(),
          dateKey:  l.dateKey || isoDate(l.date ? new Date(l.date) : new Date()),
          date:     l.date || new Date().toLocaleDateString(),
          breakout: l.breakout ?? '1',
          redness:  l.redness ?? '1',
          breakoutAreas: Array.isArray(l.breakoutAreas) ? l.breakoutAreas : [],
          routine:  Array.isArray(l.routine) ? l.routine : [],
          diet:     l.diet || '',
          triggers: l.triggers || '',
          cycleDay: (Number.isInteger(l.cycleDay) && l.cycleDay >= 1 && l.cycleDay <= 40) ? l.cycleDay : null,
          sleep:    l.sleep || 'not set',
          photo:    l.photo || null,
          products: l.products || {},
        }));
        if (!saveLogs(cleaned)) return;
        if (data.username) setUserName(data.username);
        // Only touch products/cycle setting if the backup actually has
        // them — an old-format backup predating these features
        // shouldn't wipe whatever's already tracked/configured.
        if (Array.isArray(data.products)) saveProducts(data.products);
        if (data.currentProducts) saveCurrentProducts(data.currentProducts);
        if (typeof data.cycleTrackingEnabled === 'boolean') {
          if (data.cycleTrackingEnabled) localStorage.setItem('skinlog-cycle-tracking-enabled', '1');
          else localStorage.removeItem('skinlog-cycle-tracking-enabled');
          syncCycleFieldVisibility();
        }
        renderHistory();
        hydrateDashboard();
        showToast('Backup restored', 'success');
      },
    });
    input.value = '';
  };
  reader.readAsText(file);
  document.getElementById('account-popup')?.remove();
}

