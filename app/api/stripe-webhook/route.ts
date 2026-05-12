import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  hasProcessedEvent,
  markProcessedEvent,
  recordDonationPayment,
  recordMonthlyDonor,
  subtractRefundedAmount
} from "@/lib/donation-store";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type MetadataRecord = Record<string, string | undefined>;

function optInDisplayName(metadata: MetadataRecord): string | undefined {
  const optedIn = metadata.showOnDonorWall === "true";
  const displayName = metadata.donorDisplayName?.trim();

  return optedIn && displayName ? displayName.slice(0, 80) : undefined;
}

async function metadataFromSubscription(stripe: Stripe, invoice: Stripe.Invoice): Promise<MetadataRecord> {
  const invoiceMetadata = invoice.metadata as MetadataRecord;
  const subscriptionRef = (invoice as unknown as { subscription?: string | { metadata?: MetadataRecord } }).subscription;

  if (subscriptionRef && typeof subscriptionRef === "object" && subscriptionRef.metadata) {
    return { ...subscriptionRef.metadata, ...invoiceMetadata };
  }

  if (typeof subscriptionRef === "string") {
    const subscription = await stripe.subscriptions.retrieve(subscriptionRef);
    return { ...(subscription.metadata as MetadataRecord), ...invoiceMetadata };
  }

  return invoiceMetadata;
}

async function handleEvent(stripe: Stripe, event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata as MetadataRecord;
      const displayName = optInDisplayName(metadata);

      if (session.mode === "payment") {
        await recordDonationPayment(session.amount_total ?? 0, displayName);
      }

      if (session.mode === "subscription") {
        await recordMonthlyDonor(displayName);
      }

      return;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const metadata = await metadataFromSubscription(stripe, invoice);

      if (metadata.campaign === "impact_fund") {
        await recordDonationPayment(invoice.amount_paid ?? 0, optInDisplayName(metadata));
      }

      return;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      await subtractRefundedAmount(charge.amount_refunded ?? 0);
      return;
    }

    case "payment_intent.payment_failed":
    case "customer.subscription.deleted":
      return;

    default:
      return;
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook configuration." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  if (await hasProcessedEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    await handleEvent(stripe, event);
    await markProcessedEvent(event.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
