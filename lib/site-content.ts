export const siteName = "PMD Mu Sigma Alumni Association";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Impact Fund", href: "/impact-fund" },
  { label: "Events", href: "/events" },
  { label: "Chapter", href: "/chapter" },
  { label: "Alumni", href: "/alumni" },
  { label: "Finance", href: "/finance" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" }
];

export const externalLinks = {
  alumniNetwork: "/alumni#join-network",
  calendar: "/events#calendar",
  wishlist: "/chapter#chapter-needs",
  newsletterSignup: "/newsletter#signup",
  instagram: "/chapter#social-highlights",
  pmdOpenRegistration: "/pmd-open#registration",
  pmdOpenSponsorship: "/pmd-open#sponsorship",
  bylaws: "/about#documents",
  updateForm: "/alumni#update-info"
};

export const heroImages = [
  { src: "/hero-slide-1.jpeg", alt: "PMD Mu Sigma alumni and chapter gathering" },
  { src: "/hero-slide-2.jpeg", alt: "PMD Mu Sigma brotherhood event" },
  { src: "/hero-slide-3.jpeg", alt: "PMD Mu Sigma alumni impact event" },
  { src: "/hero-slide-4.jpeg", alt: "PMD Mu Sigma chapter milestone" },
  { src: "/hero-slide-5.jpeg", alt: "PMD Mu Sigma alumni community" }
];

export const pmdOpenPhotos = [
  { src: "/pmd-open/pmd-open-5.jpg", alt: "PMD Open sponsor table with raffle prizes and Rutgers mascot", width: 4032, height: 3024 },
  { src: "/pmd-open/pmd-open-6.jpg", alt: "PMD Open raffle table and alumni volunteers", width: 4032, height: 3024 },
  { src: "/pmd-open/pmd-open-4.jpg", alt: "PMD Open group photo with golfers and Rutgers mascot", width: 3696, height: 2772 },
  { src: "/pmd-open/pmd-open-3.jpg", alt: "PMD Open prize winners and event volunteers", width: 4608, height: 3456 },
  { src: "/pmd-open/pmd-open-9.jpg", alt: "PMD Open brothers gathered on the course", width: 1560, height: 1162 },
  { src: "/pmd-open/pmd-open-7.jpg", alt: "Rutgers mascot and Chick-fil-A mascot at the PMD Open", width: 1170, height: 1560 },
  { src: "/pmd-open/pmd-open-8.jpg", alt: "Rutgers mascot with PMD Open attendees", width: 878, height: 1560 },
  { src: "/pmd-open/pmd-open-1.jpg", alt: "PMD Open group riding golf carts", width: 4292, height: 3456 },
  { src: "/pmd-open/pmd-open-2.jpg", alt: "PMD Open golfer on the course", width: 3993, height: 2728 }
];

export const sponsorLogos = [
  { name: "Scarlet Pub", src: "/sponsors/scarlet-pub.png", width: 1145, height: 599 },
  { name: "Tacoria", src: "/sponsors/tacoria.jpg", width: 1200, height: 627 },
  { name: "Knights Public House", src: "/sponsors/knights-public-house.png", width: 600, height: 232 },
  { name: "Olde Queens Tavern", src: "/sponsors/olde-queens-tavern.jpg", width: 720, height: 600 },
  { name: "Chick-fil-A North Brunswick", src: "/sponsors/chick-fil-a-north-brunswick.png", width: 5100, height: 3300 },
  { name: "Victoria's", src: "/sponsors/victorias.png", width: 547, height: 298 },
  { name: "PMD Alumni Impact Fund", src: "/sponsors/pmd-alumni-impact-fund.png", width: 1536, height: 1024 },
  { name: "Evelyn's Papyrus", src: "/sponsors/evelyns-papyrus.png", width: 457, height: 96 },
  { name: "Stress Factory", src: "/sponsors/stress-factory.png", width: 1920, height: 586 }
];

export const heroProofPoints = [
  { label: "Impact Fund", description: "Live giving tracker foundation" },
  { label: "Events", description: "Calendar and registration hub" },
  { label: "Chapter", description: "Updates without private data" },
  { label: "Finance", description: "Transparent public summaries" }
];

export const impactStats = [
  { value: "Live", label: "Impact Fund donations" },
  { value: "Open", label: "Alumni network intake" },
  { value: "Annual", label: "PMD Open planning" },
  { value: "Ongoing", label: "Chapter support pipeline" }
];

export const alumniPathways = [
  {
    eyebrow: "Give",
    title: "Fund the next chapter year",
    description: "Support service, scholarship-style awards, leadership development, and chapter sustainability.",
    cta: "View the Impact Fund",
    href: "/impact-fund"
  },
  {
    eyebrow: "Attend",
    title: "Show up where alumni gather",
    description: "Find public events, PMD Open details, and save-the-date moments for the year ahead.",
    cta: "Browse events",
    href: "/events"
  },
  {
    eyebrow: "Reconnect",
    title: "Help the network get smarter",
    description: "Share updated contact details, career notes, and mentorship interest through the alumni network hub.",
    cta: "Join the network",
    href: externalLinks.alumniNetwork
  },
  {
    eyebrow: "Read",
    title: "Stay current in five minutes",
    description: "Follow chapter wins, alumni notes, governance updates, and practical calls for support.",
    cta: "Read updates",
    href: "/newsletter"
  }
];

export const updateCards = [
  {
    eyebrow: "Upcoming event",
    title: "Alumni Weekend Planning",
    description: "The alumni calendar highlights receptions, chapter moments, and reunion-style gatherings as details become available.",
    href: "/events"
  },
  {
    eyebrow: "Newsletter",
    title: "Alumni Update Digest",
    description: "A short recurring digest covers chapter wins, PMD Open planning, service highlights, and ways alumni can plug in.",
    href: "/newsletter"
  },
  {
    eyebrow: "Chapter achievement",
    title: "Service and Philanthropy Recap",
    description: "The chapter can share public outcomes so alumni can see how support becomes durable impact.",
    href: "/chapter"
  },
  {
    eyebrow: "Governance",
    title: "Association Governance Notes",
    description: "Governance and tax language stays clear, conservative, and aligned with official association records.",
    href: "/about"
  }
];

export const events = [
  {
    title: "Alumni Weekend",
    date: "Date to be announced",
    location: "Campus location to be announced",
    description: "A weekend built around connection, chapter updates, and a clear path for alumni who want to support the next year of impact.",
    ctaLabel: "Join reminders",
    ctaHref: externalLinks.alumniNetwork
  },
  {
    title: "Homecoming Gathering",
    date: "Date to be announced",
    location: "Tailgate location to be announced",
    description: "A low-friction gathering point for alumni, families, and chapter leadership around Homecoming weekend.",
    ctaLabel: "Join reminders",
    ctaHref: externalLinks.alumniNetwork
  },
  {
    title: "PMD Open",
    date: "Spring 2026",
    location: "Rutgers University Golf Course",
    description: "The annual alumni golf outing supporting Scramble for the Kids, Embrace Kids Foundation, chapter sustainability, and alumni engagement.",
    ctaLabel: "View event",
    ctaHref: "/pmd-open"
  },
  {
    title: "Service Showcase",
    date: "Timing to be announced",
    location: "Campus location to be announced",
    description: "A short alumni-facing recap of service initiatives and the outcomes made possible by consistent alumni support.",
    ctaLabel: "Get updates",
    ctaHref: externalLinks.newsletterSignup
  }
];

export const financeCategories = [
  { label: "Chapter operations", percent: 34, description: "Room reservations, supplies, leadership tools, and non-sensitive operating needs." },
  { label: "Philanthropy", percent: 24, description: "Service events, beneficiary support, and community-facing projects." },
  { label: "Scholarships", percent: 20, description: "Awards or scholarship-style support governed by association policy." },
  { label: "Leadership development", percent: 14, description: "Training, conferences, and officer transition resources." },
  { label: "Sustainability reserve", percent: 8, description: "A modest buffer for continuity across school years." }
];

export const newsletterIssues = [
  {
    title: "PMD Alumni Brief",
    date: "Latest issue",
    description: "Chapter wins, alumni notes, PMD Open planning, and a first look at the Impact Fund dashboard."
  },
  {
    title: "Year-End Recap",
    date: "Archive issue",
    description: "A concise recap of service, brotherhood, recruitment, and alumni participation from the fall term."
  },
  {
    title: "PMD Open Save-the-Date",
    date: "Event notice",
    description: "Registration timeline, sponsorship opportunities, and early volunteer needs for the annual golf outing."
  }
];

export const boardMembers = [
  {
    name: "Association President",
    role: "President",
    contactHref: "/about#contact",
    contactLabel: "Contact through governance page",
    bio: "Leads alumni association priorities, board coordination, and the public message to alumni."
  },
  {
    name: "Alumni Engagement Lead",
    role: "Vice President",
    contactHref: "/alumni#join-network",
    contactLabel: "Join the alumni network",
    bio: "Coordinates alumni connection, event follow-up, and paths for graduates who want to stay involved."
  },
  {
    name: "Finance Stewardship Lead",
    role: "Treasurer",
    contactHref: "/finance",
    contactLabel: "View finance overview",
    bio: "Maintains donation reporting discipline, public finance summaries, and stewardship practices."
  },
  {
    name: "Communications Lead",
    role: "Secretary",
    contactHref: "/newsletter#signup",
    contactLabel: "Follow newsletter updates",
    bio: "Keeps records, newsletters, and public updates organized for alumni and chapter stakeholders."
  }
];

export const alumniSpotlights = [
  {
    name: "Mentorship",
    classYear: "Alumni pathway",
    description: "Alumni can help newer graduates and active brothers through career guidance, introductions, and practical advice."
  },
  {
    name: "Event Support",
    classYear: "Alumni pathway",
    description: "Volunteers can make PMD Open, Homecoming, and reunion moments easier to plan and easier to attend."
  },
  {
    name: "Recurring Giving",
    classYear: "Alumni pathway",
    description: "Small monthly gifts create the predictability that lets the chapter plan beyond one-off appeals."
  }
];
