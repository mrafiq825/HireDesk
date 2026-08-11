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
    <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
      <Navbar />

      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#94B69E]/10 blur-[130px] pointer-events-none" />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-5xl mx-auto space-y-6">
        <span className="glass-badge glass-badge-primary">OUR RECRUITMENT MISSION</span>
        <h1 className="text-4xl sm:text-6xl font-bold text-[#F3F7F4] tracking-tight">
          Pioneering Glassmorphism <span className="text-[#94B69E]">AI Recruitment</span>
        </h1>
        <p className="text-lg text-[#AAB8AF] leading-relaxed max-w-3xl mx-auto">
          HireDesk delivers intelligent talent analysis tools that empower recruiters to evaluate candidates with extreme clarity, confidence, and speed.
        </p>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#F3F7F4]">Built for HR Professionals</h2>
            <p className="text-sm text-[#AAB8AF] leading-relaxed">
              Recruitment cycles shouldn't take weeks. HireDesk removes manual fatigue by automating resume parsing, qualification scoring, skill mapping, and candidate comparisons.
            </p>
          </div>

          <div className="glass-panel p-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#F3F7F4]">Enterprise Security & Privacy</h2>
            <p className="text-sm text-[#AAB8AF] leading-relaxed">
              Every candidate document processed through HireDesk is handled with strict confidentiality, encrypted transmission, and strict WCAG accessibility guidelines.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/dashboard" className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl">
            Explore Dashboard
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
