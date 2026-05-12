import { AlumniPathways } from "@/components/AlumniPathways";
import { CalloutBand } from "@/components/CalloutBand";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ImpactStats } from "@/components/ImpactStats";
import { SectionHeader } from "@/components/SectionHeader";
import { UpdateCard } from "@/components/UpdateCard";
import { externalLinks, updateCards } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <AlumniPathways />
      <section className="page-section compact">
        <SectionHeader
          eyebrow="Immediate chapter visibility"
          title="A central hub for alumni who want to stay close and help wisely."
          description="The site brings together the Impact Fund, upcoming events, chapter updates, and transparent public reporting so alumni can understand what is happening before they are asked to give."
          align="center"
        />
        <ImpactStats />
      </section>

      <section className="page-section muted">
        <SectionHeader
          eyebrow="Current signals"
          title="What alumni should see first"
          description="These sample cards are designed to be replaced with real updates, dates, newsletter highlights, and governance language before launch."
        />
        <div className="card-grid four">
          {updateCards.map((card) => (
            <UpdateCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <CalloutBand
        eyebrow="Wishlist support"
        title="Give the chapter practical support without sending money."
        description="TODO: Connect this banner to a chapter wishlist so alumni can buy approved needs directly while the association finalizes long-term giving operations."
        primaryLabel="TODO: View the wishlist"
        primaryHref={externalLinks.wishlist}
        secondaryLabel="Support the Impact Fund"
        secondaryHref="/impact-fund"
      />
    </>
  );
}
