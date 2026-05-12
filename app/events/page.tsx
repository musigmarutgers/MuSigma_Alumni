import { CalloutBand } from "@/components/CalloutBand";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { events, externalLinks } from "@/lib/site-content";

export const metadata = {
  title: "Events"
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Alumni events"
        title="Keep alumni connected before they drift away."
        description="A public calendar, save-the-dates, RSVP links, and recurring reminders make it easier for alumni to show up."
        variant="events-hero"
        actions={[
          { label: "Open calendar", href: externalLinks.calendar },
          { label: "Join reminders", href: externalLinks.alumniNetwork, variant: "secondary" }
        ]}
      />

      <CalloutBand
        eyebrow="Calendar"
        title="TODO: Connect the public alumni calendar."
        description="Use a Google Calendar or Outlook-compatible public calendar link so alumni can subscribe once and keep every event on their radar."
        primaryLabel="TODO: Open public calendar"
        primaryHref={externalLinks.calendar}
        secondaryLabel="Join reminders"
        secondaryHref={externalLinks.alumniNetwork}
      />

      <section className="page-section event-rhythm">
        <SectionHeader
          eyebrow="Event rhythm"
          title="A better year of alumni moments."
          description="The strongest event pages do more than list dates. They show the cadence alumni can trust."
        />
        <div className="rhythm-list">
          {[
            ["Announce early", "Publish save-the-dates while details are still being finalized."],
            ["Make RSVP obvious", "Keep the main action visible and avoid burying registration in long copy."],
            ["Follow up fast", "Post photos, totals, and next steps while the event still feels alive."]
          ].map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Save the date" title="Upcoming alumni moments" />
        <div className="event-ledger">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </section>
    </>
  );
}
