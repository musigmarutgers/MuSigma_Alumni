# Claude Build Spec: PMD Mu Sigma Alumni Association Site

## Mission

Rebuild this repository as a polished public website for the PMD Mu Sigma Alumni Association. The site should feel credible, modern, and useful for alumni who want to reconnect, support the chapter, understand impact, and find events.

This is a full rebuild from the current plain HTML/CSS/JS prototype into a Next.js application. The current prototype can be used for visual/content reference, but do not preserve its file structure.

## Non-Negotiable Decisions

- Use Next.js App Router with TypeScript.
- Target Vercel hosting.
- Use public pages only. Do not add login, authentication, member-only routes, private feeds, or protected alumni data in v1.
- Add live donation tracking through server-side API routes, Stripe Checkout, Stripe webhooks, and KV/Redis storage.
- Use polished sample content across the site, but mark all real-world values with clear TODO labels.
- Do not expose donor emails, customer IDs, billing details, exact donation amounts, private donor names, or Stripe internals in public API responses.
- Do not show donor tiers publicly. The donor wall should show opt-in donor display names only.
- Treat the website tracker as public recognition/progress display. Official accounting remains in Stripe.

## Recommended Tech Stack

- Next.js App Router
- TypeScript
- React components
- Plain CSS via `app/globals.css` and component class names
- Stripe Node SDK
- Upstash Redis or Vercel Marketplace Redis-compatible KV storage
- Vercel deployment

Avoid adding Tailwind, shadcn/ui, authentication libraries, Prisma, a SQL database, or a CMS in this version. The goal is a clean, maintainable Vercel app with a small donation backend, not a full platform.

## Target Repository Shape

Replace the current root files with this structure:

```text
app/
  about/
    page.tsx
  alumni/
    page.tsx
  api/
    create-checkout-session/
      route.ts
    donation-summary/
      route.ts
    stripe-webhook/
      route.ts
  chapter/
    page.tsx
  events/
    page.tsx
  executive-board/
    page.tsx
  finance/
    page.tsx
  impact-fund/
    page.tsx
  newsletter/
    page.tsx
  pmd-open/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  CalloutBand.tsx
  DonationProgress.tsx
  DonationTierCard.tsx
  DonorWall.tsx
  EventCard.tsx
  Footer.tsx
  Header.tsx
  HeroCarousel.tsx
  ImpactStats.tsx
  SectionHeader.tsx
  UpdateCard.tsx
lib/
  donation-store.ts
  donations.ts
  site-content.ts
  stripe.ts
public/
  hero-slide-1.jpeg
  hero-slide-2.jpeg
  hero-slide-3.jpeg
  hero-slide-4.jpeg
  hero-slide-5.jpeg
  leader-placeholder.svg
.env.example
next.config.ts
package.json
tsconfig.json
README.md
```

Move the existing image files into `public/`. The current prototype references `assets/...`, but the repository does not contain an `assets/` folder. Fix this by using `/hero-slide-1.jpeg`, `/leader-placeholder.svg`, etc. from `public/`.

## Package Scripts

Create `package.json` with at least:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Use the latest stable Next.js and React versions available when implementing. Keep dependencies minimal:

- `next`
- `react`
- `react-dom`
- `typescript`
- `stripe`
- Redis/KV client package, preferably `@upstash/redis` if using Upstash Redis

## Environment Variables

Create `.env.example` with placeholders:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_TODO
STRIPE_WEBHOOK_SECRET=whsec_TODO
STRIPE_SUCCESS_URL=http://localhost:3000/impact-fund?donation=success
STRIPE_CANCEL_URL=http://localhost:3000/impact-fund?donation=cancelled

# Stripe price IDs for recurring tiers, if using pre-created Stripe Prices
STRIPE_PRICE_MONTHLY_5=price_TODO
STRIPE_PRICE_MONTHLY_10=price_TODO
STRIPE_PRICE_MONTHLY_25=price_TODO
STRIPE_PRICE_MONTHLY_50=price_TODO
STRIPE_PRICE_MONTHLY_100=price_TODO

# Redis / KV
UPSTASH_REDIS_REST_URL=https://TODO.upstash.io
UPSTASH_REDIS_REST_TOKEN=TODO

# Public site settings
NEXT_PUBLIC_SITE_NAME=PMD Mu Sigma Alumni Association
NEXT_PUBLIC_ANNUAL_DONATION_GOAL_CENTS=2500000
```

Do not prefix Stripe secret keys or Redis tokens with `NEXT_PUBLIC_`.

## Site Navigation

Use this top-level navigation:

- Home: `/`
- Impact Fund: `/impact-fund`
- Events: `/events`
- Chapter: `/chapter`
- Alumni: `/alumni`
- Finance: `/finance`
- Newsletter: `/newsletter`
- About: `/about`

Link to these secondary pages from cards/buttons rather than forcing them into the main nav:

- PMD Open: `/pmd-open`
- Executive Board: `/executive-board`

The header should be responsive, keyboard accessible, and usable on mobile. Use a mobile menu button on small screens.

## Global Content Rules

- Use the organization name: `PMD Mu Sigma Alumni Association`.
- Use sample copy that sounds realistic and polished.
- Prefix real-world placeholders with `TODO:` so they are easy to find.
- Use generic role emails, for example `TODO:alumni@musigma.org`, not personal emails.
- If 501(c)(3) status is referenced, write it as pending or TODO unless confirmed. Do not imply donations are tax-deductible.
- For donor names, alumni spotlights, E-board bios, family tree content, and new member highlights, use clearly fictional/sample names and label the section with a TODO note that real people need consent before publication.

## Page Requirements

### Home: `app/page.tsx`

Purpose: Make the association feel legitimate, active, and worth supporting.

Include:

- Hero section with carousel or rotating background using the existing hero images.
- Headline: `PMD Mu Sigma Alumni Association`
- Mission line focused on impact, brotherhood, alumni connection, and chapter sustainability.
- Primary CTAs:
  - `Support the Impact Fund` linking to `/impact-fund`
  - `Join the Alumni Network` linking to a TODO external form URL
- Impact stats using sample numbers:
  - `TODO: 350+ alumni`
  - `TODO: $18,500 raised this year`
  - `TODO: 1,200 service hours supported`
  - `TODO: 12 scholarships or chapter initiatives funded`
- Rotating or grid content blocks:
  - Upcoming alumni event
  - Latest newsletter highlight
  - Recent chapter achievement
  - 501(c)(3) / governance status update with careful TODO wording
- Sponsor or wishlist banner:
  - Explain alumni can support chapter needs through a wishlist instead of sending money.
  - CTA to `TODO: wishlist URL`.

### Impact Fund: `app/impact-fund/page.tsx`

Purpose: Convert alumni goodwill into recurring support.

Include:

- What Is the PMD Impact Fund: 2 or 3 short paragraphs explaining support for chapter operations, philanthropy, scholarships, and sustainability.
- Monthly giving tiers:
  - `$5 Contributor`
  - `$10 Sustainer`
  - `$25 Impact Member` as the visually recommended default
  - `$50 Builder`
  - `$100 Legacy Circle`
  - Custom amount
- One-time donation option.
- Each donation button should call `POST /api/create-checkout-session`, not hardcode a Stripe secret or direct secret URL in the client.
- `DonationProgress` component that fetches `/api/donation-summary`.
- `DonorWall` component that displays opt-in donor display names only.
- Why Monthly Giving Matters section:
  - Predictability
  - Alumni ownership
  - Chapter longevity
- Transparency snapshot using bullets or a simple visual:
  - Chapter operations
  - Philanthropy
  - Scholarships
  - Leadership development
  - Emergency/sustainability reserve
- Testimonials using sample quotes and TODO labels.

### Events: `app/events/page.tsx`

Purpose: Keep alumni engaged before they drift away.

Include:

- Calendar CTA linking to `TODO: Google Calendar public URL`.
- Event cards for:
  - Alumni Weekend
  - Homecoming gathering
  - PMD Open
  - Chapter service showcase
- Each event card should include date, location, description, and RSVP CTA with TODO links.
- Link prominently to `/pmd-open`.
- Include email reminder signup CTA linking to `TODO: alumni network form URL`.

### PMD Open: `app/pmd-open/page.tsx`

Purpose: Promote the signature annual alumni golf outing.

Include:

- Overview of the PMD Open as an annual alumni golf outing.
- Event details with TODO date, location, format, schedule, and registration deadline.
- Benefiting organization(s) with TODO placeholder.
- Registration and sponsorship CTAs linking to TODO forms.
- Past results:
  - Funds raised
  - Photos
  - Sponsors
- Small gallery/slideshow using existing images as placeholders.
- Save-the-date signup CTA.

### Chapter: `app/chapter/page.tsx`

Purpose: Show chapter life, accountability, and ongoing student/alumni connection.

Include:

- Chapter feed light version:
  - Photo/update cards
  - Alumni Chair update
  - Chapter announcement
  - Philanthropy recap
  - Brotherhood highlight
- Chapter dashboard snapshot:
  - Leadership overview
  - Service initiatives
  - Brotherhood events
  - Recruitment efforts
  - Awards/recognition
- Social highlights section:
  - Use curated cards and a TODO Instagram link.
  - Do not embed raw Instagram by default.
- New member highlights preview:
  - Use sample names and class photo placeholder.
  - Include TODO consent note.

### Alumni: `app/alumni/page.tsx`

Purpose: Help alumni reconnect and preview future engagement features.

Include:

- Join the Alumni Network CTA linking to TODO form/groupchat/email list.
- Alumni spotlight cards using sample content and TODO consent note.
- Family trees preview:
  - Explain that Big/Little lineage trees are planned.
  - Show static sample preview only.
  - Include filters as non-functional visual placeholders: year, profession, location.
- Class connections section.
- CTA to submit alumni updates through TODO form.

### Finance: `app/finance/page.tsx`

Purpose: Build trust through non-sensitive transparency.

Include:

- High-level financial overview with sample budget categories.
- Impact Fund tracker using the same `DonationProgress` component or a finance-specific summary.
- Donor recognition section:
  - Opt-in display names only.
  - No exact amounts.
  - No tiers.
- Explain how alumni funds are allocated.
- State that official accounting and receipts remain in Stripe or official association records.
- Include TODO language for final tax/legal status.

### Newsletter: `app/newsletter/page.tsx`

Purpose: Central archive and signup.

Include:

- Newsletter signup CTA linking to TODO Mailchimp/Substack/Google Form URL.
- Archive cards for sample issues.
- Highlight categories:
  - Alumni spotlights
  - Chapter wins
  - Upcoming events
  - Impact Fund updates
- CTA to submit alumni news.

### Executive Board: `app/executive-board/page.tsx`

Purpose: Leadership credibility.

Include:

- E-board bios using sample names and leader placeholder image.
- Roles and responsibilities.
- Chairmen/org chart style section.
- Generic role-based contact emails with TODO domain.
- President's Message:
  - Vision
  - Goals and progress
  - Alumni involvement ask
- TODO consent note before replacing sample bios.

### About / Governance: `app/about/page.tsx`

Purpose: Legitimacy and contact.

Include:

- Alumni Association mission.
- Governance structure.
- Board of Trustees placeholder if applicable.
- Constitution/bylaws PDF link placeholder.
- Contact section with role-based email placeholders.
- Short FAQ:
  - How do I join the alumni network?
  - How do I support the Impact Fund?
  - Are contributions tax-deductible? Use careful TODO wording.
  - How do I update my contact information?

## Data And Content Organization

Create `lib/site-content.ts` and keep non-sensitive sample content there where practical:

- Navigation items
- Impact stats
- Event cards
- Newsletter issues
- Board sample bios
- Update cards
- Finance categories
- CTA external URLs

Use TODO placeholders in this file so future editors know where to replace sample content.

## Donation API Details

### `POST /api/create-checkout-session`

Location: `app/api/create-checkout-session/route.ts`

Request body:

```ts
type CreateCheckoutSessionRequest = {
  mode: "payment" | "subscription";
  tier: "5" | "10" | "25" | "50" | "100" | "custom";
  amountCents?: number;
  donorDisplayName?: string;
  showOnDonorWall: boolean;
};
```

Behavior:

- Validate the request body server-side.
- For fixed monthly tiers, prefer Stripe Price IDs from environment variables.
- For one-time or custom donations, create Checkout line items with safe server-side validation.
- Minimum custom donation: 100 cents.
- Maximum custom donation: 1000000 cents unless the site owner changes it.
- Include metadata on the Checkout Session:
  - `campaign: "impact_fund"`
  - `tier`
  - `showOnDonorWall`
  - `donorDisplayName` only if the donor opted in and supplied one
- Redirect success and cancel URLs from env vars.
- Return `{ url: string }`.
- Never return the Stripe secret key, customer object, or internal metadata beyond the Checkout URL.

### `POST /api/stripe-webhook`

Location: `app/api/stripe-webhook/route.ts`

Behavior:

- Read the raw request body.
- Verify the Stripe signature with `STRIPE_WEBHOOK_SECRET`.
- Ignore events that fail verification.
- Store processed event IDs in Redis/KV so duplicate webhook deliveries are not counted twice.
- Handle at minimum:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `charge.refunded`
  - `payment_intent.payment_failed` as a no-op/loggable event
  - `customer.subscription.deleted` as a no-op/loggable event unless needed later
- On successful one-time or recurring payment, update:
  - total raised in cents
  - monthly donor count when subscription starts or recurring invoice succeeds
  - last updated timestamp
  - opt-in donor display names
- On refunds, subtract refunded amounts from totals where possible.
- Do not create a public donor-wall entry unless `showOnDonorWall` is true and `donorDisplayName` is present.

### `GET /api/donation-summary`

Location: `app/api/donation-summary/route.ts`

Response:

```ts
type DonationSummaryResponse = {
  totalRaisedCents: number;
  annualGoalCents: number;
  monthlyDonorCount: number;
  lastUpdated: string | null;
  donors: Array<{
    displayName: string;
  }>;
};
```

Rules:

- Public-safe response only.
- Do not include emails, exact donor amounts, tiers, Stripe IDs, customer IDs, or billing details.
- If Redis/KV is unavailable, return a safe fallback with sample/TODO values and a visible non-crashing UI state.

## Redis / KV Key Design

Use simple, explicit keys:

```text
donations:totalRaisedCents
donations:annualGoalCents
donations:monthlyDonorCount
donations:lastUpdated
donations:donorWall
stripe:processedEvents
```

`donations:donorWall` should store only opt-in display names and minimal metadata needed for ordering. Do not store emails or full Stripe objects.

## Frontend Donation Components

### `DonationTierCard`

Props should include:

- `amountLabel`
- `tierName`
- `description`
- `mode`
- `tier`
- `isRecommended`

On click:

- Prompt for optional public display name only if the donor wants to appear on the donor wall.
- Send request to `/api/create-checkout-session`.
- Redirect browser to returned Stripe Checkout URL.
- Show loading and error states.

### `DonationProgress`

Behavior:

- Fetch `/api/donation-summary`.
- Show total raised and goal progress.
- Show monthly donor count.
- Show last updated timestamp.
- Handle loading and error states gracefully.

### `DonorWall`

Behavior:

- Fetch or receive donation summary data.
- Show opt-in display names only.
- If no donors exist, show a friendly placeholder: `Be one of the first alumni to opt into the donor wall.`
- Do not show amounts or tiers.

## Design Direction

- Professional alumni association tone.
- Clean, credible, responsive layout.
- Use the existing chapter photos as meaningful hero/gallery assets.
- Avoid a cluttered student-club feel.
- Use cards for repeated items only, such as event cards, update cards, board bios, donation tiers, and newsletter issues.
- Keep CTAs visually clear.
- Make mobile nav and donation CTAs easy to use.
- Ensure text does not overflow on mobile.

## Accessibility Requirements

- Use semantic headings in order.
- Use descriptive alt text for images.
- Buttons must be real `<button>` elements when they trigger actions.
- Links must be real `<a>` or Next `<Link>` elements when they navigate.
- Ensure keyboard focus states are visible.
- Do not rely on color alone to communicate donation status or CTAs.
- Respect `prefers-reduced-motion` for carousel or animated elements.

## README Update

Replace the existing README with project setup instructions:

- What the site is.
- How to install dependencies.
- How to run locally.
- How to configure `.env.local`.
- How to test Stripe locally with Stripe CLI.
- How to deploy to Vercel.
- Reminder that sample personal data must be replaced only with consent.

## Test Plan For Claude To Run

After implementation, run:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Manual checks:

- Every public route renders:
  - `/`
  - `/impact-fund`
  - `/events`
  - `/pmd-open`
  - `/chapter`
  - `/alumni`
  - `/finance`
  - `/newsletter`
  - `/executive-board`
  - `/about`
- Top nav and secondary links work.
- Mobile menu works.
- Images load from `public/`.
- No console errors on page load.
- Placeholder external links are clearly marked as TODO and do not pretend to be real.

Stripe test checks:

- Create one-time donation session in test mode.
- Create monthly donation session in test mode.
- Trigger webhook events through Stripe CLI.
- Confirm duplicate webhook events do not double-count totals.
- Confirm refund event subtracts from total where possible.
- Confirm `/api/donation-summary` never exposes email, Stripe ID, customer ID, exact amount, or donor tier.
- Confirm opt-in donor display names appear.
- Confirm private/anonymous donors count toward totals but do not appear on donor wall.

## Acceptance Criteria

The build is complete when:

- The repo runs as a Next.js App Router TypeScript project.
- All planned public pages exist and look intentionally designed.
- Donation checkout is initiated server-side.
- Stripe webhooks update Redis/KV donation summary data.
- The public donation summary and donor wall obey privacy rules.
- There is no authentication or protected route logic.
- The project builds successfully for Vercel.
- README and `.env.example` make local setup understandable.

