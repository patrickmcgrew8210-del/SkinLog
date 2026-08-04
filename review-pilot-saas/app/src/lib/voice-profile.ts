export type VoiceProfile = {
  sampleReplies: string[];
  formality: "casual" | "professional" | "warm";
  signOff: string;
  neverSay: string;
  signaturePhrase: string;
};

export const emptyVoiceProfile: VoiceProfile = {
  sampleReplies: [],
  formality: "warm",
  signOff: "",
  neverSay: "",
  signaturePhrase: "",
};

export function parseVoiceProfile(value: unknown): VoiceProfile {
  if (!value || typeof value !== "object") {
    return emptyVoiceProfile;
  }

  const record = value as Record<string, unknown>;

  return {
    sampleReplies: Array.isArray(record.sampleReplies)
      ? record.sampleReplies.filter((item): item is string => typeof item === "string")
      : [],
    formality:
      record.formality === "casual" || record.formality === "professional"
        ? record.formality
        : "warm",
    signOff: typeof record.signOff === "string" ? record.signOff : "",
    neverSay: typeof record.neverSay === "string" ? record.neverSay : "",
    signaturePhrase:
      typeof record.signaturePhrase === "string" ? record.signaturePhrase : "",
  };
}
