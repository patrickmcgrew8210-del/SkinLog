/* ══════════════════════════════════════════════
   DASHBOARD — streak, today summary, reminder banner, quick insights
══════════════════════════════════════════════ */

/** True if today has no entry yet and the reminder hasn't been
 *  dismissed today. dateKey-driven (not the older `.date` locale
 *  string) so it can't be fooled by locale formatting quirks. */
function shouldShowReminder(logs, now) {
  const todayKey = isoDate(now);
  if (logs.some(l => l.dateKey === todayKey)) return false;
  return localStorage.getItem('skinlog-reminder-dismissed-date') !== todayKey;
}
function dismissReminderBanner() {
  localStorage.setItem('skinlog-reminder-dismissed-date', isoDate(new Date()));
  document.getElementById('reminder-banner')?.classList.add('hidden');
}

function hydrateDashboard() {
  const logs = getLogs();
  const now  = new Date();

  // ── Date heading ──
  const dateEl = document.getElementById('dashboard-today-date');
  if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric' });

  // ── Streak calculation ──
  let streak = 0;
  // Walk backwards day by day from today
  for (let i = 0; i < 60; i++) {
    const d = new Date(now); d.setDate(now.getDate() - i);
    const ds = d.toLocaleDateString();
    if (logs.find(l => l.date === ds)) { streak++; } else { break; }
  }
  // Streak as of yesterday (excludes today) — used only for the reminder
  // banner's message. The main `streak` above intentionally reads 0 the
  // moment today is unlogged (that's what the streak ring should show),
  // but the banner needs to know whether there's a streak actually at
  // risk of breaking, so it walks starting one day earlier.
  let priorStreak = 0;
  for (let i = 1; i <= 60; i++) {
    const d = new Date(now); d.setDate(now.getDate() - i);
    if (logs.some(l => l.dateKey === isoDate(d))) { priorStreak++; } else { break; }
  }

  const streakNum = document.getElementById('streak-number');
  const streakRing = document.getElementById('streak-ring');
  const streakLabel = document.getElementById('streak-label');
  const streakSub = document.getElementById('streak-subtext');
  const streakBar = document.getElementById('streak-bar');
  const streakPct = document.getElementById('streak-pct-label');
  const dotsWrap = document.getElementById('day-dots');

  if (streakNum) streakNum.textContent = streak;
  const pct = Math.min(100, Math.round((streak / 20) * 100));
  if (streakRing) streakRing.style.setProperty('--pct', pct);
  if (streakBar)  streakBar.style.width = pct + '%';
  if (streakPct)  streakPct.textContent = pct + '%';

  if (streakLabel) {
    if (streak === 0) {
      streakLabel.innerHTML = `Start logging<br/><em class="not-italic font-semibold text-blush">your routine ✦</em>`;
    } else {
      streakLabel.innerHTML = `${streak}-day<br/><em class="not-italic font-semibold text-blush">routine streak</em>`;
    }
  }
  if (streakSub) {
    if (streak === 0)       streakSub.textContent = 'Log your first entry to begin your streak.';
    else if (streak < 20)   streakSub.textContent = `Keep it up — ${20 - streak} more day${20-streak===1?'':'s'} to your goal!`;
    else                    streakSub.textContent = `🎉 Goal reached! You're on a ${streak}-day streak!`;
  }

  // Day dots (show up to 20, mark days that have an entry)
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    for (let i = 19; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate() - i);
      const ds = d.toLocaleDateString();
      const hasEntry = !!logs.find(l => l.date === ds);
      const isToday  = i === 0;
      const dot = document.createElement('div');
      dot.className = `w-5 h-5 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
        isToday && hasEntry ? 'bg-blush ring-2 ring-blush ring-offset-1' :
        hasEntry            ? 'bg-blush-mid' : 'bg-blush-light'
      }`;
      if (hasEntry) dot.innerHTML = `<svg class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
      dotsWrap.appendChild(dot);
    }
  }

  // ── Today's skin status ──
  const todayEntry = logs.find(l => l.dateKey === isoDate(now));
  const summaryEl  = document.getElementById('dashboard-today-summary');
  const badgeEl    = document.getElementById('dashboard-log-badge');
  const statusEl   = document.getElementById('dashboard-log-status');

  // ── Reminder banner ──
  const banner = document.getElementById('reminder-banner');
  if (banner) {
    const show = shouldShowReminder(logs, now);
    banner.classList.toggle('hidden', !show);
    if (show) {
      document.getElementById('reminder-banner-text').textContent = priorStreak > 0
        ? `Keep your ${priorStreak}-day streak alive — log today's entry.`
        : `Start your streak — log your first entry today.`;
    }
  }

  if (todayEntry && summaryEl) {
    const bv = parseInt(todayEntry.breakout);
    const rv = parseInt(todayEntry.redness);
    const bLabel = BREAKOUT_LABELS[bv] || '—';
    const rLabel = REDNESS_LABELS[rv]  || '—';
    const routineDone = (todayEntry.routine || []).length;
    const routinePct  = Math.round((routineDone / 7) * 100);

    if (badgeEl) {
      badgeEl.innerHTML = `
        <div class="relative w-2 h-2"><div class="pulse w-2 h-2 rounded-full bg-sage block relative"></div></div>
        <span class="text-[11px] font-semibold text-sage-dark">Logged today</span>`;
    }

    summaryEl.innerHTML = `
      <div class="flex flex-wrap gap-2 mb-3">
        <span class="chip px-3 py-1.5 rounded-xl text-xs font-semibold text-blush-dark">🔴 Breakout: ${bLabel}</span>
        <span class="bg-sage-light border border-sage/20 px-3 py-1.5 rounded-xl text-xs font-semibold text-sage-dark">🌡️ Redness: ${rLabel}</span>
        ${todayEntry.sleep && todayEntry.sleep !== 'not set' ? `<span class="bg-white/70 border border-blush/15 px-3 py-1.5 rounded-xl text-xs font-semibold text-bark-muted">${SLEEP_EMOJI[todayEntry.sleep]} Sleep: ${escapeHtml(todayEntry.sleep)}</span>` : ''}
        ${(todayEntry.breakoutAreas||[]).length ? `<span class="bg-white/70 border border-blush/15 px-3 py-1.5 rounded-xl text-xs font-semibold text-bark-muted">📍 ${todayEntry.breakoutAreas.map(a => escapeHtml(FACE_REGION_LABELS[a]||a)).join(', ')}</span>` : ''}
        ${todayEntry.cycleDay ? `<span class="bg-white/70 border border-blush/15 px-3 py-1.5 rounded-xl text-xs font-semibold text-bark-muted">🩸 Cycle day ${todayEntry.cycleDay}</span>` : ''}
      </div>
      <div class="h-1.5 bg-blush-light rounded-full overflow-hidden mb-1">
        <div class="h-full rounded-full bg-gradient-to-r from-sage to-sage-dark" style="width:${routinePct}%"></div>
      </div>
      <p class="text-[11px] text-bark-muted">${routineDone}/7 routine steps completed (${routinePct}%)</p>
      ${todayEntry.triggers ? `<p class="text-[11px] text-bark-muted mt-1.5 line-clamp-2">⚡ ${escapeHtml(todayEntry.triggers)}</p>` : ''}`;
  }

  // ── Quick Insights ──
  const insightsEl = document.getElementById('dashboard-insights');
  if (insightsEl && logs.length >= 3) {
    const bVals = logs.slice(0,7).map(l => parseInt(l.breakout));
    const rVals = logs.slice(0,7).map(l => parseInt(l.redness));
    const bTrend = trendArrow(bVals.reverse());
    const rTrend = trendArrow(rVals.reverse());
    const patterns = computeTopTriggerPatterns(logs);
    const patternsHtml = patterns.map(p => `
        <div class="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-blush/10">
          <span class="text-lg mt-0.5">🔍</span>
          <div><p class="text-sm font-semibold text-bark">"${escapeHtml(p.word)}" linked to ${p.delta > 0 ? 'higher' : 'lower'} breakout</p>
          <p class="text-xs text-bark-muted mt-0.5">Avg ${p.withBreakout}/5 on days mentioned vs ${p.withoutBreakout}/5 when not &nbsp;·&nbsp; ${p.count} entries</p></div>
        </div>`).join('');
    insightsEl.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-start gap-3 p-3 bg-blush-light/40 rounded-2xl">
          <span class="text-lg mt-0.5">🔴</span>
          <div><p class="text-sm font-semibold text-bark">Breakout: ${bTrend.label}</p>
          <p class="text-xs text-bark-muted mt-0.5">7-day avg: ${avg(bVals)}/5 &nbsp;${bTrend.arrow}</p></div>
        </div>
        <div class="flex items-start gap-3 p-3 bg-sage-light/40 rounded-2xl">
          <span class="text-lg mt-0.5">🌡️</span>
          <div><p class="text-sm font-semibold text-bark">Redness: ${rTrend.label}</p>
          <p class="text-xs text-bark-muted mt-0.5">7-day avg: ${avg(rVals)}/5 &nbsp;${rTrend.arrow}</p></div>
        </div>
        ${patternsHtml}
        ${patterns.length ? `<p class="text-[10px] text-bark-muted text-center italic pt-1">Based on your own notes — correlational, not a diagnosis.</p>` : ''}
      </div>`;
  } else if (insightsEl && logs.length > 0) {
    insightsEl.innerHTML = `<p class="text-xs text-bark-muted text-center py-3">Log at least 3 days to unlock trend insights.</p>`;
  }
}

