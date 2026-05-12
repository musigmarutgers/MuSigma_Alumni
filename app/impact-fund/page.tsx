import { DonationProgress } from "@/components/DonationProgress";
import { DonationTierCard } from "@/components/DonationTierCard";
import { DonorWall } from "@/components/DonorWall";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { donationTiers } from "@/lib/donations";

export const metadata = {
  title: "Impact Fund"
};

export default function ImpactFundPage() {
  return (
    <>
      <PageHero
        eyebrow="PMD Impact Fund"
        title="Recurring alumni support for chapter sustainability."
        description="The PMD Impact Fund turns alumni goodwill into predictable support for operations, philanthropy, scholarships, leadership development, and long-term chapter health."
        variant="impact-hero"
        actions={[
          { label: "Choose a giving tier", href: "#giving-tiers" },
          { label: "View transparency", href: "/finance", variant: "secondary" }
        ]}
      />

      <section className="page-section two-column story-section">
        <div>
          <SectionHeader
            eyebrow="What it funds"
            title="A practical fund for the work that keeps Mu Sigma strong."
            description="This page uses sample copy and TODO values until the alumni board approves final language."
          />
          <p>
            The Impact Fund is designed to make alumni support consistent instead of reactive. Monthly gifts help the
            chapter plan with confidence, strengthen philanthropy work, and reduce the year-to-year scramble for basic
            needs.
          </p>
          <p>
            Funds should be allocated through public, non-sensitive categories so alumni can understand the purpose of
            their support without exposing internal details.
          </p>
        </div>
        <DonationProgress />
      </section>

      <section className="page-section muted" id="giving-tiers">
        <SectionHeader
          eyebrow="Monthly giving tiers"
          title="Choose a level of support."
          description="Fixed monthly gifts use Stripe Checkout. Custom gifts can be one-time or monthly."
          align="center"
        />
        <div className="donation-grid">
          {donationTiers.map((tier) => (
            <DonationTierCard key={tier.tier} {...tier} isRecommended={tier.tier === "25"} />
          ))}
        </div>
      </section>

      <section className="page-section two-column">
        <div>
          <SectionHeader eyebrow="Why monthly giving matters" title="Predictability is the point." />
          <div className="stacked-list">
            <article>
              <span>01</span>
              <h3>Predictability</h3>
              <p>Chapter leaders can budget around recurring support instead of hoping a single appeal lands.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Alumni ownership</h3>
              <p>Small monthly gifts make more alumni part of the chapter's future, not just one-time observers.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Chapter longevity</h3>
              <p>Consistent support protects the programs and traditions that make Mu Sigma worth coming back to.</p>
            </article>
          </div>
        </div>
        <DonorWall />
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Transparency snapshot" title="Where support is intended to go." align="center" />
        <div className="ledger-grid">
          {["Chapter operations", "Philanthropy", "Scholarships", "Leadership development", "Sustainability reserve"].map(
            (item, index) => (
              <article className="ledger-item" key={item}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
                <p>TODO: Replace this sample allocation note with board-approved language.</p>
              </article>
            )
          )}
        </div>
      </section>
    </>
  );
}
