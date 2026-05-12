import Link from "next/link";

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function EventCard({ title, date, location, description, ctaLabel, ctaHref }: EventCardProps) {
  const cta = ctaHref.startsWith("/") ? (
    <Link className="text-link" href={ctaHref}>
      {ctaLabel}
    </Link>
  ) : (
    <a className="text-link" href={ctaHref}>
      {ctaLabel}
    </a>
  );

  return (
    <article className="content-card event-card">
      <p className="eyebrow">{date}</p>
      <h3>{title}</h3>
      <p className="event-location">{location}</p>
      <p>{description}</p>
      {cta}
    </article>
  );
}
