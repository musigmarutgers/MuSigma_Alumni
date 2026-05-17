# PMD Mu Sigma Alumni Association Website

Public alumni association website built with Next.js App Router, TypeScript, Stripe Checkout, and Supabase-backed donation tracking for Vercel.

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill in the TODO values:

```bash
cp .env.example .env.local
```

Required services:

- Stripe secret key and webhook signing secret
- Stripe recurring price IDs, if using pre-created prices for monthly tiers
- Supabase project URL, publishable key, and secret key

Never expose Stripe secret keys or Supabase secret keys with `NEXT_PUBLIC_`.

## Supabase Setup

Run the SQL in `supabase/schema.sql` from the Supabase SQL Editor before testing live donation tracking.

For the current Supabase dashboard:

- `Project URL` should look like `https://YOUR_PROJECT_REF.supabase.co`
- `Publishable key` goes in `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `Secret key` goes in `SUPABASE_SECRET_KEY`

The app uses the secret key only from server-side API routes. Public visitors never receive it.

## Stripe Testing

Use Stripe test mode and the Stripe CLI to forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Then create one-time and monthly test donations from the Impact Fund page. The public donor wall only displays opt-in donor names and never displays exact amounts, tiers, emails, customer IDs, or billing details.

## Deployment

Deploy to Vercel, set the same environment variables in the Vercel project settings, and configure the live Stripe webhook endpoint:

```text
https://YOUR_DOMAIN/api/stripe-webhook
```

Subscribe the Stripe endpoint to:

- `checkout.session.completed`
- `invoice.payment_succeeded`
- `charge.refunded`
- `refund.created`
- `payment_intent.payment_failed`
- `customer.subscription.deleted`

## Content Safety

The site currently uses polished sample content and TODO placeholders. Replace sample board members, donor names, alumni spotlights, new member highlights, photos, emails, event dates, and financial stats only after the people and organization have approved publication.
