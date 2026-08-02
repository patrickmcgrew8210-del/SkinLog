# Onboarding Flow — ReviewPilot AI

Two versions: the **target self-serve flow** (what Task 8's dashboard
should ultimately deliver) and the **concierge flow** for the first
customers, usable before Google OAuth/GBP integration (Task 5-6) is live.
Selling concierge-first is a deliberate, common early-stage move: it lets
you take money and prove the value proposition manually while the
self-serve product is still being finished.

## Concierge onboarding (use this today, for customers #1–10)

1. **Close the sale** (via demo call or cold outreach reply) and collect
   payment directly via a Stripe Payment Link (no code needed — create one
   from the Stripe Dashboard once your Stripe account exists; see
   `GO-LIVE-CHECKLIST.md`).
2. **Collect voice-profile input manually**: send a short form (Google
   Form or even a plain email with 4 questions) asking for 3–5 past review
   replies, or answers to: "How formal is your tone?", "Do you sign off
   with a name?", "Anything you never want said publicly?", "One phrase
   that sounds like you."
3. **Get their Google Business Profile listing URL.**
4. **Generate drafts manually** using the Claude API/console with the
   voice profile as a system prompt (or, once Task 9 ships, using the real
   `generate-draft` function directly) for each new review, on a daily
   check-in cadence.
5. **Send drafts for approval** via email or a shared doc; post approved
   replies to Google yourself on the client's behalf, or have them do it in
   one copy-paste from your email.
6. **Weekly check-in email**: reviews received, replies posted, ratings
   trend — this is also free proof-of-value material for testimonials once
   you're ready to publish real ones on the landing page.

This flow does not scale past roughly 10-15 customers, which is exactly
the point — it should hurt enough by customer #10 that finishing the
self-serve product (Tasks 5-11) becomes the obvious next investment of
time.

## Target self-serve onboarding (Tasks 4, 5, 8, 9 combined)

1. **Sign up** — email/password or Google sign-in.
2. **Connect Google Business Profile** — OAuth consent screen, select the
   correct location if the account manages more than one.
3. **Voice profile setup** — paste 3-5 past replies, or answer a 4-question
   tone questionnaire if the business has no reply history yet.
4. **Plan selection** — Stripe Checkout, 14-day trial, card required.
5. **Land on the Inbox** — if reviews already exist, the first drafts are
   generated within minutes so the "aha moment" happens before the user has
   time to get distracted and leave.
6. **First approval** — a short one-time tooltip walkthrough on the first
   draft only (approve / edit-then-approve / skip), then out of the way
   permanently — no ongoing hand-holding UI once the pattern is learned.

Activation success is defined in the PRD as: GBP connected within 24 hours
of signup, first draft generated within 30 minutes of connecting.
