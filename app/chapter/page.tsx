import Image from "next/image";
import { CalloutBand } from "@/components/CalloutBand";
import { externalLinks } from "@/lib/site-content";

export const metadata = {
  title: "Chapter Highlights"
};

type HighlightPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type HighlightSection = {
  eyebrow: string;
  title: string;
  description: string;
  photos: HighlightPhoto[];
  accent?: string;
};

const photos = {
  backyardConcertCrowd: {
    src: "/chapter-highlights/backyard-concert-crowd.png",
    alt: "Crowd gathered for the Backyard Concert Series",
    width: 4032,
    height: 3024
  },
  backyardConcertStage: {
    src: "/chapter-highlights/backyard-concert-stage.png",
    alt: "Performer on stage during the Backyard Concert Series",
    width: 4032,
    height: 3024
  },
  beerOlympicsTable: {
    src: "/chapter-highlights/beer-olympics-table.JPG",
    alt: "Brothers gathered around the Beer Olympics table",
    width: 4608,
    height: 3456
  },
  beerOlympicsThrow: {
    src: "/chapter-highlights/beer-olympics-throw.JPG",
    alt: "Beer Olympics action shot at the table",
    width: 4608,
    height: 3456
  },
  beerOlympicsYard: {
    src: "/chapter-highlights/beer-olympics-yard.JPG",
    alt: "Backyard setup for Beer Olympics",
    width: 4608,
    height: 3456
  },
  brotherhoodDinner: {
    src: "/chapter-highlights/brotherhood-dinner.jpeg",
    alt: "The brotherhood dinner, a time during the year when the chapter comes together for a meal and a moment of connection",
    width: 5712,
    height: 4284
  },
  chapterFormal: {
    src: "/chapter-highlights/chapter-formal-group.JPG",
    alt: "PMD Mu Sigma chapter formal group photo",
    width: 4444,
    height: 3160
  },
  rudmAtmosphere: {
    src: "/chapter-highlights/rudm-atmosphere.JPG",
    alt: "RUDM 2026 crowd and atmosphere on campus",
    width: 4608,
    height: 3456
  },
  rudmGroupSteps: {
    src: "/chapter-highlights/rudm-group-steps.JPG",
    alt: "PMD Mu Sigma group in orange RUDM 2026 shirts",
    width: 4608,
    height: 3456
  },
  rudmGroupTrees: {
    src: "/chapter-highlights/rudm-group-trees.JPG",
    alt: "PMD Mu Sigma group in RUDM 2026 shirts under flowering trees",
    width: 4608,
    height: 3456
  },
  rudmLineup: {
    src: "/chapter-highlights/rudm-lineup.JPG",
    alt: "PMD Mu Sigma RUDM 2026 lineup on campus",
    width: 4608,
    height: 3456
  },
  snowDay: {
    src: "/chapter-highlights/snow-day.JPG",
    alt: "Two brothers outside during a snowy night",
    width: 4608,
    height: 3456
  },
  topGolfNight: {
    src: "/chapter-highlights/top-golf-night.png",
    alt: "PMD Mu Sigma group photo at Top Golf",
    width: 3024,
    height: 4032
  },
  winterFirePitGroup: {
    src: "/chapter-highlights/winter-fire-pit-group.png",
    alt: "Mu Sigma members gathered around a winter fire pit",
    width: 4032,
    height: 3024
  },
  winterFirePitSnow: {
    src: "/chapter-highlights/winter-fire-pit-snow.JPG",
    alt: "Mu Sigma members gathered around a winter fire pit in the snow",
    width: 4608,
    height: 3456
  },
  ztaPmdBreastCancer: {
    src: "/chapter-highlights/zta-pmd-breast-cancer.png",
    alt: "ZTA and PMD breast cancer awareness event photo",
    width: 3024,
    height: 4032
  }
} satisfies Record<string, HighlightPhoto>;

const highlightSections: HighlightSection[] = [
  {
    eyebrow: "For the kids",
    title: "RUDM 2026",
    description:
      "Orange shirts, long hours, and the kind of campus energy that reminds alumni why service became part of PMD's pillars.",
    photos: [photos.rudmGroupSteps, photos.rudmGroupTrees, photos.rudmLineup, photos.rudmAtmosphere],
    accent: "RUDM"
  },
  {
    eyebrow: "Live from the backyard",
    title: "Sawman's Yard",
    description:
      "A night built from string lights, friends packed shoulder to shoulder, and a stage that made Senior Street feel bigger than itself.",
    photos: [photos.backyardConcertCrowd, photos.backyardConcertStage],
    accent: "Concert"
  },
  {
    eyebrow: "Pink ribbons on Senior Street",
    title: "ZTA x PMD - Breast Cancer Awareness",
    description:
      "A small front-porch moment with a clear purpose: showing up for awareness, partnership, and the people affected by breast cancer.",
    photos: [photos.ztaPmdBreastCancer],
    accent: "ZTA x PMD"
  },
  {
    eyebrow: "Late-night swings",
    title: "Top Golf Night",
    description:
      "A simple night out with the chapter: bays, clubs, and one clean group shot that says enough.",
    photos: [photos.topGolfNight],
    accent: "Top Golf"
  },
  {
    eyebrow: "Table full",
    title: "Brotherhood Dinner",
    description:
      "The kind of chapter memory that new alumni recognize instantly: too much food, a long table, and everyone leaning into the frame.",
    photos: [photos.brotherhoodDinner],
    accent: "Dinner"
  },
  {
    eyebrow: "Cold night, warm circle",
    title: "Winter Fire Pit",
    description:
      "Snow on the ground, lights overhead, and a fire pit doing exactly what it is supposed to do: keep people close.",
    photos: [photos.winterFirePitGroup, photos.winterFirePitSnow],
    accent: "Fire Pit"
  },
  {
    eyebrow: "Backyard bracket",
    title: "Mud Olympics",
    description:
      "Flags up, teams moving, and the backyard turned into a full-day tournament with the usual Mu Sigma level of commitment.",
    photos: [photos.beerOlympicsYard, photos.beerOlympicsTable, photos.beerOlympicsThrow],
    accent: "Olympics"
  },
  {
    eyebrow: "Formal night",
    title: "Spring 26 Big Little",
    description:
      "A group photo that belongs at the top of the page: everyone together, dressed up, and capturing the kind of moment that alumni will scroll back to again.",
    photos: [photos.chapterFormal],
    accent: "Formal"
  },
  {
    eyebrow: "After the storm",
    title: "Snow Day",
    description:
      "Not every highlight needs a program or a crowd. Sometimes it is just two brothers outside after the snow.",
    photos: [photos.snowDay],
    accent: "Snow"
  }
];

function HighlightGallery({ section }: Readonly<{ section: HighlightSection }>) {
  const [leadPhoto, ...supportingPhotos] = section.photos;

  return (
    <section className="chapter-highlight-section" aria-labelledby={`highlight-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>
      <div className="chapter-highlight-copy">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2 id={`highlight-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>{section.title}</h2>
        <p>{section.description}</p>
        {section.accent ? <span>{section.accent}</span> : null}
      </div>
      <div className={`chapter-highlight-gallery ${supportingPhotos.length === 0 ? "single" : ""}`}>
        <figure className="chapter-highlight-lead">
          <Image src={leadPhoto.src} alt={leadPhoto.alt} width={leadPhoto.width} height={leadPhoto.height} sizes="(max-width: 760px) 100vw, 760px" />
        </figure>
        {supportingPhotos.length > 0 ? (
          <div className="chapter-highlight-support">
            {supportingPhotos.map((photo) => (
              <Image key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 100vw, 360px" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function ChapterPage() {
  return (
    <>
      <section className="chapter-highlights-hero" aria-label="PMD Mu Sigma chapter highlights introduction">
        <Image
          src={photos.chapterFormal.src}
          alt={photos.chapterFormal.alt}
          width={photos.chapterFormal.width}
          height={photos.chapterFormal.height}
          priority
          sizes="100vw"
        />
        <div className="chapter-highlights-hero-copy">
          <p className="eyebrow">Chapter highlights</p>
          <h1>PMD Mu Sigma, in the moments alumni actually remember.</h1>
          <p>
            Service days, backyard nights, chapter meals, winter fires, and the formal photo that belongs at the top.
          </p>
        </div>
      </section>

      <section className="page-section compact chapter-highlights-intro">
        <p className="eyebrow">Spring 2026 and chapter memory</p>
        <h2>Group photos lead because the people are the point.</h2>
        <p>
          This page is a public-facing chapter archive for alumni: big group shots first, action and atmosphere second,
          and every heading written like it belongs to Mu Sigma.
        </p>
      </section>

      <div className="chapter-highlights-stack">
        {highlightSections.map((section) => (
          <HighlightGallery key={section.title} section={section} />
        ))}
      </div>

      <CalloutBand
        id="chapter-updates"
        eyebrow="Keep the archive alive"
        title="Send the moments worth preserving."
        description="Chapter highlights work best when alumni can see the culture, not just read about it. Group photos, service moments, and real captions can keep this page current."
        primaryLabel="Share an update"
        primaryHref={externalLinks.updateForm}
        secondaryLabel="Join the alumni network"
        secondaryHref={externalLinks.alumniNetwork}
      />
    </>
  );
}
