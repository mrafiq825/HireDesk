import Footer from "~/components/layout/Footer";
import type { Route } from "../routes/+types/about";
import Navbar from "@layout/Navbar";
import { Link } from "react-router";

const SITE_URL = "https://hiredesk.app";
const PAGE_TITLE =
  "About HireDesk — AI-Powered Hiring Platform Built for Recruiters";
const PAGE_DESCRIPTION =
  "Discover how HireDesk's four AI-powered tools — Smart Review, Smart Screening, Find Best Fit, and Quick Screen — transform your hiring workflow. Built exclusively for recruiters and HR teams to save 70% hiring time.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HireDesk",
  url: SITE_URL,
  description: PAGE_DESCRIPTION,
  foundingDate: "2024",
  applicationCategory: "HR Technology, AI Recruitment",
  sameAs: [
    "https://x.com/mrafiq825",
    "https://www.linkedin.com/in/mrafiq825/",
    "https://www.instagram.com/dmrafiq825/",
  ],
  knowsAbout: [
    "AI Resume Screening",
    "Candidate Evaluation",
    "HR Technology",
    "Talent Acquisition",
    "Recruitment Automation",
  ],
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: PAGE_TITLE },
    { name: "description", content: PAGE_DESCRIPTION },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/about` },
    { property: "og:url", content: `${SITE_URL}/about` },
    { property: "og:title", content: PAGE_TITLE },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { property: "og:type", content: "website" },
    { name: "twitter:title", content: PAGE_TITLE },
    { name: "twitter:description", content: PAGE_DESCRIPTION },
    {
      name: "keywords",
      content:
        "HireDesk, AI-Powered Hiring Platform, Smart Review, Smart Screening, Find Best Fit, Quick Screen, AI Hiring Assistant, Resume Review AI, Candidate Screening Software, AI Resume Analysis",
    },
    { "script:ld+json": JSON.stringify(jsonLd) },
  ];
}

const About = () => {
  return (
    <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-5xl mx-auto space-y-4">
        <span className="glass-badge glass-badge-primary rounded-[4px]">
          OUR RECRUITMENT MISSION
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#F5E6C8] tracking-tight">
          Pioneering Intelligent{" "}
          <span className="text-[#D4AF37]">AI Recruitment</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
          HireDesk delivers precision talent analysis tools that empower
          recruiters to evaluate candidates with extreme clarity, confidence,
          and speed.
        </p>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-bold text-[#F5E6C8]">
              Built for HR Professionals
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Recruitment cycles shouldn't take weeks. HireDesk removes manual
              fatigue by automating resume parsing, qualification scoring, skill
              mapping, and candidate comparisons.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-bold text-[#F5E6C8]">
              Enterprise Security & Privacy
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Every candidate document processed through HireDesk is handled
              with strict confidentiality, encrypted transmission, and strict
              WCAG accessibility guidelines.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/dashboard"
            className="btn-primary px-7 py-3 text-xs sm:text-sm font-semibold rounded-[6px]"
          >
            Explore Dashboard
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
