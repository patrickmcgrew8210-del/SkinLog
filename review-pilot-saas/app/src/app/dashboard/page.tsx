export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Inbox</h1>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="font-medium text-slate-700">
          No reviews yet — Google Business Profile connection is coming very
          soon.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          In the meantime, email{" "}
          <a
            href="mailto:pmcgrew82@gmail.com"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            pmcgrew82@gmail.com
          </a>{" "}
          with a link to your Google Business Profile and we&apos;ll get your
          first drafts moving by hand while automatic sync finishes rolling
          out.
        </p>
      </div>
    </div>
  );
}
