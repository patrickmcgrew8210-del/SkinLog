import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — ReviewPilot AI",
};

type Plan = {
  id: "starter" | "growth" | "pro";
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$39",
    tagline: "One location, getting started with Google reviews.",
    features: [
      "1 location",
      "Google Business Profile reviews",
      "Up to 50 AI-drafted replies / month",
      "One-click copy to post yourself",
      "Daily email digest",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$79",
    tagline: "The most popular plan for an active single location.",
    features: [
      "1 location",
      "Google + Facebook reviews",
      "Up to 150 AI-drafted replies / month",
      "One-click direct posting to Google & Facebook",
      "Daily email digest",
    ],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    tagline: "Multiple locations, plus autopilot and SMS alerts.",
    features: [
      "Up to 3 locations",
      "Google + Facebook + Yelp (draft-only)",
      "Unlimited AI-drafted replies",
      "Autopilot for 4–5 star reviews (opt-in)",
      "SMS alerts for reviews below 3 stars",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Pricing that makes sense for one location or three.
        </h1>
        <p className="mt-3 text-slate-600">
          Every plan includes a 14-day free trial. No contract — cancel
          anytime. Annual billing saves 20%.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col gap-4 rounded-xl border p-6 shadow-sm ${
              plan.highlighted
                ? "border-brand-500 ring-2 ring-brand-500"
                : "border-slate-200"
            }`}
          >
            {plan.highlighted && (
              <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                Most popular
              </span>
            )}
            <h2 className="text-xl font-semibold text-slate-900">
              {plan.name}
            </h2>
            <p className="text-sm text-slate-600">{plan.tagline}</p>
            <p className="text-4xl font-bold text-brand-600">
              {plan.price}
              <span className="text-base font-normal text-slate-500">
                /mo
              </span>
            </p>
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden className="text-brand-500">
                    &#10003;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/sign-up?plan=${plan.id}`}
              className={`mt-auto rounded-lg px-4 py-2 text-center text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Start free trial
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h2 className="font-semibold text-slate-900">
          Managing reviews for more than 3 locations, or an agency serving
          multiple businesses?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          The Agency plan starts at $249/mo plus $30/mo per additional
          location, with a white-label dashboard. Email{" "}
          <a
            href="mailto:pmcgrew82@gmail.com"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            pmcgrew82@gmail.com
          </a>{" "}
          and we&apos;ll get you set up.
        </p>
      </div>
    </main>
  );
}
