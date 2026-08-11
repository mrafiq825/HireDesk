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
    <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
      <Navbar />

      {/* Atmospheric Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#94B69E]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-[#94B69E]/5 rounded-full blur-[120px]" />
      </div>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-ai text-[#94B69E] text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#94B69E] animate-pulse" />
            <span>Next-Gen Enterprise AI Recruitment</span>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[#F3F7F4] tracking-tight leading-tight">
              Transform Talent Decisions with{" "}
              <span className="text-[#94B69E] drop-shadow-[0_0_25px_rgba(148,182,158,0.3)]">
                Glassmorphism AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#AAB8AF] max-w-3xl mx-auto leading-relaxed font-normal">
              Empower your recruitment team with deep resume intelligence, batch screening, candidate comparison, and automated fit analysis in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              to="/dashboard"
              className="btn-primary px-8 py-4 text-base font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-[#07110D]"
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
              <span>Launch HireDesk Workspace</span>
            </Link>
            <Link
              to="/about"
              className="btn-secondary px-8 py-4 text-base font-semibold rounded-2xl flex items-center justify-center gap-2"
            >
              <span>Explore Platform Features</span>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-16">
            <div className="glass-panel p-6 text-center">
              <p className="text-3xl font-bold text-[#94B69E]">70%</p>
              <p className="text-xs text-[#AAB8AF] mt-1 font-medium">Hiring Time Saved</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <p className="text-3xl font-bold text-[#94B69E]">500+</p>
              <p className="text-xs text-[#AAB8AF] mt-1 font-medium">Active HR Teams</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <p className="text-3xl font-bold text-[#94B69E]">10x</p>
              <p className="text-xs text-[#AAB8AF] mt-1 font-medium">Screening Speed</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <p className="text-3xl font-bold text-[#94B69E]">99.4%</p>
              <p className="text-xs text-[#AAB8AF] mt-1 font-medium">Match Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE CHALLENGE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="glass-badge glass-badge-danger mb-4">THE RECRUITMENT CHALLENGE</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#F3F7F4] mb-6 leading-tight">
                Traditional Screening is Broken & Time-Consuming
              </h2>
              <p className="text-[#AAB8AF] text-lg mb-8 leading-relaxed">
                Recruiting shouldn't consume your entire week. Manual resume reviews create bottlenecks, fatigue, and missed talent.
              </p>
              <div className="space-y-4">
                <div className="glass-panel p-5 border-l-4 border-l-[#E58B8B]">
                  <h3 className="text-lg font-semibold text-[#F3F7F4] mb-1">Hours Spent Reading Resumes</h3>
                  <p className="text-sm text-[#718078]">
                    Sifting through 100+ applicant PDFs consumes 25+ hours per opening, delaying critical hires.
                  </p>
                </div>
                <div className="glass-panel p-5 border-l-4 border-l-[#E4C58A]">
                  <h3 className="text-lg font-semibold text-[#F3F7F4] mb-1">Generic Interview Preparation</h3>
                  <p className="text-sm text-[#718078]">
                    Standardized interview questions fail to uncover real technical depth and leadership potential.
                  </p>
                </div>
                <div className="glass-panel p-5 border-l-4 border-l-[#E58B8B]">
                  <h3 className="text-lg font-semibold text-[#F3F7F4] mb-1">Inconsistent Candidate Comparisons</h3>
                  <p className="text-sm text-[#718078]">
                    Comparing applicants across unstructured resumes leads to subjective, error-prone hiring decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-elevated p-8 md:p-10 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#94B69E]/10 rounded-full blur-2xl" />
              <div className="relative space-y-6">
                <div className="text-center pb-6 border-b border-white/10">
                  <p className="text-xs text-[#718078] font-semibold uppercase tracking-wider">Traditional Hiring Cycle</p>
                  <h3 className="text-4xl font-bold text-[#E58B8B] mt-2">40+ Hours Wasted</h3>
                  <p className="text-sm text-[#AAB8AF] mt-1">Per individual job opening</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#AAB8AF]">Manual Resume Screening</span>
                      <span className="text-[#E58B8B] font-semibold">25 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E58B8B] w-4/5 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#AAB8AF]">Interview Question Prep</span>
                      <span className="text-[#E4C58A] font-semibold">10 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E4C58A] w-2/5 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#AAB8AF]">Admin & Coordination</span>
                      <span className="text-[#AAB8AF] font-semibold">5 hrs</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/20 w-1/5 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-[#94B69E]">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-sm">HireDesk reduces total cycle time down to 12 hours.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES / FOUR TOOLS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="glass-badge glass-badge-primary">AI PLATFORM MODULES</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F3F7F4]">
              Four Precision Tools for Every Hiring Stage
            </h2>
            <p className="text-lg text-[#AAB8AF]">
              Designed to handle everything from high-volume screening to executive candidate evaluations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#F3F7F4]">Smart Review</h3>
                <p className="text-[#94B69E] text-xs font-semibold uppercase tracking-wider">Deep Individual Analysis</p>
                <p className="text-sm text-[#AAB8AF] leading-relaxed">
                  Comprehensive candidate assessment covering technical skill fit, leadership readiness, red flags, and customized interview question sets.
                </p>
              </div>
              <Link to="/hiredesk-analyze" className="mt-8 text-sm font-semibold text-[#94B69E] hover:underline flex items-center gap-1">
                <span>Start Review</span>
                <span>→</span>
              </Link>
            </div>

            <div className="glass-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#F3F7F4]">Smart Screening</h3>
                <p className="text-[#94B69E] text-xs font-semibold uppercase tracking-wider">Batch Resume Analysis</p>
                <p className="text-sm text-[#AAB8AF] leading-relaxed">
                  Analyze batches of 2-10 resumes concurrently. Get automated applicant rankings and comparative scorecards.
                </p>
              </div>
              <Link to="/batch-analyze" className="mt-8 text-sm font-semibold text-[#94B69E] hover:underline flex items-center gap-1">
                <span>Screen Batch</span>
                <span>→</span>
              </Link>
            </div>

            <div className="glass-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#F3F7F4]">Find Best Fit</h3>
                <p className="text-[#94B69E] text-xs font-semibold uppercase tracking-wider">Side-by-Side Comparison</p>
                <p className="text-sm text-[#AAB8AF] leading-relaxed">
                  Evaluate top candidates against key position requirements to pinpoint the single best hire for your team.
                </p>
              </div>
              <Link to="/compare-resumes" className="mt-8 text-sm font-semibold text-[#94B69E] hover:underline flex items-center gap-1">
                <span>Compare Now</span>
                <span>→</span>
              </Link>
            </div>

            <div className="glass-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#F3F7F4]">Quick Screen</h3>
                <p className="text-[#94B69E] text-xs font-semibold uppercase tracking-wider">Binary FIT / REJECT</p>
                <p className="text-sm text-[#AAB8AF] leading-relaxed">
                  Rapidly filter large applicant pools using AI criteria matching to isolate qualified candidates instantly.
                </p>
              </div>
              <Link to="/selection-candidates" className="mt-8 text-sm font-semibold text-[#94B69E] hover:underline flex items-center gap-1">
                <span>Quick Filter</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto glass-ai p-12 md:p-16 rounded-3xl text-center border border-[#94B69E]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#94B69E]/15 rounded-full blur-3xl" />
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#F3F7F4]">
              Ready to Upgrade Your Hiring Workflow?
            </h2>
            <p className="text-[#AAB8AF] text-lg">
              Start evaluating candidate resumes with enterprise AI intelligence today. Free 10 initial upload credits included.
            </p>
            <div className="pt-4">
              <Link to="/dashboard" className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl">
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
