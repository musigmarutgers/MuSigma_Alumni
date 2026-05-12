import Image from "next/image";
import { CalloutBand } from "@/components/CalloutBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { externalLinks, heroImages } from "@/lib/site-content";

export const metadata = {
  title: "PMD Open"
};

export default function PmdOpenPage() {
  return (
    <>
      <PageHero
        eyebrow="Signature event"
        title="The PMD Open brings alumni back together with a purpose."
        description="TODO: Confirm the annual golf outing date, beneficiary, course, format, registration deadline, and sponsor packages before launch."
        variant="open-hero"
        actions={[
          { label: "TODO: Register", href: externalLinks.pmdOpenRegistration },
          { label: "TODO: Sponsor", href: externalLinks.pmdOpenSponsorship, variant: "secondary" }
        ]}
      />

      <section className="page-section two-column story-section">
        <div>
          <SectionHeader eyebrow="Overview" title="Annual alumni golf outing" />
          <p>
            The PMD Open is the association's signature annual event for reconnecting alumni, raising support, and
            celebrating the chapter's current work.
          </p>
          <div className="detail-list">
            <p><strong>Date:</strong> TODO: Summer 2026</p>
            <p><strong>Location:</strong> TODO: Golf course and city</p>
            <p><strong>Format:</strong> TODO: Scramble, foursomes, lunch, awards</p>
            <p><strong>Beneficiary:</strong> TODO: Confirm benefiting organization</p>
          </div>
        </div>
        <article className="event-proof-panel">
          <p className="eyebrow">Past result sample</p>
          <h3>TODO: $12,400 raised</h3>
          <p>Replace this with verified PMD Open outcomes, photos, sponsor names, and beneficiary impact.</p>
        </article>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Event photos" title="Past PMD Open moments" align="center" />
        <div className="gallery-grid cinematic">
          {heroImages.slice(0, 4).map((image) => (
            <Image key={image.src} src={image.src} alt={image.alt} width={700} height={460} />
          ))}
        </div>
      </section>

      <section className="page-section sponsor-runway">
        <SectionHeader
          eyebrow="Sponsor path"
          title="Make sponsorship feel concrete before alumni ask what it buys."
          description="Replace these with final sponsor levels, benefits, and fulfillment rules once the PMD Open team approves them."
        />
        <div className="sponsor-lanes">
          {["Hole sponsor", "Lunch sponsor", "Title sponsor"].map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <h3>TODO: {item}</h3>
              <p>Public benefit language, logo placement rules, and payment link pending.</p>
            </article>
          ))}
        </div>
      </section>

      <CalloutBand
        eyebrow="Registration and sponsorship"
        title="Make the PMD Open easy to join and easy to sponsor."
        description="Connect these CTAs to the annual Google Form or registration platform once the event details are approved."
        primaryLabel="TODO: Register"
        primaryHref={externalLinks.pmdOpenRegistration}
        secondaryLabel="TODO: Sponsor"
        secondaryHref={externalLinks.pmdOpenSponsorship}
      />
    </>
  );
}
