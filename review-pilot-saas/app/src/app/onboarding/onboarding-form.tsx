"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const industries = [
  "Dental practice",
  "HVAC / plumbing",
  "Roofing",
  "Med spa",
  "Restaurant",
  "Other",
];

function OnboardingFormInner() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "growth";

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState(industries[0]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: rpcError } = await supabase.rpc("create_business", {
      p_name: name,
      p_industry: industry,
    });

    if (rpcError) {
      setLoading(false);
      setError(rpcError.message);
      return;
    }

    const checkoutResponse = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    setLoading(false);

    if (!checkoutResponse.ok) {
      const { error: checkoutError } = await checkoutResponse.json();
      setError(checkoutError ?? "Could not start checkout. Please try again.");
      return;
    }

    const { url } = await checkoutResponse.json();
    window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Business name
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Acme Dental"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Industry
        <select
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {industries.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {loading ? "Setting up…" : "Continue"}
      </button>
    </form>
  );
}

export function OnboardingForm() {
  return (
    <Suspense>
      <OnboardingFormInner />
    </Suspense>
  );
}
