# ReviewPilot AI — Phase 3: Product Requirements Document

## 1. Purpose

Define what must be built for a v1 launch capable of onboarding real paying
customers, monitored and maintained by one person.

## 2. Goals / Non-goals

**Goals (v1):**
- Connect a Google Business Profile location and detect new reviews within
  1 hour of posting.
- Generate an on-brand draft reply for every new review using the business's
  voice profile.
- Let the owner approve, edit-then-approve, or skip a draft from a mobile-
  friendly dashboard.
- Post approved replies back to Google automatically via the GBP API.
- Handle billing end-to-end via Stripe with zero manual invoicing.
- Send a daily digest email of pending drafts.

**Non-goals (v1 — explicitly deferred):**
- Facebook and Yelp integration (designed for in architecture, built in v1.1).
- Autopilot auto-posting without human approval (v1.2, Pro plan only, 4–5★
  only, opt-in).
- Multi-location/agency white-label dashboard (v1.3).
- Review *solicitation* (asking customers to leave reviews) — deliberately
  out of scope; that's a different, already-crowded product category
  (NiceJob etc.), and mixing it in dilutes the USP.

## 3. User stories

1. As a business owner, I can sign up, connect my Google Business Profile,
   and complete a voice-profile questionnaire in under 10 minutes.
2. As a business owner, I receive a daily email when new reviews have
   AI-drafted replies waiting.
3. As a business owner, I can open the dashboard on my phone, read a draft
   next to the original review, and approve it in one tap.
4. As a business owner, I can edit a draft before approving if it's not
   quite right, and the edit is saved so future drafts improve.
5. As a business owner, I can see at a glance: average rating trend, reviews
   awaiting response, and average response time.
6. As a staff member, I can approve/edit replies but cannot see or change
   billing.
7. As a business owner, I can upgrade/downgrade/cancel my plan myself via
   the Stripe customer portal without contacting support.
8. As a business owner, if a 1–2★ review comes in, I'm alerted the same day
   (email; SMS on Pro) and the draft explicitly acknowledges the issue rather
   than using a generic positive-tone template.

## 4. Functional requirements

- **Onboarding**: signup (email or Google) → connect GBP via OAuth → select
  location(s) → voice profile setup (paste 3–5 past replies, or answer a
  4-question tone questionnaire if none exist) → Stripe Checkout (14-day
  trial, card required) → land on dashboard.
- **Review polling**: scheduled job checks each connected location for
  reviews newer than the last seen `posted_at`, hourly.
- **Draft generation**: on new review detected, generate a draft within 2
  minutes; flag for mandatory review if rating ≤ 3, or if content matches
  flagged categories (legal threat, health/safety claim, refund request).
- **Approval workflow**: Approve (posts to Google immediately),
  Edit-then-Approve (saves edited text, posts, and stores the diff as
  training signal), Skip (marks review as intentionally not replied to,
  removes from queue).
- **Posting**: approved replies post via the GBP API; on API failure, retry
  with backoff (3 attempts) then surface a "needs manual posting" state with
  a copy-to-clipboard fallback.
- **Billing**: Stripe Checkout for signup, Customer Portal for self-service
  changes, webhook-driven plan/feature gating, dunning on failed payment.
- **Notifications**: daily digest email (configurable to immediate); SMS
  alert for 1–2★ reviews on Pro plan.
- **Analytics dashboard**: rating trend (30/90 day), reviews-awaiting-reply
  count, average time-to-reply, approve-vs-edit rate.

## 5. Non-functional requirements

- New-review detection latency: ≤ 60 minutes (polling interval).
- Draft generation latency: ≤ 2 minutes from detection.
- Dashboard must be fully usable on a 375px-wide mobile viewport.
- 99.5% uptime target for the dashboard/API (Vercel/Supabase SLAs comfortably
  cover this without extra work).
- No plaintext storage of OAuth tokens or API keys.
- All customer-facing copy in the product must never claim an auto-posted
  reply is human-written; transparency is a trust requirement, not just an
  ethics preference, given these are public-facing business communications.

## 6. Success metrics (v1 launch)

- Activation: % of signups that connect a GBP location within 24 hours
  (target ≥ 70%).
- Time-to-first-draft: median time from signup to first AI draft generated
  (target < 30 minutes).
- Approval rate: % of drafts approved as-is vs. edited vs. skipped (target
  ≥ 60% approved as-is by week 4 of a customer's usage — signals voice
  profile is well-tuned).
- Trial-to-paid conversion (target ≥ 25%, reasonable for a card-required
  trial in this price band).
- Monthly logo churn (target < 5%/mo — reviews are a recurring need, and
  losing the habit of checking reviews is the main churn risk, mitigated by
  the digest email keeping the product "present" without login).

## 7. Out-of-scope risks acknowledged

- Yelp does not offer a public API for posting owner responses — v1 treats
  Yelp (when added) as **read + draft + copy-to-clipboard only**, never
  auto-post. This is a platform constraint, not a product gap, and is stated
  plainly in marketing copy to avoid overpromising.
- Google/Meta API quota or policy changes are a single point of failure for
  the core loop; mitigated by monitoring (Sentry alerts on repeated API
  failures) and a manual copy-paste fallback path that keeps the product
  usable even if a given API integration temporarily breaks.
