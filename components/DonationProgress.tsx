"use client";

import { useEffect, useState } from "react";
import type { DonationSummaryResponse } from "@/lib/donations";
import { formatCurrency, formatCurrencyWithCents } from "@/lib/donations";

type DonationProgressProps = {
  compact?: boolean;
};

export function DonationProgress({ compact = false }: DonationProgressProps) {
  const [summary, setSummary] = useState<DonationSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/donation-summary")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Donation summary is not available yet.");
        }

        return response.json() as Promise<DonationSummaryResponse>;
      })
      .then((data) => {
        if (isMounted) {
          setSummary(data);
        }
      })
      .catch((caught: Error) => {
        if (isMounted) {
          setError(caught.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <section className="progress-panel">
        <p className="eyebrow">Impact Fund tracker</p>
        <h3>Tracker setup in progress</h3>
        <p>{error} Live tracking appears here when donation services are connected.</p>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="progress-panel">
        <p className="eyebrow">Impact Fund tracker</p>
        <h3>Loading donation progress...</h3>
      </section>
    );
  }

  const percent = Math.min(100, Math.round((summary.totalRaisedCents / summary.annualGoalCents) * 100));

  return (
    <section className={compact ? "progress-panel compact" : "progress-panel"}>
      <div className="progress-heading">
        <div>
          <p className="eyebrow">Impact Fund tracker</p>
          <h3>{formatCurrency(summary.totalRaisedCents)} raised</h3>
        </div>
        <strong>{percent}%</strong>
      </div>
      <div className="progress-track" aria-label={`${percent}% of annual goal funded`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-meta">
        <span>Goal: {formatCurrency(summary.annualGoalCents)}</span>
        <span>{summary.monthlyDonorCount} monthly donors</span>
        <span>{summary.lastUpdated ? `Updated ${new Date(summary.lastUpdated).toLocaleDateString()}` : "Live tracker initializing"}</span>
      </div>
      <div className="progress-metrics" aria-label="Legacy donor dashboard snapshot">
        <div>
          <strong>{formatCurrencyWithCents(summary.legacyTotalCents)}</strong>
          <span>legacy lifetime total</span>
        </div>
        <div>
          <strong>{summary.legacyDonorCount}</strong>
          <span>legacy donors recognized</span>
        </div>
      </div>
    </section>
  );
}
