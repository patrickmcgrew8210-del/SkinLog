"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "growth";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?plan=${plan}`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push(`/onboarding?plan=${plan}`);
      router.refresh();
      return;
    }

    setCheckEmail(true);
  }

  if (checkEmail) {
    return (
      <main className="mx-auto flex max-w-sm flex-col gap-4 px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Check your email</h1>
        <p className="text-sm text-slate-600">
          We sent a confirmation link to {email}. Click it to finish setting
          up your account.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Start your 14-day free trial
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Plan selected: <span className="font-medium capitalize">{plan}</span>
          {" — "}
          <Link href="/pricing" className="text-brand-600 hover:text-brand-700">
            change
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Start free trial"}
        </button>
      </form>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
