import Image from "next/image";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { bbqPhotos, events, externalLinks, pmdOpenPhotos } from "@/lib/site-content";

export const metadata = {
  title: "Events"
};

const eventRecaps = [
  {
    eyebrow: "Done so far",
    title: "PMD Open",
    date: "Spring 2026",
    location: "Rutgers University Golf Course",
    description:
      "Golf, raffles, local sponsors, and Rutgers spirit came together for Scramble for the Kids in support of Embrace Kids Foundation.",
    photos: pmdOpenPhotos.slice(0, 4),
    href: "/pmd-open"
  },
  {
    eyebrow: "Done so far",
    title: "Spring 2026 Alumni BBQ",
    date: "Spring 2026",
    location: "50 and 54 Senior Street",
    description:
      "A casual cookout for alumni to reconnect, meet chapter leadership, and keep the Mu Sigma thread alive.",
    photos: bbqPhotos.slice(0, 4)
  }
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Alumni events"
        title="What we have done so far, and what is coming next."
        description="PMD Open and the Spring Alumni BBQ are now part of the record. The 10th Year Anniversary and Homecoming will be added here as details come together."
        variant="events-hero"
        actions={[
          { label: "See recaps", href: "#done-so-far" },
          { label: "Join reminders", href: externalLinks.alumniNetwork, variant: "secondary" }
        ]}
      />

      <section className="page-section event-recaps" id="done-so-far">
        <SectionHeader
          eyebrow="Done so far"
          title="Recent Mu Sigma moments"
          description="These are the events already in the books, captured as a simple record for alumni who could not make it and want to remember it."
        />
        <div className="event-recap-stack">
          {eventRecaps.map((event) => (
            <article className="event-recap" key={event.title}>
              <div className="event-recap-copy">
                <p className="eyebrow">{event.eyebrow}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="detail-list">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
                {event.href ? (
                  <a className="text-link" href={event.href}>
                    View full recap
                  </a>
                ) : null}
              </div>
              <div className="event-photo-strip">
                {event.photos.map((photo) => (
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 760px) 50vw, 220px"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section muted" id="upcoming">
        <SectionHeader
          eyebrow="Upcoming"
          title="Next on the alumni calendar"
          description="The 10th Year Anniversary and Homecoming are not recaps yet. They will stay here as future moments until dates, locations, and registration details are ready."
        />
        <div className="event-ledger">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </section>
    </>
  );
}
