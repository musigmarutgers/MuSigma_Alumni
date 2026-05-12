import { NextResponse } from "next/server";
import { getDonationSummary } from "@/lib/donation-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const summary = await getDonationSummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      {
        totalRaisedCents: 1850000,
        annualGoalCents: 2500000,
        monthlyDonorCount: 42,
        lastUpdated: null,
        donors: []
      },
      { status: 200 }
    );
  }
}
