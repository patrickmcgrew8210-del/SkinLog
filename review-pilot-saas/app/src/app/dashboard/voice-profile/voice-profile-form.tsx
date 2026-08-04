"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { VoiceProfile } from "@/lib/voice-profile";

export function VoiceProfileForm({
  businessId,
  initialProfile,
}: {
  businessId: string;
  initialProfile: VoiceProfile;
}) {
  const [profile, setProfile] = useState<VoiceProfile>(initialProfile);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateSampleReply(index: number, text: string) {
    setSaved(false);
    setProfile((prev) => {
      const sampleReplies = [...prev.sampleReplies];
      sampleReplies[index] = text;
      return { ...prev, sampleReplies };
    });
  }

  function addSampleReply() {
    if (profile.sampleReplies.length >= 5) return;
    setProfile((prev) => ({
      ...prev,
      sampleReplies: [...prev.sampleReplies, ""],
    }));
  }

  function removeSampleReply(index: number) {
    setSaved(false);
    setProfile((prev) => ({
      ...prev,
      sampleReplies: prev.sampleReplies.filter((_, i) => i !== index),
    }));
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const cleanedProfile: VoiceProfile = {
      ...profile,
      sampleReplies: profile.sampleReplies
        .map((reply) => reply.trim())
        .filter(Boolean),
    };

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("businesses")
      .update({ voice_profile: cleanedProfile })
      .eq("id", businessId);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setProfile(cleanedProfile);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">
            Past replies (optional, but the single best signal)
          </h2>
          <p className="text-sm text-slate-500">
            Paste up to 5 replies you&apos;ve actually written before. If you
            don&apos;t have any yet, skip this and just answer the questions
            below.
          </p>
        </div>
        {profile.sampleReplies.map((reply, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={reply}
              onChange={(event) => updateSampleReply(index, event.target.value)}
              rows={2}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Thank you so much for the kind words..."
            />
            <button
              type="button"
              onClick={() => removeSampleReply(index)}
              className="self-start rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
            >
              Remove
            </button>
          </div>
        ))}
        {profile.sampleReplies.length < 5 && (
          <button
            type="button"
            onClick={addSampleReply}
            className="w-fit rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            + Add a past reply
          </button>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-slate-900">Tone questions</h2>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          How formal should replies sound?
          <select
            value={profile.formality}
            onChange={(event) =>
              setProfile((prev) => ({
                ...prev,
                formality: event.target.value as VoiceProfile["formality"],
              }))
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="casual">Casual and friendly</option>
            <option value="warm">Warm but professional</option>
            <option value="professional">Formal and professional</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          How do you usually sign off?
          <input
            type="text"
            value={profile.signOff}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, signOff: event.target.value }))
            }
            placeholder="- Dr. Smith, or - The Acme Dental Team"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          A phrase or word that sounds like you
          <input
            type="text"
            value={profile.signaturePhrase}
            onChange={(event) =>
              setProfile((prev) => ({
                ...prev,
                signaturePhrase: event.target.value,
              }))
            }
            placeholder="e.g. 'we appreciate you' or 'y'all'"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Anything a reply should never say?
          <textarea
            value={profile.neverSay}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, neverSay: event.target.value }))
            }
            rows={2}
            placeholder="e.g. never offer a refund, never mention a patient's treatment"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </section>

      {error && <p className="text-sm text-danger">{error}</p>}
      {saved && (
        <p className="text-sm text-success">Voice profile saved.</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-fit rounded-lg bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save voice profile"}
      </button>
    </form>
  );
}
