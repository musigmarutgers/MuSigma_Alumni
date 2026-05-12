import { CalloutBand } from "@/components/CalloutBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { externalLinks } from "@/lib/site-content";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About and governance"
        title="A public foundation for legitimacy and trust."
        description="The association should explain its mission, governance, contact paths, and document access in direct language."
        variant="about-hero"
        actions={[
          { label: "TODO: View bylaws PDF", href: externalLinks.bylaws },
          { label: "Executive Board", href: "/executive-board", variant: "secondary" }
        ]}
      />

      <section className="page-section two-column mission-section">
        <div>
          <SectionHeader eyebrow="Mission" title="Support the chapter without losing the alumni thread." />
          <p>
            The PMD Mu Sigma Alumni Association exists to connect alumni, strengthen chapter sustainability, support
            service and scholarship, and preserve the brotherhood across graduating classes.
          </p>
          <p>
            TODO: Replace this mission with board-approved wording and confirm whether a Board of Trustees or alumni
            advisory structure should be named publicly.
          </p>
        </div>
        <article className="contact-stack">
          <p className="eyebrow">Contact</p>
          <h3>Role-based email placeholders</h3>
          <a href="mailto:TODO:alumni@musigma.org">TODO:alumni@musigma.org</a>
          <a href="mailto:TODO:impactfund@musigma.org">TODO:impactfund@musigma.org</a>
          <a href="mailto:TODO:events@musigma.org">TODO:events@musigma.org</a>
        </article>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="FAQ" title="Questions alumni will ask first" align="center" />
        <div className="faq-list">
          {[
            ["How do I join?", "TODO: Link the alumni network form, email list, or groupchat intake."],
            ["How do I support the Impact Fund?", "Use the Impact Fund page to start a Stripe Checkout session."],
            ["Are contributions tax-deductible?", "TODO: Use final tax/legal language only after status and receipt process are confirmed."],
            ["How do I update my info?", "TODO: Link a simple alumni update form."]
          ].map(([question, answer], index) => (
            <article key={question}>
              <span>0{index + 1}</span>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <CalloutBand
        eyebrow="Documents"
        title="TODO: Publish bylaws or governance PDFs when approved."
        description="Keep public governance documents easy to find, and avoid publishing drafts or sensitive internal records."
        primaryLabel="TODO: View bylaws PDF"
        primaryHref={externalLinks.bylaws}
        secondaryLabel="Executive Board"
        secondaryHref="/executive-board"
      />
    </>
  );
}
