import { GoogleGenAI, Type } from "@google/genai";
import type { VoiceProfile } from "@/lib/voice-profile";

export type DraftReplyInput = {
  businessName: string;
  industry: string | null;
  voiceProfile: VoiceProfile;
  reviewBody: string;
  rating: number;
  platform: "google" | "facebook" | "yelp" | "manual";
};

export type DraftReplyResult = {
  reply: string;
  flagForReview: boolean;
  flagReason: string | null;
};

function getGeminiClient() {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
}

const DRAFT_REPLY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description: "The drafted reply to the review, ready to post.",
    },
    flag_for_review: {
      type: Type.BOOLEAN,
      description:
        "True if this reply needs a human to look at it before it is ever posted, even on autopilot.",
    },
    flag_reason: {
      type: Type.STRING,
      description:
        "Why this needs human review (e.g. 'mentions a refund request', 'legal threat', 'health claim'). Empty string if not flagged.",
    },
  },
  required: ["reply", "flag_for_review", "flag_reason"],
};

function buildSystemInstruction(input: DraftReplyInput): string {
  const { businessName, industry, voiceProfile } = input;

  const lines = [
    `You write review-reply drafts on behalf of ${businessName}` +
      (industry ? `, a ${industry.toLowerCase()} business.` : "."),
    `Tone: ${voiceProfile.formality}.`,
  ];

  if (voiceProfile.signOff) {
    lines.push(`Sign off replies with: "${voiceProfile.signOff}".`);
  }
  if (voiceProfile.signaturePhrase) {
    lines.push(
      `Where it fits naturally, you can use a phrase like "${voiceProfile.signaturePhrase}" since that is how this business actually talks.`,
    );
  }
  if (voiceProfile.neverSay) {
    lines.push(`Never say or imply: ${voiceProfile.neverSay}.`);
  }
  if (voiceProfile.sampleReplies.length > 0) {
    lines.push(
      "Here are real replies this business has written before -- match this voice closely:",
      ...voiceProfile.sampleReplies.map(
        (reply, i) => `Example ${i + 1}: "${reply}"`,
      ),
    );
  }

  lines.push(
    "Rules:",
    "- Keep replies concise: 2-4 sentences for most reviews.",
    "- Reference something specific from the review when possible; never sound like a generic template.",
    "- Never offer refunds, discounts, or make promises on the business's behalf.",
    "- Never include a phone number, email, or external link.",
    "- Set flag_for_review to true for anything mentioning a legal threat, a health/safety claim, a refund demand, or anything you do not have enough information to respond to confidently.",
  );

  return lines.join("\n");
}

export async function generateDraftReply(
  input: DraftReplyInput,
): Promise<DraftReplyResult> {
  const client = getGeminiClient();

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `A ${input.rating}-star review was just posted on ${
      input.platform === "manual" ? "our listing" : input.platform
    }:\n\n"${input.reviewBody}"\n\nDraft a reply.`,
    config: {
      systemInstruction: buildSystemInstruction(input),
      responseMimeType: "application/json",
      responseSchema: DRAFT_REPLY_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini did not return a draft reply");
  }

  const output = JSON.parse(text) as {
    reply: string;
    flag_for_review: boolean;
    flag_reason: string;
  };

  // Reviews rated 1-3 stars are never eligible for autopilot, regardless of
  // what the model decides -- this is a hard product rule enforced here in
  // code, not left to the prompt alone.
  const lowRating = input.rating <= 3;
  const flagForReview = output.flag_for_review || lowRating;
  const flagReason = flagForReview
    ? output.flag_reason ||
      (lowRating
        ? "Rating is 3 stars or below -- always requires human approval."
        : null)
    : null;

  return {
    reply: output.reply,
    flagForReview,
    flagReason,
  };
}
