import { TryADraftForm } from "./try-a-draft-form";

export default function TryADraftPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Try a draft</h1>
        <p className="mt-1 text-sm text-slate-500">
          Paste in a real review to see the AI-drafted reply, using your
          saved voice profile. Useful for testing, and for servicing
          customers by hand before automatic syncing is connected --
          generate the draft here, then copy it over to Google yourself.
        </p>
      </div>
      <TryADraftForm />
    </div>
  );
}
