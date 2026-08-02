import Link from "next/link";

const industries = [
  "Dental practices",
  "HVAC & plumbing companies",
  "Roofing contractors",
  "Med spas",
  "Restaurants",
];

const steps = [
  {
    title: "Connect your Google Business Profile",
    body: "One click, secure OAuth login — we never see your Google password.",
  },
  {
    title: "Teach it your voice",
    body: "Paste a few replies you've written before, or answer four quick questions about your tone. That's it.",
  },
  {
    title: "Approve from your phone",
    body: "A draft is ready within minutes of a new review. Tap approve, edit-then-approve, or skip. Nothing posts without you.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$39",
    blurb: "Google reviews, up to 50 AI drafts/mo, one-click copy to post yourself.",
  },
  {
    name: "Growth",
    price: "$79",
    blurb: "Google + Facebook, up to 150 drafts/mo, one-click direct posting.",
  },
  {
    name: "Pro",
    price: "$149",
    blurb: "Up to 3 locations, unlimited drafts, autopilot for 5-star reviews, SMS alerts below 3 stars.",
  },
];

const faqTeasers = [
  {
    q: "Will it post something I didn't approve?",
    a: "No. Negative reviews are never auto-posted, on any plan.",
  },
  {
    q: "Does it work with Yelp?",
    a: "Yelp doesn't let any tool post replies on a business's behalf, including ours — for Yelp we draft the reply and you copy it over in one click.",
  },
  {
    q: "What if I don't like a draft?",
    a: "Edit it before approving, or skip it entirely. Every edit helps future drafts sound more like you.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-20 pt-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Replies that sound like you.
          <br className="hidden sm:block" /> Approved in one tap.
        </h1>
        <p className="max-w-xl text-lg text-slate-600">
          ReviewPilot AI reads every new Google review, drafts a reply in
          your business&apos;s own voice, and puts it in front of you to
          approve from your phone — usually in under a minute.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/sign-up"
            className="rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            Start my 14-day free trial
          </Link>
          <Link
            href="/demo"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            See a 90-second demo
          </Link>
        </div>
        <p className="text-sm text-slate-500">
          No contract. Cancel anytime. Setup takes 10 minutes.
        </p>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            You know you should be replying to every review. You just don&apos;t
            have the time.
          </h2>
          <p className="mt-4 text-slate-600">
            Between patients, jobs, or tables, review replies are the first
            thing that falls off the list. Weeks go by. Then a customer
            mentions in person that they noticed nobody responded — and that
            stings more than the review itself. Generic canned replies
            aren&apos;t much better: customers can tell when they&apos;re reading a
            template.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Three steps. Ten minutes. Then it just runs.
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-brand-500">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            You&apos;re always in control.
          </h2>
          <p className="mt-4 text-slate-600">
            Every reply is a draft until you approve it. Reviews rated 1–3
            stars are never auto-posted — ever, on any plan — they&apos;re
            flagged for your review so you can handle sensitive situations
            personally. Full audit trail of every reply, every edit, every
            approval.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Built for businesses like yours.
          </h2>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-600">
            {industries.map((industry) => (
              <li key={industry} className="font-medium">
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16" id="pricing">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Pricing that makes sense for one location or three.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-brand-600">
                  {plan.price}
                  <span className="text-base font-normal text-slate-500">
                    /mo
                  </span>
                </p>
                <p className="text-sm text-slate-600">{plan.blurb}</p>
              </div>
            ))}
          </div>
          <Link
            href="/pricing"
            className="mt-8 inline-block font-semibold text-brand-600 hover:text-brand-700"
          >
            See full pricing details &rarr;
          </Link>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Common questions
          </h2>
          <dl className="mt-8 flex flex-col gap-6">
            {faqTeasers.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-1 text-sm text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/faq"
            className="mt-6 inline-block font-semibold text-brand-600 hover:text-brand-700"
          >
            Read the full FAQ &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-brand-700 px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-white">
          Stop letting reviews sit unanswered.
        </h2>
        <Link
          href="/sign-up"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
        >
          Start my free trial — no contract, cancel anytime
        </Link>
      </section>
    </main>
  );
}
