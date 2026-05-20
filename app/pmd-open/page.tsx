import Image from "next/image";
import { CalloutBand } from "@/components/CalloutBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { externalLinks, pmdOpenPhotos, sponsorLogos } from "@/lib/site-content";

export const metadata = {
  title: "PMD Open"
};

export default function PmdOpenPage() {
  return (
    <>
      <PageHero
        eyebrow="Signature event"
        title="The PMD Open brings alumni back together with a purpose."
        description="A spring day at Rutgers University Golf Course, a table full of local support, and one more excuse for the wider Mu Sigma community to show up for each other."
        variant="open-hero"
        actions={[
          { label: "Register interest", href: externalLinks.pmdOpenRegistration },
          { label: "Sponsor the event", href: externalLinks.pmdOpenSponsorship, variant: "secondary" }
        ]}
      />

      <section className="page-section two-column story-section" id="registration">
        <div>
          <SectionHeader eyebrow="Overview" title="Annual alumni golf outing" />
          <p>
            The PMD Open is the association's signature alumni golf outing. It is part fundraiser, part reunion, and
            part thank-you to the people and local businesses that keep the chapter close.
          </p>
          <p>
            Under the banner of Scramble for the Kids, the outing supports Embrace Kids Foundation and its work helping
            families whose children are facing cancer, sickle cell, and other serious health challenges.
          </p>
          <div className="detail-list">
            <p><strong>Date:</strong> Spring 2026</p>
            <p><strong>Location:</strong> Rutgers University Golf Course</p>
            <p><strong>Format:</strong> Golf, alumni connection, lunch, and recognition</p>
            <p><strong>Beneficiary:</strong> Scramble for the Kids, supporting Embrace Kids Foundation</p>
          </div>
        </div>
        <article className="event-proof-panel">
          <p className="eyebrow">Event energy</p>
          <h3>Golf, raffles, sponsors, and Rutgers spirit.</h3>
          <p>Thank you to every brother, alumnus, sponsor, and friend who made the PMD Open feel like PMD at its best.</p>
        </article>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Event photos" title="Past PMD Open moments" align="center" />
        <div className="gallery-grid cinematic">
          {pmdOpenPhotos.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 380px"
            />
          ))}
        </div>
      </section>

      <section className="page-section sponsor-runway" id="sponsorship">
        <SectionHeader
          eyebrow="Sponsor path"
          title="Make sponsorship feel concrete before alumni ask what it buys."
          description="Sponsors help turn the outing into a real day of food, prizes, visibility, and support for Scramble for the Kids."
        />
        <div className="sponsor-lanes">
          {["Hole sponsor", "Lunch sponsor", "Title sponsor"].map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
              <p>Recognition, event presence, and sponsor thank-yous are coordinated through the PMD Open team.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section muted">
        <SectionHeader
          eyebrow="Sponsor thank-you"
          title="Local sponsors make the outing feel bigger than one round of golf."
          description="Confirmed sponsors are part of the story: they help make the raffles, food, prizes, and event energy possible."
          align="center"
        />
        <div className="sponsor-logo-grid">
          {sponsorLogos.map((sponsor) => (
            <article className="sponsor-logo-card" key={sponsor.name}>
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                sizes="(max-width: 720px) 45vw, 180px"
              />
            </article>
          ))}
        </div>
      </section>

      <CalloutBand
        eyebrow="Registration and sponsorship"
        title="Make the PMD Open easy to join and easy to sponsor."
        description="Spring 2026 interest, sponsor conversations, and event updates all start from one clear PMD Open path."
        primaryLabel="Register interest"
        primaryHref={externalLinks.pmdOpenRegistration}
        secondaryLabel="Sponsor the event"
        secondaryHref={externalLinks.pmdOpenSponsorship}
      />
    </>
  );
}
