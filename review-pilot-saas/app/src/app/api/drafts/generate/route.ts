import { NextResponse } from "next/server";
import { generateDraftReply } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";
import { parseVoiceProfile } from "@/lib/voice-profile";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json(
      { error: "No business found for this account" },
      { status: 404 },
    );
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("name, industry, voice_profile")
    .eq("id", membership.business_id)
    .single();

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = await request.json();
  const reviewBody = typeof body.reviewBody === "string" ? body.reviewBody.trim() : "";
  const rating = Number(body.rating);

  if (!reviewBody || reviewBody.length > 2000) {
    return NextResponse.json(
      { error: "Review text must be between 1 and 2000 characters" },
      { status: 400 },
    );
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be an integer between 1 and 5" },
      { status: 400 },
    );
  }

  try {
    const draft = await generateDraftReply({
      businessName: business.name,
      industry: business.industry,
      voiceProfile: parseVoiceProfile(business.voice_profile),
      reviewBody,
      rating,
      platform: "manual",
    });

    return NextResponse.json(draft);
  } catch {
    return NextResponse.json(
      { error: "Could not generate a draft right now. Please try again." },
      { status: 502 },
    );
  }
}
