/* ══════════════════════════════════════════════
   TRENDS — range charts, calendar heatmap, insights digest
══════════════════════════════════════════════ */

let _trendsRange = '30'; // '7' | '30' | '90' | 'all'

function setTrendsRange(range) {
  _trendsRange = range;
  document.querySelectorAll('.range-chip').forEach(b => b.classList.toggle('active-range', b.dataset.range === range));
  renderTrends();
}

/** Entries within the selected range, oldest → newest. */
function getEntriesInRange(logs, range) {
  let entries = [...logs].sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  if (range === 'all') return entries;
  const days = parseInt(range, 10);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  const cutoffKey = isoDate(cutoff);
  return entries.filter(l => l.dateKey >= cutoffKey);
}

function renderTrends() {
  document.querySelectorAll('.range-chip').forEach(b => b.classList.toggle('active-range', b.dataset.range === _trendsRange));

  const logs = getLogs();
  const entries = getEntriesInRange(logs, _trendsRange);
  const empty = document.getElementById('trends-empty');
  const content = document.getElementById('trends-content');

  if (entries.length < 3) {
    empty.classList.remove('hidden');
    content.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  content.classList.remove('hidden');

  renderTrendsStats(entries);
  renderTrendsBaseline(logs, entries, _trendsRange);
  renderTrendsChart(entries);
  renderTrendsHeatmap(logs, _trendsRange);
  renderTrendsInsights(entries);
}

/** Headline "how am I doing" readout — this range's average vs. the
 *  user's own average from before it. Answers the progress question
 *  more directly than the line chart alone: a personal baseline, not a
 *  population norm, and not shown at all when there isn't a real
 *  "before" period to compare against or not enough history yet (see
 *  computeBaselineComparison()'s own gating). */
function renderTrendsBaseline(logs, entries, range) {
  const card = document.getElementById('trends-baseline-card');
  if (!card) return;
  const cmp = computeBaselineComparison(logs, entries, range);
  if (cmp.insufficient) { card.classList.add('hidden'); return; }
  card.classList.remove('hidden');

  const bDelta = cmp.rangeBreakout - cmp.baselineBreakout;
  const rDelta = cmp.rangeRedness - cmp.baselineRedness;
  const verdict = (delta) => Math.abs(delta) < 0.3 ? 'about the same as' : (delta < 0 ? 'lower than' : 'higher than');
  const headlineDelta = Math.abs(bDelta) >= Math.abs(rDelta) ? bDelta : rDelta;
  const headline = Math.abs(headlineDelta) < 0.3
    ? "Holding steady compared to your own history."
    : headlineDelta < 0
      ? "Trending toward clearer compared to your own history."
      : "Trending higher compared to your own history.";

  document.getElementById('trends-baseline-content').innerHTML = `
    <p class="text-sm font-semibold text-bark mb-2">${headline}</p>
    <p class="text-xs text-bark-muted leading-relaxed">
      Breakout this period averaged <strong style="color:#3a2e28">${cmp.rangeBreakout}/5</strong>,
      ${verdict(bDelta)} your average of <strong style="color:#3a2e28">${cmp.baselineBreakout}/5</strong> before that.
      Redness averaged <strong style="color:#3a2e28">${cmp.rangeRedness}/5</strong>, ${verdict(rDelta)}
      <strong style="color:#3a2e28">${cmp.baselineRedness}/5</strong> before.
    </p>
    <p class="text-[10px] text-bark-muted mt-2">Based on ${cmp.rangeCount} entries this period vs. ${cmp.baselineCount} before it — your own history, not a general benchmark.</p>`;
}

function renderTrendsStats(entries) {
  const statsEl = document.getElementById('trends-stats');
  const bVals = entries.map(l => parseInt(l.breakout));
  const rVals = entries.map(l => parseInt(l.redness));
  const totalRoutineSteps = entries.reduce((acc, l) => acc + (l.routine?.length || 0), 0);
  const avgRoutinePct = ((totalRoutineSteps / (entries.length * 7)) * 100).toFixed(0);
  const stats = [
    { label: 'Entries', value: entries.length, sub: 'logged', bg: '#f2e0de', color: '#b5706a' },
    { label: 'Avg Break', value: avg(bVals), sub: 'out of 5', bg: '#f2e0de', color: '#943f3a' },
    { label: 'Avg Red.', value: avg(rVals), sub: 'out of 5', bg: '#dde8db', color: '#607a5c' },
    { label: 'Routine', value: avgRoutinePct + '%', sub: 'completed', bg: '#fef3c7', color: '#92400e' },
  ];
  statsEl.innerHTML = stats.map(s => `
    <div class="rounded-2xl p-3 text-center" style="background:${s.bg}80">
      <div class="font-serif text-xl font-semibold" style="color:${s.color}">${s.value}</div>
      <div class="text-[9px] font-bold uppercase tracking-wider text-bark-muted leading-tight mt-0.5">${s.label}</div>
      <div class="text-[9px] text-bark-muted">${s.sub}</div>
    </div>`).join('');
}

function renderTrendsChart(entries) {
  const svg = document.getElementById('trends-chart');
  const W = 320, H = 140, PAD_X = 6, BASE_Y = 128, TOP_Y = 10;
  const n = entries.length;
  const xFor = (i) => n === 1 ? W / 2 : PAD_X + (i / (n - 1)) * (W - PAD_X * 2);
  const yFor = (v) => BASE_Y - ((v - 1) / 4) * (BASE_Y - TOP_Y);

  const bPoints = entries.map((l, i) => `${xFor(i)},${yFor(parseInt(l.breakout))}`).join(' ');
  const rPoints = entries.map((l, i) => `${xFor(i)},${yFor(parseInt(l.redness))}`).join(' ');
  const bArea = `M${xFor(0)},${BASE_Y} L${bPoints.split(' ').join(' L')} L${xFor(n - 1)},${BASE_Y} Z`;
  const rArea = `M${xFor(0)},${BASE_Y} L${rPoints.split(' ').join(' L')} L${xFor(n - 1)},${BASE_Y} Z`;
  const midY = yFor(3);

  svg.innerHTML = `
    <line class="trend-gridline" x1="${PAD_X}" y1="${midY}" x2="${W - PAD_X}" y2="${midY}"/>
    <path class="trend-area" fill="#943f3a" d="${bArea}"/>
    <path class="trend-area" fill="#607a5c" d="${rArea}"/>
    <polyline class="trend-line" stroke="#8fa88a" points="${rPoints}"/>
    <polyline class="trend-line" stroke="#d4908a" points="${bPoints}"/>
  `;

  document.getElementById('trends-chart-dates').innerHTML =
    `<span>${escapeHtml(entries[0].date)}</span><span>${escapeHtml(entries[n - 1].date)}</span>`;
}

function renderTrendsHeatmap(logs, range) {
  const wrap = document.getElementById('trends-heatmap');
  const byDateKey = new Map(logs.map(l => [l.dateKey, l]));
  const days = range === 'all' ? Math.min(365, (() => {
    const oldest = logs.reduce((min, l) => l.dateKey < min ? l.dateKey : min, isoDate(new Date()));
    return Math.round((new Date() - new Date(oldest)) / 86400000) + 1;
  })()) : parseInt(range, 10);

  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const dateKey = isoDate(d);
    const entry = byDateKey.get(dateKey);
    cells.push({ dateKey, entry });
  }
  // Pad the front so the grid always chunks evenly into columns of 7
  while (cells.length % 7 !== 0) cells.unshift({ dateKey: null, entry: null, pad: true });

  const cols = [];
  for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));

  wrap.innerHTML = cols.map(col => `
    <div class="heatmap-col">
      ${col.map(c => {
        if (c.pad) return `<div class="heatmap-cell is-pad" style="visibility:hidden"></div>`;
        const bg = c.entry ? (BREAKOUT_COLORS[parseInt(c.entry.breakout)] || '#f2e0de') : null;
        const cls = c.entry ? 'heatmap-cell' : 'heatmap-cell is-empty';
        return `<div class="${cls}" ${bg ? `style="background:${bg}"` : ''} data-date-key="${c.dateKey}" onclick="selectHeatmapCell('${c.dateKey}')" title="${escapeHtml(c.dateKey)}"></div>`;
      }).join('')}
    </div>`).join('');

  document.getElementById('trends-heatmap-selected').textContent = '';
}

function selectHeatmapCell(dateKey) {
  const entry = getLogs().find(l => l.dateKey === dateKey);
  const label = document.getElementById('trends-heatmap-selected');
  if (!entry) { label.textContent = `${dateKey} — no entry`; return; }
  label.textContent = `${entry.date} — Breakout: ${BREAKOUT_LABELS[parseInt(entry.breakout)]}`;
}

function triggerInsightCard(p) {
  const isRedness = p.metric === 'redness';
  return {
    effectSize: Math.abs(p.delta),
    html: `
    <div class="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-blush/10">
      <span class="text-lg mt-0.5">${isRedness ? '🌡️' : '🔍'}</span>
      <div><p class="text-sm font-semibold text-bark">"${escapeHtml(p.word)}" associated with ${p.delta > 0 ? 'higher' : 'lower'} ${isRedness ? 'redness' : 'breakout'}</p>
      <p class="text-xs text-bark-muted mt-0.5">You tended to see ${p.withValue}/5 on days you mentioned it, vs ${p.withoutValue}/5 when you didn't &nbsp;·&nbsp; based on ${p.count} mentions</p></div>
    </div>` };
}

function productInsightCard(product, impact) {
  const bDelta = impact.duringBreakout - impact.beforeBreakout;
  const rDelta = impact.duringRedness - impact.beforeRedness;
  const leadDelta = Math.abs(bDelta) >= Math.abs(rDelta) ? bDelta : rDelta;
  return {
    effectSize: Math.max(Math.abs(bDelta), Math.abs(rDelta)),
    html: `
    <div class="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-blush/10">
      <span class="text-lg mt-0.5">🧴</span>
      <div><p class="text-sm font-semibold text-bark">${escapeHtml(product.name)} associated with ${leadDelta > 0 ? 'higher' : 'lower'} severity</p>
      <p class="text-xs text-bark-muted mt-0.5">Your data suggests avg breakout ${impact.duringBreakout}/5 while using this (was ${impact.beforeBreakout}/5 before) &nbsp;·&nbsp; avg redness ${impact.duringRedness}/5 (was ${impact.beforeRedness}/5)</p></div>
    </div>` };
}

function sleepInsightCard(s) {
  const direction = s.breakoutDelta < 0 ? 'lower' : 'higher';
  return {
    effectSize: Math.max(Math.abs(s.breakoutDelta), Math.abs(s.rednessDelta)),
    html: `
    <div class="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-blush/10">
      <span class="text-lg mt-0.5">🌙</span>
      <div><p class="text-sm font-semibold text-bark">Better sleep nights associated with ${direction} breakout</p>
      <p class="text-xs text-bark-muted mt-0.5">You tended to see ${s.higherBreakout}/5 breakout on good/great-sleep days vs ${s.lowerBreakout}/5 on poor/fair-sleep days &nbsp;·&nbsp; based on ${s.lowerCount + s.higherCount} entries</p></div>
    </div>` };
}

function routineInsightCard(r) {
  const direction = r.breakoutDelta < 0 ? 'lower' : 'higher';
  return {
    effectSize: Math.max(Math.abs(r.breakoutDelta), Math.abs(r.rednessDelta)),
    html: `
    <div class="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-blush/10">
      <span class="text-lg mt-0.5">✓</span>
      <div><p class="text-sm font-semibold text-bark">Higher routine adherence associated with ${direction} breakout</p>
      <p class="text-xs text-bark-muted mt-0.5">You tended to see ${r.highBreakout}/5 breakout on days you completed 80%+ of your routine, vs ${r.lowerBreakout}/5 on lower-adherence days &nbsp;·&nbsp; based on ${r.highCount + r.lowerCount} entries</p></div>
    </div>` };
}

/** Consolidated "worth noting" digest for the selected range. Reuses
 *  the same compute functions as the Dashboard and My Products rather
 *  than inventing new correlation math for this view, but — unlike the
 *  single-card cap those use — pools every qualifying finding across
 *  categories (trigger words against both metrics, products, sleep,
 *  routine adherence) and shows the strongest ones by effect size, so a
 *  real pattern in a less-common category isn't buried by a weaker one
 *  that happens to be checked first. Capped at MAX_CARDS purely for
 *  legibility — this is meant to answer "what does this mean for me,"
 *  not become a dashboard of every technically-qualifying stat. */
function renderTrendsInsights(entries) {
  const el = document.getElementById('trends-insights');
  const MAX_CARDS = 6;
  const candidates = [];

  computeTopTriggerPatterns(entries, 3, 'breakout').forEach(p => candidates.push(triggerInsightCard(p)));
  computeTopTriggerPatterns(entries, 2, 'redness').forEach(p => candidates.push(triggerInsightCard(p)));

  getProducts()
    .filter(p => !p.archived)
    .map(p => ({ product: p, impact: computeProductImpact(p) }))
    .filter(x => !x.impact.insufficient && (Math.abs(x.impact.duringBreakout - x.impact.beforeBreakout) >= 0.3 || Math.abs(x.impact.duringRedness - x.impact.beforeRedness) >= 0.3))
    .forEach(({ product, impact }) => candidates.push(productInsightCard(product, impact)));

  const sleepImpact = computeSleepImpact(entries);
  if (!sleepImpact.insufficient) candidates.push(sleepInsightCard(sleepImpact));

  const routineImpact = computeRoutineAdherenceImpact(entries);
  if (!routineImpact.insufficient) candidates.push(routineInsightCard(routineImpact));

  const cards = candidates
    .sort((a, b) => b.effectSize - a.effectSize)
    .slice(0, MAX_CARDS)
    .map(c => c.html);

  // Area frequency is descriptive (how often, not a severity comparison),
  // so it isn't ranked against the correlational cards above — it's
  // always appended on its own when there's any data for it.
  const areaFreq = computeAreaFrequency(entries).filter(a => a.count > 0).slice(0, 1);
  areaFreq.forEach(a => cards.push(`
    <div class="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-blush/10">
      <span class="text-lg mt-0.5">📍</span>
      <div><p class="text-sm font-semibold text-bark">${escapeHtml(a.label)} is your most-logged area</p>
      <p class="text-xs text-bark-muted mt-0.5">Marked on ${a.count} of ${entries.length} entries (${a.pct}%)</p></div>
    </div>`));

  el.innerHTML = cards.length ? cards.join('') + `
    <p class="text-[10px] text-bark-muted text-center italic pt-1">Your data suggests these associations — correlational only, not a diagnosis.</p>` : `
    <p class="text-xs text-bark-muted text-center py-3">Keep logging to unlock deeper insights.</p>`;
}

