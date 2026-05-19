import Link from "next/link";

type CalloutBandProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CalloutBand({
  id,
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: CalloutBandProps) {
  return (
    <section className="callout-band" id={id}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="button-row">
        {primaryHref.startsWith("/") ? (
          <Link className="button primary" href={primaryHref}>
            {primaryLabel}
          </Link>
        ) : (
          <a className="button primary" href={primaryHref}>
            {primaryLabel}
          </a>
        )}
        {secondaryLabel && secondaryHref ? (
          secondaryHref.startsWith("/") ? (
            <Link className="button secondary" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : (
            <a className="button secondary" href={secondaryHref}>
              {secondaryLabel}
            </a>
          )
        ) : null}
      </div>
    </section>
  );
}
