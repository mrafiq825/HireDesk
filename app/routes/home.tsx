import { Link } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

const SITE_URL = "https://hiredesk.vercel.app";
const PAGE_TITLE =
  "HireDesk — AI-Powered Hiring Platform: Smart Review, Screening, Comparison & Selection";
const PAGE_DESCRIPTION =
  "Transform your entire hiring workflow with HireDesk's four AI-powered tools. Deep individual analysis, batch screening (2-10 resumes), side-by-side candidate comparison, and instant binary screening. Join 500+ companies saving 70% hiring time.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "HireDesk",
      url: SITE_URL,
      description: PAGE_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free plan — 10 resume analyses per user",
      },
      featureList: [
        "AI Resume Analysis",
        "Batch Resume Screening",
        "Candidate Comparison",
        "Smart Interview Questions",
        "Personality & Leadership Insights",
      ],
    },
    {
      "@type": "Organization",
      name: "HireDesk",
      url: SITE_URL,
      sameAs: [
        "https://x.com/mrafiq825",
        "https://www.linkedin.com/in/mrafiq825/",
        "https://www.instagram.com/dmrafiq825/",
      ],
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: PAGE_TITLE },
    { name: "description", content: PAGE_DESCRIPTION },

    // Canonical
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/` },

    // Open Graph
    { property: "og:url", content: `${SITE_URL}/` },
    { property: "og:title", content: PAGE_TITLE },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { property: "og:type", content: "website" },

    // Twitter Card
    { name: "twitter:title", content: PAGE_TITLE },
    { name: "twitter:description", content: PAGE_DESCRIPTION },

    // Keywords
    {
      name: "keywords",
      content:
        "Resume Review AI, Candidate Screening Software, AI Resume Analysis, Applicant Tracking System, Talent Intelligence Platform, Resume Intelligence, AI hiring platform, recruitment tool, batch resume analysis, HireDesk, HR technology",
    },

    // JSON-LD structured data
    {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  ];
}

const Home = () => {
  return (
    <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#1B1B1B] border border-[rgba(212,175,55,0.4)] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Enterprise AI Recruitment</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F5E6C8] tracking-tight leading-tight">
              Transform Talent Decisions with{" "}
              <span className="text-[#D4AF37]">Precision AI</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Empower your recruitment team with deep resume intelligence, batch
              screening, candidate comparison, and automated fit analysis in
              seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link
              to="/dashboard"
              className="btn-primary px-7 py-3 text-sm font-semibold rounded-[6px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch HireDesk Workspace</span>
              <span>→</span>
            </Link>
            <Link
              to="/about"
              className="btn-secondary px-7 py-3 text-sm font-semibold rounded-[6px] flex items-center justify-center gap-2"
            >
              <span>Explore Platform Features</span>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-14">
            <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-5 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                70%
              </p>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">
                Hiring Time Saved
              </p>
            </div>
            <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-5 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                500+
              </p>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">
                Active HR Teams
              </p>
            </div>
            <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-5 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                10x
              </p>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">
                Screening Speed
              </p>
            </div>
            <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-5 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                99.4%
              </p>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">
                Match Accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE CHALLENGE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-[rgba(107,114,128,0.2)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="glass-badge glass-badge-danger mb-4 rounded-[4px]">
                THE RECRUITMENT CHALLENGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5E6C8] mb-4 leading-tight">
                Traditional Screening is Broken & Time-Consuming
              </h2>
              <p className="text-[#6B7280] text-sm sm:text-base mb-6 leading-relaxed">
                Recruiting shouldn't consume your entire week. Manual resume
                reviews create bottlenecks, fatigue, and missed talent.
              </p>
              <div className="space-y-3">
                <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-4 border-l-4 border-l-[#EF4444]">
                  <h3 className="text-sm font-bold text-[#F5E6C8] mb-1">
                    Hours Spent Reading Resumes
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Sifting through 100+ applicant PDFs consumes 25+ hours per
                    opening, delaying critical hires.
                  </p>
                </div>
                <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-4 border-l-4 border-l-[#F59E0B]">
                  <h3 className="text-sm font-bold text-[#F5E6C8] mb-1">
                    Generic Interview Preparation
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Standardized interview questions fail to uncover real
                    technical depth and leadership potential.
                  </p>
                </div>
                <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-4 border-l-4 border-l-[#EF4444]">
                  <h3 className="text-sm font-bold text-[#F5E6C8] mb-1">
                    Inconsistent Candidate Comparisons
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Comparing applicants across unstructured resumes leads to
                    subjective, error-prone hiring decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-6 sm:p-8">
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-[rgba(107,114,128,0.2)]">
                  <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider">
                    Traditional Hiring Cycle
                  </p>
                  <h3 className="text-3xl font-bold text-[#EF4444] mt-2">
                    40+ Hours Wasted
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Per individual job opening
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">
                        Manual Resume Screening
                      </span>
                      <span className="text-[#EF4444] font-semibold">
                        25 hrs
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden border border-[rgba(107,114,128,0.2)]">
                      <div className="h-full bg-[#EF4444] w-4/5 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">
                        Interview Question Prep
                      </span>
                      <span className="text-[#F59E0B] font-semibold">
                        10 hrs
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden border border-[rgba(107,114,128,0.2)]">
                      <div className="h-full bg-[#F59E0B] w-2/5 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">
                        Admin & Coordination
                      </span>
                      <span className="text-[#6B7280] font-semibold">
                        5 hrs
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden border border-[rgba(107,114,128,0.2)]">
                      <div className="h-full bg-[#6B7280] w-1/5 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(107,114,128,0.2)] flex items-center gap-3 text-[#D4AF37]">
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-xs text-[#F5E6C8]">
                    HireDesk reduces total cycle time down to 12 hours.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES / FOUR TOOLS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="glass-badge glass-badge-primary rounded-[4px]">
              PLATFORM MODULES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5E6C8]">
              Four Precision Tools for Every Hiring Stage
            </h2>
            <p className="text-sm text-[#6B7280]">
              Designed to handle everything from high-volume screening to
              executive candidate evaluations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#F5E6C8]">
                  Smart Review
                </h3>
                <p className="text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider">
                  Deep Individual Analysis
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Comprehensive candidate assessment covering technical skill
                  fit, leadership readiness, red flags, and customized interview
                  questions.
                </p>
              </div>
              <Link
                to="/hiredesk-analyze"
                className="mt-6 text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Start Review</span>
                <span>→</span>
              </Link>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#F5E6C8]">
                  Smart Screening
                </h3>
                <p className="text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider">
                  Batch Resume Analysis
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Analyze batches of 2-10 resumes concurrently. Get automated
                  applicant rankings and comparative scorecards.
                </p>
              </div>
              <Link
                to="/batch-analyze"
                className="mt-6 text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Screen Batch</span>
                <span>→</span>
              </Link>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#F5E6C8]">
                  Find Best Fit
                </h3>
                <p className="text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider">
                  Side-by-Side Comparison
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Evaluate top candidates against key position requirements to
                  pinpoint the single best hire for your team.
                </p>
              </div>
              <Link
                to="/compare-resumes"
                className="mt-6 text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Compare Now</span>
                <span>→</span>
              </Link>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#F5E6C8]">
                  Quick Screen
                </h3>
                <p className="text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider">
                  Binary FIT / REJECT
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Rapidly filter large applicant pools using AI criteria
                  matching to isolate qualified candidates instantly.
                </p>
              </div>
              <Link
                to="/selection-candidates"
                className="mt-6 text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Quick Filter</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#1B1B1B] p-10 md:p-14 rounded-[6px] text-center border border-[rgba(212,175,55,0.3)]">
          <div className="space-y-5 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5E6C8]">
              Ready to Upgrade Your Hiring Workflow?
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Start evaluating candidate resumes with enterprise AI intelligence
              today. Free 10 initial upload credits included.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard"
                className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-[6px]"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
