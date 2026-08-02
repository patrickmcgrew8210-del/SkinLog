"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
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

    setLoading(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    router.push(`/dashboard?plan=${plan}`);
    router.refresh();
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
