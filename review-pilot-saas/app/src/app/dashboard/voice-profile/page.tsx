import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { parseVoiceProfile } from "@/lib/voice-profile";
import { VoiceProfileForm } from "./voice-profile-form";

export default async function VoiceProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/onboarding");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, voice_profile")
    .eq("id", membership.business_id)
    .single();

  if (!business) {
    redirect("/onboarding");
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Voice profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          This is what teaches ReviewPilot AI to write replies that sound
          like you, not a generic template.
        </p>
      </div>
      <VoiceProfileForm
        businessId={business.id}
        initialProfile={parseVoiceProfile(business.voice_profile)}
      />
    </div>
  );
}
