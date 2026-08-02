import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Tell us about your business
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Takes 30 seconds. You&apos;ll connect your Google Business Profile
          and set your voice profile next.
        </p>
      </div>
      <OnboardingForm />
    </main>
  );
}
