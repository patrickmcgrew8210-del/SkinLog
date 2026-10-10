/* ══════════════════════════════════════════════
   INSIGHTS — cross-cutting correlation/analytics (triggers, areas)

   Known limitations (reviewed, not fixed here — noted so they aren't
   mistaken for oversights):
   - Every gate below checks each comparison group's sample size
     independently (both sides >= some minimum), never their size
     relative to each other. A 5-entry "before" group compared against
     a 50-entry "range" group passes the gate just as cleanly as 25 vs
     25 — the smaller side's average is real but carries more sampling
     noise than the card's confident wording implies. This mirrors the
     pre-existing computeProductImpact() convention; fixing it properly
     (e.g. weighting by group size, or a stricter bar as the imbalance
     grows) is a real statistics change, not a formatting one.
   - No outlier handling: one extreme day (e.g. a single breakout:'5'
     amid a run of '1's) shifts a small group's average the same way a
     genuine trend would, and nothing here distinguishes "one bad day"
     from "a real pattern." The minimum-sample gates reduce how often a
     single outlier can swing a whole comparison, but don't eliminate
     it, especially right at the MIN_ENTRIES boundary.
══════════════════════════════════════════════ */

/** Lowercase, strip punctuation, drop stopwords + very short words. */
function tokenizeTriggerText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !TRIGGER_STOPWORDS.has(w));
}

/** Top `limit` keyword→severity correlations across all trigger notes,
 *  against either metric ('breakout' or 'redness'). Correlational, not
 *  causal: avg severity on days a word appears vs. days it doesn't,
 *  mirroring computeProductImpact()'s before/after shape. Requires >=3
 *  entries on each side (same bar as computeProductImpact), plus a
 *  minimum |delta| of 0.3 — the same "meaningful change" cutoff
 *  trendArrow() already uses — since this auto-surfaces on the
 *  Dashboard/Trends screens rather than being looked up on demand, so
 *  noise needs its own floor before it's shown. */
function computeTopTriggerPatterns(logs, limit = 2, metric = 'breakout') {
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
    const withVal    = avg(withArr.map(l => parseInt(l[metric])));
    const withoutVal = avg(withoutArr.map(l => parseInt(l[metric])));
    const delta = withVal - withoutVal; // avg() returns a numeric string; subtraction coerces it, same as computeProductImpact already relies on
    if (Math.abs(delta) < MIN_DELTA) return;
    candidates.push({ word, count, metric, withValue: withVal, withoutValue: withoutVal, delta });
  });

  return candidates.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, limit);
}

const INSIGHT_MIN_DELTA = 0.3; // same "meaningful change" floor trendArrow()/trigger-word matching use

/** Sleep quality vs. severity: lower-sleep days (poor/fair) vs.
 *  higher-sleep days (good/great), both metrics. Entries with sleep
 *  left as "not set" are excluded from both buckets rather than folded
 *  into either. Requires >=3 entries per side (same bar as the other
 *  correlations here) AND at least one metric clearing the minimum
 *  delta — sample size alone doesn't make a trivial difference
 *  noteworthy. */
function computeSleepImpact(logs) {
  const MIN_ENTRIES = 3;
  const lower  = logs.filter(l => l.sleep === 'poor' || l.sleep === 'fair');
  const higher = logs.filter(l => l.sleep === 'good' || l.sleep === 'great');
  if (lower.length < MIN_ENTRIES || higher.length < MIN_ENTRIES) return { insufficient: true };
  const lowerBreakout = avg(lower.map(l => parseInt(l.breakout)));
  const higherBreakout = avg(higher.map(l => parseInt(l.breakout)));
  const lowerRedness = avg(lower.map(l => parseInt(l.redness)));
  const higherRedness = avg(higher.map(l => parseInt(l.redness)));
  const breakoutDelta = higherBreakout - lowerBreakout;
  const rednessDelta = higherRedness - lowerRedness;
  if (Math.abs(breakoutDelta) < INSIGHT_MIN_DELTA && Math.abs(rednessDelta) < INSIGHT_MIN_DELTA) return { insufficient: true };
  return {
    insufficient: false,
    lowerCount: lower.length, higherCount: higher.length,
    lowerBreakout, higherBreakout, lowerRedness, higherRedness,
    breakoutDelta, rednessDelta,
  };
}

/** Routine adherence vs. severity: high-adherence days (>=80% of the 7
 *  possible AM/PM steps) vs. lower-adherence days, both metrics. 80%
 *  mirrors the "good routine" cutoff already used elsewhere in the UI
 *  (history.js's routine-percentage styling). Same sample-size +
 *  minimum-delta gating as computeSleepImpact() above. */
function computeRoutineAdherenceImpact(logs) {
  const MIN_ENTRIES = 3;
  const ADHERENCE_CUTOFF = 0.8;
  const pctOf = l => (l.routine?.length || 0) / 7;
  const high  = logs.filter(l => pctOf(l) >= ADHERENCE_CUTOFF);
  const lower = logs.filter(l => pctOf(l) < ADHERENCE_CUTOFF);
  if (high.length < MIN_ENTRIES || lower.length < MIN_ENTRIES) return { insufficient: true };
  const highBreakout = avg(high.map(l => parseInt(l.breakout)));
  const lowerBreakout = avg(lower.map(l => parseInt(l.breakout)));
  const highRedness = avg(high.map(l => parseInt(l.redness)));
  const lowerRedness = avg(lower.map(l => parseInt(l.redness)));
  const breakoutDelta = highBreakout - lowerBreakout;
  const rednessDelta = highRedness - lowerRedness;
  if (Math.abs(breakoutDelta) < INSIGHT_MIN_DELTA && Math.abs(rednessDelta) < INSIGHT_MIN_DELTA) return { insufficient: true };
  return {
    insufficient: false,
    highCount: high.length, lowerCount: lower.length,
    highBreakout, lowerBreakout, highRedness, lowerRedness,
    breakoutDelta, rednessDelta,
  };
}

/** Compares the currently-selected range's average severity against
 *  the user's own average from before that range — a personal
 *  baseline, not a population norm. Deliberately requires a genuine
 *  "before" period to compare against, so this doesn't render for the
 *  "All" range (which has no "before" left to compare to), plus a
 *  minimum total history before it's shown at all — a handful of
 *  entries isn't enough to call anything a baseline. */
function computeBaselineComparison(allLogs, rangeEntries, range) {
  const MIN_TOTAL_HISTORY = 15;
  const MIN_BASELINE_ENTRIES = 5;
  if (range === 'all' || allLogs.length < MIN_TOTAL_HISTORY || rangeEntries.length < 3) {
    return { insufficient: true };
  }
  const rangeKeys = new Set(rangeEntries.map(l => l.dateKey));
  const baseline = allLogs.filter(l => !rangeKeys.has(l.dateKey));
  if (baseline.length < MIN_BASELINE_ENTRIES) return { insufficient: true };
  return {
    insufficient: false,
    rangeCount: rangeEntries.length,
    baselineCount: baseline.length,
    rangeBreakout: avg(rangeEntries.map(l => parseInt(l.breakout))),
    baselineBreakout: avg(baseline.map(l => parseInt(l.breakout))),
    rangeRedness: avg(rangeEntries.map(l => parseInt(l.redness))),
    baselineRedness: avg(baseline.map(l => parseInt(l.redness))),
  };
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

