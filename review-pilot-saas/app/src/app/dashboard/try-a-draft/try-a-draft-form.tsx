"use client";

import { useState } from "react";

type DraftResult = {
  reply: string;
  flagForReview: boolean;
  flagReason: string | null;
};

export function TryADraftForm() {
  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DraftResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    const response = await fetch("/api/drafts/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewBody, rating }),
    });

    setLoading(false);

    if (!response.ok) {
      const { error: apiError } = await response.json();
      setError(apiError ?? "Something went wrong. Please try again.");
      return;
    }

    setResult(await response.json());
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.reply);
    setCopied(true);
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Star rating
          <select
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} star{star === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Paste the review text
          <textarea
            required
            value={reviewBody}
            onChange={(event) => setReviewBody(event.target.value)}
            rows={5}
            maxLength={2000}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Paste a real review here..."
          />
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-lg bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? "Drafting..." : "Generate draft reply"}
        </button>
      </form>

      {result && (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
          {result.flagForReview && (
            <div className="rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-slate-700">
              <span className="font-semibold text-warning">
                Needs your review before posting:
              </span>{" "}
              {result.flagReason}
            </div>
          )}
          <p className="whitespace-pre-wrap text-sm text-slate-800">
            {result.reply}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            {copied ? "Copied!" : "Copy reply"}
          </button>
        </div>
      )}
    </div>
  );
}
