import Anthropic from "@anthropic-ai/sdk";
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

function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
}

const DRAFT_REPLY_TOOL: Anthropic.Messages.Tool = {
  name: "provide_draft_reply",
  description: "Provide the drafted review reply.",
  input_schema: {
    type: "object",
    properties: {
      reply: {
        type: "string",
        description: "The drafted reply to the review, ready to post.",
      },
      flag_for_review: {
        type: "boolean",
        description:
          "True if this reply needs a human to look at it before it is ever posted, even on autopilot.",
      },
      flag_reason: {
        type: "string",
        description:
          "Why this needs human review (e.g. 'mentions a refund request', 'legal threat', 'health claim'). Empty string if not flagged.",
      },
    },
    required: ["reply", "flag_for_review", "flag_reason"],
  },
};

function buildSystemPrompt(input: DraftReplyInput): string {
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
  const client = getAnthropicClient();

  const message = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 512,
    system: buildSystemPrompt(input),
    messages: [
      {
        role: "user",
        content: `A ${input.rating}-star review was just posted on ${
          input.platform === "manual" ? "our listing" : input.platform
        }:\n\n"${input.reviewBody}"\n\nDraft a reply.`,
      },
    ],
    tools: [DRAFT_REPLY_TOOL],
    tool_choice: { type: "tool", name: "provide_draft_reply" },
  });

  const toolUse = message.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock =>
      block.type === "tool_use",
  );

  if (!toolUse) {
    throw new Error("Claude did not return a draft reply");
  }

  const output = toolUse.input as {
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
