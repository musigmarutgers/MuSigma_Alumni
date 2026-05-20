import Image from "next/image";
import { AlumniPathways } from "@/components/AlumniPathways";
import { CalloutBand } from "@/components/CalloutBand";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ImpactStats } from "@/components/ImpactStats";
import { SectionHeader } from "@/components/SectionHeader";
import { UpdateCard } from "@/components/UpdateCard";
import { externalLinks, homeMomentPhotos, updateCards } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <AlumniPathways />
      <section className="page-section home-story" aria-label="Recent Mu Sigma alumni moments">
        <div className="home-story-copy">
          <SectionHeader
            eyebrow="What we have done so far"
            title="PMD Open and the Alumni BBQ are now part of the archive."
            description="The homepage now starts from real moments: a golf outing with purpose, a Senior Street cookout, and the next alumni gatherings waiting for details."
          />
        </div>
        <div className="home-story-gallery">
          {homeMomentPhotos.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
            />
          ))}
        </div>
      </section>

      <section className="page-section compact">
        <SectionHeader
          eyebrow="At a glance"
          title="The archive, the next gathering, and one place to give."
          description="Everything from the moments we've shared to the ones still coming and one clear way to support what's being built."
          align="center"
        />
        <ImpactStats />
      </section>

      <section className="page-section muted">
        <SectionHeader
          eyebrow="Done so far and next"
          title="The paths alumni should find first."
          description="Recaps stay available after the day ends. Upcoming event pages can be updated as soon as dates and details are ready."
        />
        <div className="card-grid four">
          {updateCards.map((card) => (
            <UpdateCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <CalloutBand
        id="stay-connected"
        eyebrow="Stay connected"
        title="Keep the Mu Sigma thread easy to find."
        description="Use the site as the home base for recaps, the Impact Fund, and upcoming anniversary moments as they become real."
        primaryLabel="View events"
        primaryHref="/events"
        secondaryLabel="Join the alumni network"
        secondaryHref={externalLinks.alumniNetwork}
      />
    </>
  );
}
