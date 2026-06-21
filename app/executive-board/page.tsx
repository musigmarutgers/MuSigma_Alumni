import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { boardMembers } from "@/lib/site-content";

export const metadata = {
  title: "Executive Board"
};

export default function ExecutiveBoardPage() {
  return (
    <>
      <PageHero
        eyebrow="Executive Board"
        title="Visible leadership gives alumni confidence."
        description="Leadership is presented by role so alumni can understand ownership, stewardship, and communication paths."
        variant="board-hero"
        actions={[
          { label: "Review governance", href: "/about" },
          { label: "Contact the board", href: "/about#contact", variant: "secondary" }
        ]}
      />

      <section className="page-section">
        <SectionHeader eyebrow="Leadership" title="Association Leadership" />
        <div className="board-grid">
          {boardMembers.map((member) => (
            <article className="content-card profile-card" key={member.role}>
              <Image src={member.image} alt={`${member.name}, ${member.role}`} width={180} height={180} />
              <p className="eyebrow">{member.role}</p>
              <h3>{member.name}</h3>
              <p>{member.bio}</p>
              {member.contactHref.startsWith("/") ? (
                <Link className="text-link" href={member.contactHref}>
                  {member.contactLabel}
                </Link>
              ) : (
                <a className="text-link" href={member.contactHref}>
                  {member.contactLabel}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="page-section muted leadership-letter">
        <article>
          <p className="eyebrow">President's Message</p>
          <h3>Vision, goals, and alumni ask</h3>
          <p>
            The board's public message should stay focused on this year's priorities, visible progress, and the exact
            ways alumni can help.
          </p>
        </article>
        <article>
          <p className="eyebrow">Roles and responsibilities</p>
          <h3>Keep the org chart understandable.</h3>
          <p>
            Chair responsibilities, committees, and working groups belong here when they are part of the public operating
            model.
          </p>
        </article>
      </section>
    </>
  );
}
