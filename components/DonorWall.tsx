"use client";

import { useEffect, useState } from "react";
import type { DonationSummaryResponse } from "@/lib/donations";

export function DonorWall() {
  const [summary, setSummary] = useState<DonationSummaryResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/donation-summary")
      .then((response) => response.json() as Promise<DonationSummaryResponse>)
      .then((data) => {
        if (isMounted) {
          setSummary(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSummary(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const donors = summary?.donors ?? [];

  return (
    <section className="content-card donor-wall">
      <p className="eyebrow">Opt-in donor wall</p>
      <h3>Alumni helping build the next year</h3>
      <p>Only donors who opt in are shown here. Exact amounts, tiers, emails, and billing details are never public.</p>
      {donors.length > 0 ? (
        <ul className="name-list">
          {donors.map((donor) => (
            <li key={donor.displayName}>{donor.displayName}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-note">Be one of the first alumni to opt into the donor wall.</p>
      )}
    </section>
  );
}
