export type LegacyDonor = {
  displayName: string;
  amountCents: number;
};

export const legacyDonors = [
  { displayName: "Awab Hassan", amountCents: 133906 },
  { displayName: "Connor Mannion", amountCents: 90000 },
  { displayName: "Dan Andrescavage", amountCents: 75000 },
  { displayName: "Austin Preiss", amountCents: 40000 },
  { displayName: "Dan Carrollo", amountCents: 35000 },
  { displayName: "Erim Gurlemis", amountCents: 28211 },
  { displayName: "Mitch Horner", amountCents: 27000 },
  { displayName: "Cameron Jacoby", amountCents: 20000 },
  { displayName: "Khang Lieu", amountCents: 15000 },
  { displayName: "Nick Gerken", amountCents: 14500 },
  { displayName: "Andrew Stremme", amountCents: 11707 },
  { displayName: "Harsh Patel", amountCents: 10000 },
  { displayName: "Matt Rollins", amountCents: 10000 },
  { displayName: "Parth Shah", amountCents: 10000 },
  { displayName: "Steve Sokolowski", amountCents: 10000 },
  { displayName: "Brian Buonauro", amountCents: 7500 },
  { displayName: "Chris Young", amountCents: 5100 },
  { displayName: "Casey Collins", amountCents: 5000 },
  { displayName: "Sam Vasilyev", amountCents: 5000 },
  { displayName: "Walter Wissler", amountCents: 5000 },
  { displayName: "Jake Rogers", amountCents: 3700 },
  { displayName: "Blaise Collins", amountCents: 2500 },
  { displayName: "Mark Trevena", amountCents: 2500 },
  { displayName: "William Locke", amountCents: 2500 },
  { displayName: "Arash Fatahi", amountCents: 2000 },
  { displayName: "James Yim", amountCents: 2000 },
  { displayName: "Ryan Neidich", amountCents: 2000 },
  { displayName: "Jack Baker", amountCents: 568 }
] satisfies LegacyDonor[];

export const legacyDonorSnapshot = {
  sourceLabel: "Legacy donation dashboard",
  lastUpdated: "2026-02-02",
  lifetimeTotalCents: 575692,
  donors: legacyDonors
};
