export type DonationMode = "payment" | "subscription";
export type DonationTier = "5" | "10" | "25" | "50" | "100" | "custom";

export type CreateCheckoutSessionRequest = {
  mode: DonationMode;
  tier: DonationTier;
  amountCents?: number;
  donorDisplayName?: string;
  showOnDonorWall: boolean;
};

export type NormalizedDonationRequest = {
  mode: DonationMode;
  tier: DonationTier;
  amountCents: number;
  donorDisplayName?: string;
  showOnDonorWall: boolean;
};

export type DonationSummaryResponse = {
  totalRaisedCents: number;
  annualGoalCents: number;
  monthlyDonorCount: number;
  lastUpdated: string | null;
  donors: Array<{
    displayName: string;
  }>;
};

export const donationTiers = [
  {
    tier: "5" as const,
    amountLabel: "$5",
    tierName: "Contributor",
    description: "A steady base of alumni participation that makes chapter planning easier."
  },
  {
    tier: "10" as const,
    amountLabel: "$10",
    tierName: "Sustainer",
    description: "A simple monthly habit that keeps service and alumni programming moving."
  },
  {
    tier: "25" as const,
    amountLabel: "$25",
    tierName: "Impact Member",
    description: "The recommended recurring gift for alumni who want to anchor the fund."
  },
  {
    tier: "50" as const,
    amountLabel: "$50",
    tierName: "Builder",
    description: "A stronger monthly commitment toward scholarships, events, and continuity."
  },
  {
    tier: "100" as const,
    amountLabel: "$100+",
    tierName: "Legacy Circle",
    description: "Leadership-level support for long-term sustainability and major initiatives."
  },
  {
    tier: "custom" as const,
    amountLabel: "Custom",
    tierName: "Choose Your Amount",
    description: "Set a one-time or monthly amount that fits how you want to support the chapter."
  }
];

export const fixedTierAmountsCents: Record<Exclude<DonationTier, "custom">, number> = {
  "5": 500,
  "10": 1000,
  "25": 2500,
  "50": 5000,
  "100": 10000
};

export const minCustomDonationCents = 100;
export const maxCustomDonationCents = 1000000;

export function normalizeDonationRequest(input: unknown): { ok: true; value: NormalizedDonationRequest } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const body = input as Partial<CreateCheckoutSessionRequest>;
  const mode = body.mode;
  const tier = body.tier;

  if (mode !== "payment" && mode !== "subscription") {
    return { ok: false, error: "Donation mode must be payment or subscription." };
  }

  if (!tier || !(tier === "custom" || tier in fixedTierAmountsCents)) {
    return { ok: false, error: "Unsupported donation tier." };
  }

  const rawAmountCents = tier === "custom" ? body.amountCents : fixedTierAmountsCents[tier];

  if (typeof rawAmountCents !== "number" || !Number.isInteger(rawAmountCents)) {
    return { ok: false, error: "Donation amount must be a whole number of cents." };
  }

  const amountCents = rawAmountCents;

  if (amountCents < minCustomDonationCents || amountCents > maxCustomDonationCents) {
    return { ok: false, error: "Donation amount is outside the allowed range." };
  }

  const showOnDonorWall = body.showOnDonorWall === true;
  const donorDisplayName = typeof body.donorDisplayName === "string" ? body.donorDisplayName.trim().slice(0, 80) : "";

  return {
    ok: true,
    value: {
      mode,
      tier,
      amountCents,
      showOnDonorWall,
      donorDisplayName: showOnDonorWall && donorDisplayName ? donorDisplayName : undefined
    }
  };
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(cents / 100);
}
