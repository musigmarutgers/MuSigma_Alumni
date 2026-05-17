import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { DonationSummaryResponse } from "@/lib/donations";

const fallbackTotalRaisedCents = 1850000;
const fallbackMonthlyDonorCount = 42;
const fallbackAnnualGoalCents = 2500000;

let supabaseClient: SupabaseClient | null | undefined;

type DonationSummaryRow = {
  total_raised_cents: number | string | null;
  monthly_donor_count: number | string | null;
  last_updated: string | null;
};

type DonorRow = {
  donor_display_name: string | null;
};

type DonationSettingRow = {
  value: string | null;
};

function configured(value: string | undefined): value is string {
  return Boolean(value && !value.includes("TODO") && !value.includes("your_"));
}

function getSupabase(): SupabaseClient | null {
  if (supabaseClient !== undefined) {
    return supabaseClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!configured(url) || !configured(secretKey)) {
    supabaseClient = null;
    return supabaseClient;
  }

  supabaseClient = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  return supabaseClient;
}

function parseCents(value: string | number | null | undefined, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Number(parsed) : fallback;
}

function getAnnualGoalFromEnv(): number {
  return parseCents(process.env.NEXT_PUBLIC_ANNUAL_DONATION_GOAL_CENTS, fallbackAnnualGoalCents);
}

async function getAnnualGoalCents(supabase: SupabaseClient): Promise<number> {
  const fallback = getAnnualGoalFromEnv();
  const { data, error } = await supabase
    .from("donation_settings")
    .select("value")
    .eq("key", "annual_goal_cents")
    .maybeSingle<DonationSettingRow>();

  if (error) {
    throw error;
  }

  return parseCents(data?.value, fallback);
}

export async function getDonationSummary(): Promise<DonationSummaryResponse> {
  const annualGoalCents = getAnnualGoalFromEnv();
  const supabase = getSupabase();

  if (!supabase) {
    return {
      totalRaisedCents: fallbackTotalRaisedCents,
      annualGoalCents,
      monthlyDonorCount: fallbackMonthlyDonorCount,
      lastUpdated: null,
      donors: []
    };
  }

  const [storedAnnualGoalCents, summaryResult, donorsResult] = await Promise.all([
    getAnnualGoalCents(supabase),
    supabase
      .from("donation_summary")
      .select("total_raised_cents, monthly_donor_count, last_updated")
      .maybeSingle<DonationSummaryRow>(),
    supabase
      .from("donations")
      .select("donor_display_name")
      .not("donor_display_name", "is", null)
      .neq("donor_display_name", "")
      .order("created_at", { ascending: false })
      .limit(50)
      .returns<DonorRow[]>()
  ]);

  if (summaryResult.error) {
    throw summaryResult.error;
  }

  if (donorsResult.error) {
    throw donorsResult.error;
  }

  const summary = summaryResult.data;
  const donors = (donorsResult.data ?? [])
    .map((entry) => entry.donor_display_name?.trim())
    .filter((displayName): displayName is string => Boolean(displayName))
    .map((displayName) => ({ displayName }));

  return {
    totalRaisedCents: parseCents(summary?.total_raised_cents, 0),
    annualGoalCents: storedAnnualGoalCents,
    monthlyDonorCount: parseCents(summary?.monthly_donor_count, 0),
    lastUpdated: summary?.last_updated ?? null,
    donors
  };
}

export async function hasProcessedEvent(eventId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from("stripe_processed_events")
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle<{ event_id: string }>();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export async function markProcessedEvent(eventId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from("stripe_processed_events")
    .upsert({ event_id: eventId }, { onConflict: "event_id", ignoreDuplicates: true });

  if (error) {
    throw error;
  }
}

export async function recordDonationPayment(amountCents: number, donorDisplayName?: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || amountCents <= 0) {
    return;
  }

  const { error } = await supabase.from("donations").insert({
    amount_cents: amountCents,
    donor_display_name: cleanDisplayName(donorDisplayName),
    is_monthly: false
  });

  if (error) {
    throw error;
  }
}

export async function recordMonthlyDonor(donorDisplayName?: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) {
    return;
  }

  const { error } = await supabase.from("donations").insert({
    amount_cents: 0,
    donor_display_name: cleanDisplayName(donorDisplayName),
    is_monthly: true
  });

  if (error) {
    throw error;
  }
}

export async function subtractRefundedAmount(amountCents: number): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || amountCents <= 0) {
    return;
  }

  const { error } = await supabase.from("donations").insert({
    amount_cents: -amountCents,
    donor_display_name: null,
    is_monthly: false
  });

  if (error) {
    throw error;
  }
}

export async function recordRefund(refundId: string, amountCents: number): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || !refundId || amountCents <= 0) {
    return;
  }

  const { data, error } = await supabase
    .from("stripe_refunds")
    .upsert(
      {
        refund_id: refundId,
        amount_cents: amountCents
      },
      { onConflict: "refund_id", ignoreDuplicates: true }
    )
    .select("refund_id")
    .maybeSingle<{ refund_id: string }>();

  if (error) {
    throw error;
  }

  if (data) {
    await subtractRefundedAmount(amountCents);
  }
}

function cleanDisplayName(displayName: string | undefined): string | null {
  const trimmed = displayName?.trim().slice(0, 80);
  return trimmed || null;
}
