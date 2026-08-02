import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ReviewPilot AI",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: August 2, 2026</p>

      <div className="prose prose-slate mt-10 max-w-none">
        <p>
          This Privacy Policy explains what information ReviewPilot AI
          (&quot;we,&quot; &quot;us&quot;) collects, how we use it, and the
          choices you have. It applies to our website and dashboard
          (together, the &quot;Service&quot;).
        </p>

        <h2>1. Information we collect</h2>
        <ul>
          <li>
            <strong>Account information</strong>: name, email address, and
            business details you provide when you sign up.
          </li>
          <li>
            <strong>Connected platform data</strong>: when you connect a
            review platform (e.g., Google Business Profile, Facebook Pages)
            via OAuth, we receive an access token and the review content
            (author name as displayed publicly, star rating, review text,
            and timestamps) needed to generate and post replies. We request
            only the minimum permissions needed for that purpose.
          </li>
          <li>
            <strong>Voice profile data</strong>: sample replies or tone
            preferences you provide so that AI-generated drafts match your
            business&apos;s writing style.
          </li>
          <li>
            <strong>Usage data</strong>: which drafts you approve, edit, or
            skip, and basic product analytics (e.g., page views, feature
            usage) used to improve the Service.
          </li>
          <li>
            <strong>Billing data</strong>: our payment processor, Stripe,
            handles your payment card details directly — we do not store
            full card numbers on our own servers.
          </li>
        </ul>

        <h2>2. How we use information</h2>
        <p>We use the information above to:</p>
        <ul>
          <li>Detect new reviews and generate draft replies;</li>
          <li>Post approved replies (or, on autopilot, eligible 4–5 star replies) back to the connected platform;</li>
          <li>Operate billing, account management, and customer support;</li>
          <li>Send you transactional emails (e.g., daily digest of pending drafts, billing notices) and, if you opt in, SMS alerts for negative reviews;</li>
          <li>Improve the quality of AI-generated drafts and the Service generally.</li>
        </ul>
        <p>
          We do not sell your personal information or your business&apos;s
          review data to third parties.
        </p>

        <h2>3. Third-party service providers</h2>
        <p>
          We share information with service providers strictly as needed to
          operate the Service, including: our database and authentication
          provider, our AI model provider (used to generate reply drafts —
          review content and your voice profile are sent to generate each
          draft), our payment processor, our email/SMS delivery providers,
          and the review platforms you explicitly connect (Google, Meta,
          etc.). Each provider is contractually limited to using this data
          only to provide services to us.
        </p>

        <h2>4. Data retention</h2>
        <p>
          We retain your account and review/reply data for as long as your
          account is active, and for a reasonable period afterward to
          comply with legal obligations, resolve disputes, and enforce our
          agreements. You may request deletion of your account and
          associated data at any time by contacting us; we will delete data
          that we are not legally required to retain.
        </p>

        <h2>5. Security</h2>
        <p>
          Connected-platform access tokens are encrypted at rest. Access to
          production data is restricted to what is necessary to operate the
          Service. All data in transit is encrypted via HTTPS. No method of
          storage or transmission is 100% secure, and we cannot guarantee
          absolute security.
        </p>

        <h2>6. Your choices</h2>
        <ul>
          <li>You can disconnect a review platform at any time, which revokes our access to it.</li>
          <li>You can edit or delete your voice profile at any time.</li>
          <li>You can opt out of SMS alerts and adjust email frequency in your notification settings.</li>
          <li>You can request a copy of, or deletion of, your personal data by contacting us.</li>
        </ul>

        <h2>7. Children&apos;s privacy</h2>
        <p>
          The Service is intended for business use and is not directed to
          individuals under 18. We do not knowingly collect personal
          information from children.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material
          changes will be communicated by email or through the Service
          before they take effect.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about this policy, or requests to access or delete your
          data, can be sent to{" "}
          <a href="mailto:pmcgrew82@gmail.com">pmcgrew82@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
