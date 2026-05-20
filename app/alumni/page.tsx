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
          { label: "Join the Alumni Network", href: externalLinks.alumniNetwork },
          { label: "Mentorship Form", href: externalLinks.mentorshipForm, variant: "secondary" }
        ]}
      />

      <CalloutBand
        id="join-network"
        eyebrow="Join the network"
        title="The alumni network hub is the front door for reconnecting."
        description="This hub gives alumni a clear path into event reminders, PMD Open news, mentorship updates, and Impact Fund reporting."
        primaryLabel="Join the Alumni Network"
        primaryHref={externalLinks.alumniNetwork}
        secondaryLabel="Open Mentorship Form"
        secondaryHref={externalLinks.mentorshipForm}
      />

      <section className="page-section">
        <SectionHeader
          eyebrow="Spotlights"
          title="Ways alumni can show up"
          description="Personal stories can appear here with consent for names, class years, photos, and quotes."
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

      <section className="page-section muted two-column" id="update-info">
        <div>
          <SectionHeader eyebrow="Family trees preview" title="Big/Little lineage is a phase-two feature worth doing carefully." />
          <p>
            A real lineage tool starts with clean opt-in data, verified relationships, and a clear decision about what
            belongs on the public site.
          </p>
        </div>
        <article className="network-map">
          <div>
            <span>Step 1</span>
            <strong>Collect opt-in data</strong>
          </div>
          <div>
            <span>Step 2</span>
            <strong>Verify relationships</strong>
          </div>
          <div>
            <span>Step 3</span>
            <strong>Publish opt-in views</strong>
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
