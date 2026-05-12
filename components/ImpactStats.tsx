import { impactStats } from "@/lib/site-content";

export function ImpactStats() {
  return (
    <section className="stats-grid" aria-label="PMD Mu Sigma impact statistics">
      {impactStats.map((stat) => (
        <div className="stat-tile" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
