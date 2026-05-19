import { CalloutBand } from "@/components/CalloutBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { externalLinks, newsletterIssues } from "@/lib/site-content";

export const metadata = {
  title: "Newsletter"
};

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        title="A central archive for alumni updates."
        description="Give alumni one reliable place to find past issues, upcoming events, chapter wins, and Impact Fund progress."
        variant="newsletter-hero"
        actions={[
          { label: "Sign up for updates", href: externalLinks.newsletterSignup },
          { label: "Submit alumni news", href: externalLinks.updateForm, variant: "secondary" }
        ]}
      />

      <CalloutBand
        id="signup"
        eyebrow="Signup"
        title="The newsletter signup hub keeps alumni close to the work."
        description="The signup path gives alumni a low-friction way to receive event reminders and chapter updates."
        primaryLabel="Sign up for updates"
        primaryHref={externalLinks.newsletterSignup}
        secondaryLabel="Submit alumni news"
        secondaryHref={externalLinks.updateForm}
      />

      <section className="page-section">
        <SectionHeader eyebrow="Archive" title="Issue archive" />
        <div className="issue-list">
          {newsletterIssues.map((issue, index) => (
            <article key={issue.title}>
              <span>0{index + 1}</span>
              <p className="eyebrow">{issue.date}</p>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section muted">
        <SectionHeader eyebrow="Highlights" title="Recurring issue sections" align="center" />
        <div className="newsletter-slots">
          {["Alumni spotlights", "Chapter wins", "Upcoming events", "Impact Fund updates"].map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
              <p>Each issue includes a short, repeatable slot for {item.toLowerCase()}.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
