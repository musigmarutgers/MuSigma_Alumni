import { NextResponse } from "next/server";
import { getDonationSummary, getFallbackDonationSummary } from "@/lib/donation-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const summary = await getDonationSummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(getFallbackDonationSummary(), { status: 200 });
  }
}
