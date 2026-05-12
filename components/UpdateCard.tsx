import Link from "next/link";

type UpdateCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
};

export function UpdateCard({ eyebrow, title, description, href }: UpdateCardProps) {
  const content = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link className="content-card link-card" href={href}>
        {content}
      </Link>
    );
  }

  return <article className="content-card">{content}</article>;
}
