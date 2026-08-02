import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — ReviewPilot AI",
  description: "Answers to common questions about ReviewPilot AI.",
};

const faqs: { q: string; a: string }[] = [
  {
    q: "Will ReviewPilot AI post a reply I didn't approve?",
    a: "No. Every reply is a draft until you approve it. On top of that, reviews rated 1–3 stars can never be auto-posted, on any plan, even if you enable autopilot — they're always routed to you for approval.",
  },
  {
    q: "What is autopilot, exactly?",
    a: "Autopilot (Pro plan only, opt-in) automatically posts AI-drafted replies to 4–5 star reviews without requiring your approval first. You can turn it off at any time, and it never applies to lower-rated reviews.",
  },
  {
    q: "Does it work with Yelp?",
    a: "Yelp does not provide any business, including ours, an API to post owner responses on a business's behalf. For Yelp, ReviewPilot AI drafts the reply for you and gives you a one-click copy button to paste it in on Yelp yourself. We're upfront about this because we'd rather tell you the real limitation than overpromise.",
  },
  {
    q: "Which review platforms are supported?",
    a: "Google Business Profile is supported at launch, including direct one-click posting. Facebook Page reviews and Yelp (draft-only) are on our near-term roadmap.",
  },
  {
    q: "How does it learn my voice?",
    a: "During setup, you paste in a handful of replies you've written before (or answer a short tone questionnaire if you're starting fresh). Every time you edit a draft before approving it, that edit is used to keep future drafts closer to how you'd actually write.",
  },
  {
    q: "Is my Google account safe?",
    a: "We connect to your Google Business Profile using Google's own OAuth login — we never see or store your Google password. You can revoke access at any time from your Google account settings or from ReviewPilot AI directly.",
  },
  {
    q: "What happens to a review that doesn't get approved?",
    a: "Nothing is posted. You can also explicitly 'Skip' a review, which marks it as intentionally not replied to and removes it from your queue.",
  },
  {
    q: "Do I need a contract?",
    a: "No. All plans are month-to-month (with an optional annual discount) and you can cancel anytime from your billing settings — no phone call required.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, 14 days on any plan. A card is required to start the trial, but you won't be charged until the trial ends, and you can cancel before then with no charge.",
  },
  {
    q: "Can more than one person on my team approve replies?",
    a: "Yes. You can invite staff members who can view and approve/edit replies without access to your billing information.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">
        Frequently asked questions
      </h1>
      <dl className="mt-10 flex flex-col gap-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="text-lg font-semibold text-slate-900">{item.q}</dt>
            <dd className="mt-2 text-slate-600">{item.a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
