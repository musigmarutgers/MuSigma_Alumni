"use client";

import { FormEvent, useState } from "react";
import type { DonationMode, DonationTier } from "@/lib/donations";

type DonationTierCardProps = {
  amountLabel: string;
  tierName: string;
  description: string;
  tier: DonationTier;
  mode?: DonationMode;
  isRecommended?: boolean;
};

export function DonationTierCard({
  amountLabel,
  tierName,
  description,
  tier,
  mode = "subscription",
  isRecommended = false
}: DonationTierCardProps) {
  const [showOnDonorWall, setShowOnDonorWall] = useState(false);
  const [donorDisplayName, setDonorDisplayName] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [customMode, setCustomMode] = useState<DonationMode>(mode);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const selectedMode = tier === "custom" ? customMode : mode;
    const amountCents = tier === "custom" ? Math.round(Number(customAmount) * 100) : undefined;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode: selectedMode,
          tier,
          amountCents,
          donorDisplayName,
          showOnDonorWall
        })
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Could not start Stripe Checkout.");
      }

      window.location.href = data.url;
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Could not start Stripe Checkout.";
      setStatus(message);
      setIsSubmitting(false);
    }
  }

  return (
    <form className={isRecommended ? "donation-card recommended" : "donation-card"} onSubmit={handleSubmit}>
      {isRecommended ? <span className="recommended-label">Recommended</span> : null}
      <p className="amount-label">{amountLabel}</p>
      <h3>{tierName}</h3>
      <p>{description}</p>

      {tier === "custom" ? (
        <div className="form-row">
          <label>
            Amount
            <input
              min="1"
              step="1"
              type="number"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              placeholder="25"
              required
            />
          </label>
          <label>
            Frequency
            <select value={customMode} onChange={(event) => setCustomMode(event.target.value as DonationMode)}>
              <option value="payment">One-time</option>
              <option value="subscription">Monthly</option>
            </select>
          </label>
        </div>
      ) : null}

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={showOnDonorWall}
          onChange={(event) => setShowOnDonorWall(event.target.checked)}
        />
        Show my name on the donor wall
      </label>

      {showOnDonorWall ? (
        <label>
          Public display name
          <input
            type="text"
            maxLength={80}
            value={donorDisplayName}
            onChange={(event) => setDonorDisplayName(event.target.value)}
            placeholder="TODO: Your name"
          />
        </label>
      ) : null}

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Opening Checkout..." : tier === "custom" ? "Give custom amount" : "Give monthly"}
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
