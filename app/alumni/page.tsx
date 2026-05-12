import { CalloutBand } from "@/components/CalloutBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { alumniSpotlights, externalLinks } from "@/lib/site-content";

export const metadata = {
  title: "Alumni"
};

export default function AlumniPage() {
  return (
    <>
      <PageHero
        eyebrow="Alumni network"
        title="Reconnect alumni by giving them clear next steps."
        description="This page previews spotlights, class connections, and future family tree features while keeping every personal detail public-safe."
        variant="alumni-hero"
        actions={[
          { label: "TODO: Join the Alumni Network", href: externalLinks.alumniNetwork },
          { label: "TODO: Update your info", href: externalLinks.updateForm, variant: "secondary" }
        ]}
      />

      <CalloutBand
        eyebrow="Join the network"
        title="TODO: Connect the alumni email list, groupchat, or contact form."
        description="Make this the primary intake point for alumni who want event reminders, PMD Open news, mentorship updates, and Impact Fund reporting."
        primaryLabel="TODO: Join the Alumni Network"
        primaryHref={externalLinks.alumniNetwork}
      />

      <section className="page-section">
        <SectionHeader
          eyebrow="Spotlights"
          title="Sample alumni stories"
          description="Replace these only after real alumni approve their names, class years, and stories."
        />
        <div className="spotlight-row">
          {alumniSpotlights.map((spotlight) => (
            <article className="content-card spotlight-card" key={spotlight.name}>
              <p className="eyebrow">{spotlight.classYear}</p>
              <h3>{spotlight.name}</h3>
              <p>{spotlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section muted two-column">
        <div>
          <SectionHeader eyebrow="Family trees preview" title="Big/Little lineage is a phase-two feature worth doing carefully." />
          <p>
            For v1, show a static preview and collect clean data. A real lineage tool should be built only after the
            association decides what information is public, opt-in, and maintainable.
          </p>
        </div>
        <article className="network-map">
          <div>
            <span>Class</span>
            <strong>TODO: 2020</strong>
          </div>
          <div>
            <span>Big</span>
            <strong>TODO: Big Brother</strong>
          </div>
          <div>
            <span>Little</span>
            <strong>TODO: Little Brother</strong>
          </div>
          <div>
            <span>Filters</span>
            <strong>Year / Profession / Location</strong>
          </div>
        </article>
      </section>
    </>
  );
}
