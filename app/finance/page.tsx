import { DonationProgress } from "@/components/DonationProgress";
import { DonorWall } from "@/components/DonorWall";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { financeCategories } from "@/lib/site-content";

export const metadata = {
  title: "Finance"
};

export default function FinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Financial transparency"
        title="Show enough to build trust without exposing sensitive details."
        description="The finance page explains public allocation categories, progress toward annual goals, and donor recognition rules."
        variant="finance-hero"
        actions={[
          { label: "Support the Impact Fund", href: "/impact-fund" },
          { label: "Read governance notes", href: "/about", variant: "secondary" }
        ]}
      />

      <section className="page-section two-column ledger-shell">
        <div>
          <SectionHeader eyebrow="Overview" title="High-level allocation model" />
          <p>
            These public budget categories give alumni a plain-language view of how support is intended to be organized,
            while official accounting remains in association records.
          </p>
          <div className="finance-rules">
            <span>No private donor amounts</span>
            <span>No customer IDs</span>
            <span>Governance-aligned language</span>
          </div>
        </div>
        <DonationProgress compact />
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Budget categories" title="Where alumni support is intended to go" align="center" />
        <div className="allocation-list">
          {financeCategories.map((category) => (
            <article className="allocation-row" key={category.label}>
              <div>
                <h3>{category.label}</h3>
                <p>{category.description}</p>
                <div className="allocation-meter" aria-hidden="true">
                  <span style={{ width: `${category.percent}%` }} />
                </div>
              </div>
              <strong>{category.percent}%</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section two-column">
        <DonorWall />
        <article className="content-card">
          <p className="eyebrow">Accounting note</p>
          <h3>Public tracker, not official books.</h3>
          <p>
            The website tracker is for public progress and recognition. Official accounting, refunds, receipts, and tax
            language remain in Stripe, association records, and approved guidance.
          </p>
        </article>
      </section>
    </>
  );
}
