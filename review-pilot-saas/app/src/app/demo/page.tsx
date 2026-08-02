import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a demo — ReviewPilot AI",
};

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">
        See ReviewPilot AI on your own reviews
      </h1>
      <p className="mt-4 text-slate-600">
        In a 15-minute call, we&apos;ll pull a couple of your business&apos;s
        actual Google reviews and show you the AI-drafted replies live — no
        generic sample data. You&apos;ll see exactly what your customers
        would see before you decide anything.
      </p>
      <a
        href="mailto:pmcgrew82@gmail.com?subject=Book%20a%20ReviewPilot%20AI%20demo&body=Business%20name%3A%0ABest%20times%20this%20week%3A"
        className="mt-8 inline-block rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600"
      >
        Email us to grab a time
      </a>
      <p className="mt-3 text-sm text-slate-500">
        We reply within one business day.
      </p>
    </main>
  );
}
