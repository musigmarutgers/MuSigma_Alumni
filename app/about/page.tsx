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
        description="The association explains its mission, governance, contact paths, and document access in direct language."
        variant="about-hero"
        actions={[
          { label: "Governance documents", href: externalLinks.bylaws },
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
            The site keeps governance language conservative and public-safe while the association maintains official
            records, officer responsibilities, and any formal documents through its approved operating process.
          </p>
        </div>
        <article className="contact-stack" id="contact">
          <p className="eyebrow">Contact</p>
          <h3>Start with the right page</h3>
          <a href={externalLinks.alumniNetwork}>Join the alumni network</a>
          <a href="/impact-fund">Support the Impact Fund</a>
          <a href="/events">View alumni events</a>
        </article>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="FAQ" title="Questions alumni will ask first" align="center" />
        <div className="faq-list">
          {[
            ["How do I join?", "Use the Alumni page to enter the network hub and follow the next available intake path."],
            ["How do I support the Impact Fund?", "Use the Impact Fund page to start a Stripe Checkout session."],
            ["Are contributions tax-deductible?", "Yes, contributions are fully tax-deductible. The Alumni Impact Fund is operated by the Mu Sigma Alumni Association, which is a registered 501(c)(3) nonprofit organization. All donations are processed through that entity - not the undergraduate chapter - and every contribution qualifies for a tax deduction. Donors will receive official receipts through Stripe upon payment. For any specific tax questions, reach out to Brian Buonauro at brianbuonauro@gmail.com or (551) 795-2182."],
            ["How do I update my info?", "Use the Alumni page to reach the update-info section and keep contact details current."]
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
        id="documents"
        eyebrow="Documents"
        title="Governance documents and public records."
        description="Keep public governance documents easy to find, and avoid publishing drafts or sensitive internal records."
        primaryLabel="Review governance"
        primaryHref={externalLinks.bylaws}
        secondaryLabel="Executive Board"
        secondaryHref="/executive-board"
      />
    </>
  );
}
