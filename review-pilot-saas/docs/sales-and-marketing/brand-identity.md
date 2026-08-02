# Brand Identity — ReviewPilot AI

## Name

**ReviewPilot AI** — "pilot" signals autopilot/control (you're still flying
the plane; it just helps), and pairs naturally with the approve/autopilot
product mechanic.

## Logo

Two real, usable SVG assets are checked in at `review-pilot-saas/brand/`:

- `icon.svg` — square mark (star badge with a checkmark), used as the
  favicon/app icon. Also copied to `app/src/app/icon.svg`, where Next.js's
  file-based convention automatically serves it as the site favicon.
- `logo.svg` — full lockup (icon + wordmark + tagline) for the landing page
  header, sales deck, and email signature.

**Concept:** a five-pointed star (the review rating) with a checkmark badge
overlapping its corner (the one-click approval). The mark tells the whole
product story without needing the wordmark next to it — useful for a small
favicon or app icon where text isn't legible.

## Color palette

Defined in `app/tailwind.config.ts` as the `brand` scale plus semantic
status colors used throughout the dashboard (inbox approve/skip states,
alerts):

| Token | Hex | Usage |
|---|---|---|
| `brand-50` | `#eef6ff` | Light backgrounds, hover states |
| `brand-100` | `#d9eaff` | Badges, subtle highlights |
| `brand-500` | `#2f6fed` | Primary actions, links, logo |
| `brand-600` | `#2457c9` | Primary action hover state |
| `brand-700` | `#1c439c` | Headlines on dark sections, logo badge accent |
| `slate-*` (Tailwind default) | — | All body text and neutral backgrounds |
| `success` (green-600, `#16a34a`) | — | Approved reply state |
| `warning` (amber-500, `#f59e0b`) | — | Pending / needs-review state |
| `danger` (red-600, `#dc2626`) | — | Flagged / negative-review state |

Rule of thumb: brand blue is reserved for actions and identity, never for
status. Status colors (success/warning/danger) are reserved for the
dashboard's review-state indicators and never used decoratively — this
keeps them meaningful at a glance once the Inbox UI (Task 10) is built.

## Voice

Direct, plain-spoken, a little wry — never corporate-jargon-heavy. Write
the way you'd explain the product to a business owner across a counter, not
the way a reputation-management enterprise vendor would write a datasheet.
Always name the limitation (Yelp can't be auto-posted, negative reviews
always need approval) instead of glossing over it — specificity about
limits is itself a trust signal for a skeptical, price-sensitive buyer.
