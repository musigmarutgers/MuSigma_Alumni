import Link from "next/link";
import { alumniPathways } from "@/lib/site-content";

function PathwayLink({
  href,
  children
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  if (href.startsWith("/")) {
    return (
      <Link className="pathway-link" href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className="pathway-link" href={href}>
      {children}
    </a>
  );
}

export function AlumniPathways() {
  return (
    <section className="page-section pathway-section" aria-labelledby="alumni-pathways-heading">
      <div className="pathway-intro">
        <p className="eyebrow">Start here</p>
        <h2 id="alumni-pathways-heading">Choose the kind of impact you want to make.</h2>
      </div>
      <div className="pathway-list">
        {alumniPathways.map((pathway, index) => (
          <PathwayLink key={pathway.title} href={pathway.href}>
            <span className="pathway-index" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="pathway-eyebrow">{pathway.eyebrow}</span>
            <strong>{pathway.title}</strong>
            <span>{pathway.description}</span>
            <em>{pathway.cta}</em>
          </PathwayLink>
        ))}
      </div>
    </section>
  );
}
