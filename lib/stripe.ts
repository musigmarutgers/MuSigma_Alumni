import Stripe from "stripe";
import type { DonationTier } from "@/lib/donations";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeClient;
}

export function getRecurringPriceId(tier: DonationTier): string | undefined {
  if (tier === "custom") {
    return undefined;
  }

  const envKey = `STRIPE_PRICE_MONTHLY_${tier}` as const;
  const value = process.env[envKey];
  return value && !value.includes("TODO") ? value : undefined;
}
