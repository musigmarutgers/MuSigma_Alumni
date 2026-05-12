import Link from "next/link";
import { externalLinks, siteName } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Built for alumni connection</p>
        <h2>{siteName}</h2>
        <p>
          A public home for chapter updates, transparent impact, alumni events, and the PMD Impact Fund.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/impact-fund">Support the Impact Fund</Link>
        <Link href="/events">View events</Link>
        <a href={externalLinks.alumniNetwork}>TODO: Join the network</a>
        <a href="mailto:TODO:alumni@musigma.org">TODO: Contact alumni board</a>
      </div>
    </footer>
  );
}
