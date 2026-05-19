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
    title: "Monthly chapter note",
    description: "A short update on what alumni should know this month, written for clarity and consistency."
  },
  {
    eyebrow: "Philanthropy",
    title: "Service recap",
    description: "A public summary of service outcomes and beneficiary work without exposing private chapter details."
  },
  {
    eyebrow: "Brotherhood",
    title: "Brotherhood highlight",
    description: "A curated moment that helps alumni recognize the culture they helped build."
  },
  {
    eyebrow: "Recruitment",
    title: "Recruitment snapshot",
    description: "High-level recruitment progress and values, avoiding sensitive internal strategy."
  }
];

const operationsSummaries = [
  "Officer priorities, public-facing goals, and leadership transition needs.",
  "Service work, beneficiary updates, and outcomes that are appropriate to share.",
  "Chapter traditions, alumni touchpoints, and brotherhood programming highlights.",
  "High-level recruitment values and momentum without private strategy details.",
  "Recognitions, chapter milestones, and moments worth preserving."
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
          { label: "Submit an update", href: externalLinks.updateForm },
          { label: "View social highlights", href: externalLinks.instagram, variant: "secondary" }
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
            The alumni-facing digest can show momentum, service, and leadership without exposing internal strategy,
            member-only details, or private names.
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
                <p>{operationsSummaries[index]}</p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="page-section two-column" id="social-highlights">
        <article className="content-card">
          <p className="eyebrow">Social highlights</p>
          <h3>Curated, not noisy.</h3>
          <p>
            Selected chapter and alumni moments work better than a raw social feed. Public highlights stay current,
            curated, and easy for alumni to scan.
          </p>
          <a className="text-link" href={externalLinks.instagram}>View social highlights</a>
        </article>
        <article className="content-card">
          <p className="eyebrow">New member highlights</p>
          <h3>New member class highlights</h3>
          <p>
            Bios and class photos belong here only after real new members approve publication.
          </p>
        </article>
      </section>

      <CalloutBand
        id="chapter-needs"
        title="Share chapter needs and updates alumni can actually use."
        description="Approved needs, monthly notes, and public-safe asks keep the network warm and give donors confidence before major campaigns."
        primaryLabel="Share an update"
        primaryHref={externalLinks.updateForm}
      />
    </>
  );
}
