import Image from "next/image";
import { CalloutBand } from "@/components/CalloutBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { UpdateCard } from "@/components/UpdateCard";
import { externalLinks, heroImages } from "@/lib/site-content";

export const metadata = {
  title: "Chapter"
};

const chapterUpdates = [
  {
    eyebrow: "Alumni Chair update",
    title: "TODO: Monthly chapter note",
    description: "A short update on what alumni should know this month, written for clarity and consistency."
  },
  {
    eyebrow: "Philanthropy",
    title: "TODO: Service recap",
    description: "A public summary of service outcomes and beneficiary work without exposing private chapter details."
  },
  {
    eyebrow: "Brotherhood",
    title: "TODO: Brotherhood highlight",
    description: "A curated moment that helps alumni recognize the culture they helped build."
  },
  {
    eyebrow: "Recruitment",
    title: "TODO: Recruitment snapshot",
    description: "High-level recruitment progress and values, avoiding sensitive internal strategy."
  }
];

export default function ChapterPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter dashboard"
        title="Public visibility without internal secrets."
        description="Chapter updates should help alumni feel connected, confident donating, and aware of the work happening now."
        variant="chapter-hero"
        actions={[
          { label: "TODO: Submit an update", href: externalLinks.updateForm },
          { label: "TODO: View Instagram", href: externalLinks.instagram, variant: "secondary" }
        ]}
      />

      <section className="page-section two-column story-section">
        <div>
          <SectionHeader
            eyebrow="Chapter dispatch"
            title="Make the chapter feel current without making it private."
            description="A strong chapter page should feel alive: a small number of verified moments, public-safe updates, and clear asks."
          />
          <p>
            Use this page as an alumni-facing digest. The chapter can show momentum, service, and leadership without
            exposing internal strategy, member-only details, or unapproved names.
          </p>
        </div>
        <div className="media-collage">
          {heroImages.slice(1, 4).map((image) => (
            <Image key={image.src} src={image.src} alt={image.alt} width={520} height={360} />
          ))}
        </div>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Chapter feed" title="Photos and updates alumni can understand quickly." />
        <div className="card-grid four">
          {chapterUpdates.map((update) => (
            <UpdateCard key={update.title} {...update} />
          ))}
        </div>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Operations snapshot" title="A simple dashboard for accountability." align="center" />
        <div className="dashboard-strip">
          {["Leadership overview", "Service initiatives", "Brotherhood events", "Recruitment efforts", "Awards and recognition"].map(
            (item, index) => (
              <article key={item}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
                <p>TODO: Add a concise, public-safe summary for this category.</p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="page-section two-column">
        <article className="content-card">
          <p className="eyebrow">Social highlights</p>
          <h3>Curated, not noisy.</h3>
          <p>
            Use selected chapter and alumni moments here instead of embedding a raw Instagram feed. TODO: connect the
            final Instagram link.
          </p>
          <a className="text-link" href={externalLinks.instagram}>TODO: View Instagram</a>
        </article>
        <article className="content-card">
          <p className="eyebrow">New member highlights</p>
          <h3>TODO: Spring new member class</h3>
          <p>
            Sample bios and class photos belong here only after real new members have approved publication.
          </p>
        </article>
      </section>

      <CalloutBand
        title="Send chapter updates alumni can actually use."
        description="A lightweight monthly update keeps the network warm and gives donors confidence before major asks."
        primaryLabel="TODO: Submit an update"
        primaryHref={externalLinks.updateForm}
      />
    </>
  );
}
