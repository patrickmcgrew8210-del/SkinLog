/* ══════════════════════════════════════════════
   INSIGHTS — cross-cutting correlation/analytics (triggers, areas)
══════════════════════════════════════════════ */

/** Lowercase, strip punctuation, drop stopwords + very short words. */
function tokenizeTriggerText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !TRIGGER_STOPWORDS.has(w));
}

/** Top `limit` keyword→severity correlations across all trigger notes.
 *  Correlational, not causal: avg breakout on days a word appears vs.
 *  days it doesn't, mirroring computeProductImpact()'s before/after
 *  shape. Requires >=3 entries on each side (same bar as
 *  computeProductImpact), plus a minimum |delta| of 0.3 — the same
 *  "meaningful change" cutoff trendArrow() already uses — since this
 *  auto-surfaces on the Dashboard rather than being looked up on
 *  demand, so noise needs its own floor before it's shown. */
function computeTopTriggerPatterns(logs, limit = 2) {
  const MIN_MENTIONS = 3;
  const MIN_DELTA = 0.3;
  const tokenized = logs.map(l => ({ entry: l, words: new Set(tokenizeTriggerText(l.triggers)) }));
  const counts = new Map();
  tokenized.forEach(({ words }) => words.forEach(w => counts.set(w, (counts.get(w) || 0) + 1)));

  const candidates = [];
  counts.forEach((count, word) => {
    if (count < MIN_MENTIONS) return;
    const withArr    = tokenized.filter(t => t.words.has(word)).map(t => t.entry);
    const withoutArr = tokenized.filter(t => !t.words.has(word)).map(t => t.entry);
    if (withoutArr.length < MIN_MENTIONS) return;
    const withB    = parseFloat(avg(withArr.map(l => parseInt(l.breakout))));
    const withoutB = parseFloat(avg(withoutArr.map(l => parseInt(l.breakout))));
    const delta = withB - withoutB;
    if (Math.abs(delta) < MIN_DELTA) return;
    candidates.push({ word, count, withBreakout: withB, withoutBreakout: withoutB, delta });
  });

  return candidates.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, limit);
}

/** How often each face region was marked, across a given set of entries,
 *  sorted most- to least-frequent — used by the export report. */
function computeAreaFrequency(logs) {
  const counts = Object.fromEntries(FACE_REGIONS.map(r => [r, 0]));
  logs.forEach(l => (l.breakoutAreas || []).forEach(r => { if (r in counts) counts[r]++; }));
  return FACE_REGIONS
    .map(r => ({ region: r, label: FACE_REGION_LABELS[r], count: counts[r], pct: logs.length ? Math.round(counts[r] / logs.length * 100) : 0 }))
    .sort((a, b) => b.count - a.count);
}

