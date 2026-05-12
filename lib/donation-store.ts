import { Redis } from "@upstash/redis";
import type { DonationSummaryResponse } from "@/lib/donations";

const totalRaisedKey = "donations:totalRaisedCents";
const annualGoalKey = "donations:annualGoalCents";
const monthlyDonorCountKey = "donations:monthlyDonorCount";
const lastUpdatedKey = "donations:lastUpdated";
const donorWallKey = "donations:donorWall";
const processedEventsKey = "stripe:processedEvents";

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) {
    return redisClient;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || url.includes("TODO") || token.includes("TODO")) {
    redisClient = null;
    return redisClient;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

function getAnnualGoalFromEnv(): number {
  const value = Number.parseInt(process.env.NEXT_PUBLIC_ANNUAL_DONATION_GOAL_CENTS ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : 2500000;
}

async function getNumber(redis: Redis, key: string, fallback: number): Promise<number> {
  const value = await redis.get<number | string>(key);
  const parsed = typeof value === "string" ? Number.parseInt(value, 10) : value;
  return Number.isFinite(parsed) ? Number(parsed) : fallback;
}

export async function getDonationSummary(): Promise<DonationSummaryResponse> {
  const annualGoalCents = getAnnualGoalFromEnv();
  const redis = getRedis();

  if (!redis) {
    return {
      totalRaisedCents: 1850000,
      annualGoalCents,
      monthlyDonorCount: 42,
      lastUpdated: null,
      donors: []
    };
  }

  const [totalRaisedCents, storedAnnualGoalCents, monthlyDonorCount, lastUpdated, donorEntries] = await Promise.all([
    getNumber(redis, totalRaisedKey, 0),
    getNumber(redis, annualGoalKey, annualGoalCents),
    getNumber(redis, monthlyDonorCountKey, 0),
    redis.get<string | null>(lastUpdatedKey),
    redis.lrange<string>(donorWallKey, 0, 49)
  ]);

  const donors = donorEntries
    .map((entry) => {
      try {
        const parsed = JSON.parse(entry) as { displayName?: string };
        return parsed.displayName ? { displayName: parsed.displayName } : null;
      } catch {
        return null;
      }
    })
    .filter((entry): entry is { displayName: string } => Boolean(entry));

  return {
    totalRaisedCents,
    annualGoalCents: storedAnnualGoalCents,
    monthlyDonorCount,
    lastUpdated,
    donors
  };
}

export async function hasProcessedEvent(eventId: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) {
    return false;
  }

  return Boolean(await redis.sismember(processedEventsKey, eventId));
}

export async function markProcessedEvent(eventId: string): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    return;
  }

  await redis.sadd(processedEventsKey, eventId);
}

export async function recordDonationPayment(amountCents: number, donorDisplayName?: string): Promise<void> {
  const redis = getRedis();
  if (!redis || amountCents <= 0) {
    return;
  }

  await Promise.all([
    redis.incrby(totalRaisedKey, amountCents),
    redis.set(lastUpdatedKey, new Date().toISOString()),
    donorDisplayName ? addDonorDisplayName(donorDisplayName) : Promise.resolve()
  ]);
}

export async function recordMonthlyDonor(donorDisplayName?: string): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    return;
  }

  await Promise.all([
    redis.incrby(monthlyDonorCountKey, 1),
    redis.set(lastUpdatedKey, new Date().toISOString()),
    donorDisplayName ? addDonorDisplayName(donorDisplayName) : Promise.resolve()
  ]);
}

export async function subtractRefundedAmount(amountCents: number): Promise<void> {
  const redis = getRedis();
  if (!redis || amountCents <= 0) {
    return;
  }

  await Promise.all([
    redis.incrby(totalRaisedKey, -amountCents),
    redis.set(lastUpdatedKey, new Date().toISOString())
  ]);
}

async function addDonorDisplayName(displayName: string): Promise<void> {
  const redis = getRedis();
  const trimmed = displayName.trim().slice(0, 80);

  if (!redis || !trimmed) {
    return;
  }

  await redis.lpush(
    donorWallKey,
    JSON.stringify({
      displayName: trimmed,
      createdAt: new Date().toISOString()
    })
  );
}
