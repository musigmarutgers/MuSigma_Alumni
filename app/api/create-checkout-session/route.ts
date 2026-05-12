import { NextResponse } from "next/server";
import { fixedTierAmountsCents, normalizeDonationRequest } from "@/lib/donations";
import { getRecurringPriceId, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = normalizeDonationRequest(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const donation = parsed.value;
    const stripe = getStripe();
    const successUrl = process.env.STRIPE_SUCCESS_URL ?? "http://localhost:3000/impact-fund?donation=success";
    const cancelUrl = process.env.STRIPE_CANCEL_URL ?? "http://localhost:3000/impact-fund?donation=cancelled";
    const metadata = {
      campaign: "impact_fund",
      tier: donation.tier,
      showOnDonorWall: String(donation.showOnDonorWall),
      donorDisplayName: donation.donorDisplayName ?? ""
    };

    const recurringPriceId = donation.mode === "subscription" ? getRecurringPriceId(donation.tier) : undefined;
    const productName =
      donation.tier === "custom"
        ? "PMD Impact Fund custom contribution"
        : `PMD Impact Fund ${donation.tier in fixedTierAmountsCents ? `$${donation.tier}` : "support"} contribution`;

    const lineItems = recurringPriceId
      ? [{ price: recurringPriceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: donation.amountCents,
              product_data: {
                name: productName
              },
              ...(donation.mode === "subscription" ? { recurring: { interval: "month" as const } } : {})
            }
          }
        ];

    const sessionParams = {
      mode: donation.mode,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      custom_fields: [
        {
          key: "donor_display_name",
          label: {
            type: "custom",
            custom: "Public donor wall name"
          },
          type: "text",
          optional: true
        }
      ]
    } as NonNullable<Parameters<typeof stripe.checkout.sessions.create>[0]>;

    if (donation.mode === "payment") {
      sessionParams.payment_intent_data = { metadata };
    }

    if (donation.mode === "subscription") {
      sessionParams.subscription_data = { metadata };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe Checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
