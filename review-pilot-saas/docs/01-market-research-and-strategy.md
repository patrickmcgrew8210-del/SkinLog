# ReviewPilot AI — Phase 1: Market Research & Strategy

## 1. What we're building

**ReviewPilot AI** monitors a local business's online reviews (Google Business
Profile first, Facebook and Yelp next), drafts a personalized reply in the
business's own voice using an LLM, and lets the owner approve it in one tap
from their phone — or, once they trust it, flip on autopilot for positive
reviews while still routing every 1–3★ review to a human for approval.

One job, done extremely well, for a price a solo operator doesn't have to
think twice about.

## 2. Market research

- Reviews are the primary trust signal for local purchase decisions. For the
  categories we're targeting (dental, HVAC, roofing, med spa, plumbing,
  restaurants), Google Business Profile (GBP) reviews sit directly in the
  Google Maps/Local Pack result — the first thing a prospective customer sees.
- Owner responses measurably increase conversion and are read by prospective
  customers almost as often as the review itself. Google has also confirmed
  review recency/engagement is a local-ranking input, so a business that
  responds promptly and consistently gets a small but real SEO lift.
- The actual behavior on the ground: most small business owners either (a)
  ignore reviews entirely, (b) reply days/weeks later once a bad review has
  already done damage, or (c) copy-paste the same three canned lines, which
  reads as insincere and can itself become a complaint ("this business doesn't
  even read what people write").
- Root cause is not lack of desire — it's time. Owners in these trades work
  with their hands most of the day; review management competes with running
  the business, not with other marketing software.
- Market size: roughly 33M small businesses in the US; the specific local-
  service categories we're targeting (home services, dental/medspa, food
  service) alone represent several million locations that actively collect
  reviews on GBP. We don't need a large share of this — 150–300 paying
  customers reaches the $10K–$25K MRR range.

## 3. Competitor analysis

| Competitor | Focus | Price | Gap we exploit |
|---|---|---|---|
| Podium | Full "customer communication" suite (texting, payments, reviews) | $300–$500+/mo, annual contract, sales call required | Massive overkill and overspend for a business that just wants replies handled |
| Birdeye | Enterprise reputation + marketing platform | $300–$1000+/mo, sales-led | Same — bloated, expensive, long onboarding |
| ReviewTrackers / Reputation.com | Enterprise reputation monitoring/analytics | Custom/enterprise pricing | Built for multi-location brands and agencies, not a single dentist's office |
| NiceJob / Grade.us | Review *generation* (asking for reviews), light response tools | $75–$150/mo | Response quality is templated, not personalized to voice; generation is the primary feature, response is an afterthought |
| Doing it manually / generic ChatGPT | Free | $0 | Time cost, inconsistent voice, easy to forget, no monitoring/alerting, no audit trail |

**The gap:** nobody at the low end is laser-focused on *writing a reply that
sounds like the actual owner* and getting it approved in one tap. Existing
tools either bundle review-response into a $300+/mo suite the SMB doesn't need,
or produce generic templated text. There is room for a $39–$149/mo tool that
does one thing exceptionally well, self-serve, no contract, no sales call.

## 4. Pricing strategy

| Plan | Price | Locations | Platforms | Volume | Posting |
|---|---|---|---|---|---|
| Starter | $39/mo | 1 | Google only | 50 AI drafts/mo | Copy-and-paste (one-click copy, opens the review to paste) |
| Growth | $79/mo | 1 | Google + Facebook | 150 AI drafts/mo | One-click direct posting where API allows |
| Pro | $149/mo | up to 3 | Google + Facebook + Yelp (draft-only) | Unlimited | Autopilot for 4–5★, human approval required for 1–3★, SMS alerts |
| Agency | $249/mo + $30/location | Unlimited | All | Unlimited | White-label dashboard for agencies managing multiple SMB clients |

- Annual billing: 20% discount (2.4 months free) — improves cash flow and
  reduces churn for a solo founder who can't do heavy retention work.
- No contracts, cancel anytime — removes the biggest objection for a
  price-sensitive, low-trust first-time buyer.
- 14-day free trial, credit card required (filters for intent, reduces free-
  tier support burden common in solo-founder SaaS).
- Path to $10K MRR: ~130 customers at a $79 blended average, or ~65 at Pro
  pricing. At a realistic 3–5 self-serve signups/week once outbound + SEO are
  running, this is a 12–18 month target, not a moonshot.

## 5. Unique selling proposition

> **"Replies that sound like you, approved in one tap — not another bloated
> reputation suite you didn't ask for."**

Three pillars:
1. **Voice, not templates.** Onboarding captures writing-style samples (past
   replies, website About page, a short tone questionnaire) so every draft
   reads like the actual owner/manager wrote it.
2. **One job, done well.** No CRM, no texting platform, no upsells — just
   monitoring, drafting, and approving review replies.
3. **Human stays in control of risk.** Negative reviews are never auto-posted;
   they're flagged and drafted for approval, so the owner keeps the upside of
   automation without the downside of a bot saying the wrong thing publicly.

## 6. Customer persona

**"Dana," Practice Manager / Owner-Operator**
- Runs or manages 1–3 locations: a dental practice, HVAC company, med spa,
  roofing company, or restaurant.
- Age 35–55, moderately tech-comfortable, checks business email/Google on
  their phone between appointments or jobs.
- Has 5–10 minutes a day for anything "marketing," not more.
- Knows reviews matter, feels guilty about the ones sitting unanswered for
  weeks, but doesn't have a system.
- Price-sensitive: comfortable at $39–$150/mo, will bounce off anything that
  requires a sales call or annual contract to even see pricing.
- Trust is earned through a fast, obvious "aha" — seeing a draft reply that
  actually sounds right, within minutes of signing up.

## 7. Why customers switch from competitors (or from doing nothing)

- **From Podium/Birdeye:** paying $300–1000/mo for a suite when they only
  ever use the review-reply feature. We're 70–90% cheaper for the one feature
  they actually value.
- **From NiceJob/Grade.us:** those tools ask customers *for* reviews well;
  they don't write *good* replies. Owners who are already satisfied with
  review volume but embarrassed by their reply backlog have no reason to stay.
- **From doing nothing / manual replies:** the switching cost is near zero
  (14-day trial, 10-minute setup, no contract) and the value is immediate and
  visible — a queue of ready-to-approve replies to reviews that have been
  sitting unanswered for weeks.
- **From copy-pasting into ChatGPT themselves:** we remove the manual review-
  copying and platform-hopping, keep style consistent automatically, monitor
  for new reviews without being asked, and provide an audit trail — genuinely
  saves the time they were trying to save by using ChatGPT in the first place.
