import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  variant: string;
  actions?: HeroAction[];
};

function HeroActionLink({ action }: Readonly<{ action: HeroAction }>) {
  const className = `button ${action.variant === "secondary" ? "secondary on-dark" : "primary"}`;

  if (action.href.startsWith("/")) {
    return (
      <Link className={className} href={action.href}>
        {action.label}
      </Link>
    );
  }

  return (
    <a className={className} href={action.href}>
      {action.label}
    </a>
  );
}

export function PageHero({ eyebrow, title, description, variant, actions = [] }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-visual ${variant}`}>
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions.length > 0 ? (
          <div className="button-row">
            {actions.map((action) => (
              <HeroActionLink key={action.label} action={action} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
