import { withSupabase } from "@supabase/server";
import { getDonationSummary } from "@/lib/donation-store";

export const runtime = "nodejs";

export const GET = withSupabase({ auth: "none", cors: false }, async (_request, ctx) => {
  try {
    const summary = await getDonationSummary(ctx.supabaseAdmin);
    return Response.json(summary);
  } catch {
    return Response.json({ error: "Donation tracker is unavailable." }, { status: 503 });
  }
});
