import Footer from "~/components/layout/Footer";
import type { Route } from "../routes/+types/about";
import Navbar from "@layout/Navbar";

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

    // Canonical
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/about` },

    // Open Graph
    { property: "og:url", content: `${SITE_URL}/about` },
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
        "HireDesk, AI-Powered Hiring Platform, Smart Review, Smart Screening, Find Best Fit, Quick Screen, AI Hiring Assistant, Resume Review AI, Candidate Screening Software, AI Resume Analysis, Applicant Tracking System, Talent Intelligence Platform, Resume Intelligence, HireDesk about, recruiter AI, HR automation",
    },

    // JSON-LD structured data
    { "script:ld+json": JSON.stringify(jsonLd) },
  ];
}

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <Navbar />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 mb-8">
              <span className="text-blue-400 text-sm font-medium">
                AI Hiring Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              HireDesk: Your AI
              <span className="text-blue-400 block">Hiring Assistant</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              HireDesk is a standalone AI hiring platform. Explore our four
              AI-powered tools designed exclusively for recruiters and HR teams.
              Each is purpose-built to solve a specific hiring challenge, and
              together they create an intelligent, streamlined recruiting
              workflow for modern companies.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-3 py-1 bg-purple-600/20 rounded-full border border-purple-500/30">
                  <span className="text-purple-400 text-sm font-medium">
                    Built for Busy Recruiters
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Four Analysis Methods,
                  <span className="text-blue-400">
                    {" "}
                    One Specialized Platform
                  </span>
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">
                  HireDesk focuses exclusively on the hiring side. Whether you
                  need deep individual analysis, batch processing of multiple
                  resumes, side-by-side candidate comparisons, or quick binary
                  screening, HireDesk adapts to your workflow. Stop wasting time
                  on manual screening and let AI handle the heavy lifting across
                  all your hiring needs.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Our comprehensive platform eliminates time-wasting tasks so
                  you can focus on strategic decisions. Process one resume
                  deeply, analyze 10 simultaneously, or compare candidates
                  visually - all with persistent results and intelligent
                  insights.
                </p>
              </div>

              <div className="relative">
                <div className="bg-slate-800 rounded-3xl p-8 border border-gray-600 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">HD</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          Smart Screening Engine
                        </h3>
                        <p className="text-sm text-gray-300">
                          Instant candidate evaluation
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-400"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Time Saved</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div className="w-14 h-full bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-green-400 font-semibold">
                          70%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Faster Hires</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div className="w-12 h-full bg-purple-400 rounded-full animate-pulse delay-300"></div>
                        </div>
                        <span className="text-purple-400 font-semibold">
                          5x
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Better Matches</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div className="w-13 h-full bg-blue-400 rounded-full animate-pulse delay-600"></div>
                        </div>
                        <span className="text-blue-400 font-semibold">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Philosophy
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We believe great hiring starts with better tools, not harder
                work
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-3">
                  Intelligence Over Gut Feel
                </h3>
                <p className="text-gray-300">
                  Every hiring decision should be backed by data, not intuition.
                  Our AI provides objective insights to reduce bias and improve
                  outcomes.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-3">
                  Speed Without Sacrifice
                </h3>
                <p className="text-gray-300">
                  Fast screening shouldn't mean missing great candidates. We
                  combine speed with depth for intelligent hiring at scale.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-white mb-3">
                  Right Tool for Each Stage
                </h3>
                <p className="text-gray-300">
                  Hiring isn't one-size-fits-all. We built four specialized
                  tools so you can pick exactly what you need, when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Four Powerful Tools for Every Hiring Stage
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Each tool is purpose-built to solve a specific hiring challenge.
                Together, they create a complete recruiting ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 group">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Smart Review
                </h3>
                <p className="text-blue-300 text-sm font-semibold mb-4">
                  Single Resume Deep Dive
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Complete skill mapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Personality & leadership analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Tailored interview questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Career trajectory insights</span>
                  </div>
                </div>
                <p className="text-xs text-blue-300 bg-blue-500/10 px-3 py-2 rounded border border-blue-500/20">
                  Use before final interviews
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 group">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Smart Screening
                </h3>
                <p className="text-purple-300 text-sm font-semibold mb-4">
                  Batch Analysis (2-10 Resumes)
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Multi-resume processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Automated candidate ranking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Scoring & comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Top talent identification</span>
                  </div>
                </div>
                <p className="text-xs text-purple-300 bg-purple-500/10 px-3 py-2 rounded border border-purple-500/20">
                  After initial filtering
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 group">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Find Best Fit
                </h3>
                <p className="text-amber-300 text-sm font-semibold mb-4">
                  Candidate Comparison (2-5)
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Visual side-by-side analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Intelligent ranking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Strengths vs weaknesses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Objective decision framework</span>
                  </div>
                </div>
                <p className="text-xs text-amber-300 bg-amber-500/10 px-3 py-2 rounded border border-amber-500/20">
                  Final candidate selection
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 group">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Quick Screen
                </h3>
                <p className="text-emerald-300 text-sm font-semibold mb-4">
                  Binary FIT/REJECT (1-5)
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Instant decisions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Keyword & skill matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Job alignment check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Decision rationale</span>
                  </div>
                </div>
                <p className="text-xs text-emerald-300 bg-emerald-500/10 px-3 py-2 rounded border border-emerald-500/20">
                  Initial rapid screening
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Choose Your Analysis Method
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Select the perfect tool for your hiring scenario - from
                  individual deep dives to comprehensive batch processing,
                  comparisons, and binary screening.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Smart Review
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Deep dive into single resumes with personality analysis,
                    interview questions, and career insights.
                  </p>
                  <div className="text-xs text-blue-400 mt-3 font-semibold">
                    Final candidates
                  </div>
                </div>

                <div className="text-center p-6 bg-purple-600/10 rounded-2xl border border-purple-500/20">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2-10</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Smart Screening
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Process multiple resumes with automated ranking, scoring,
                    and top talent identification.
                  </p>
                  <div className="text-xs text-purple-400 mt-3 font-semibold">
                    Initial screening
                  </div>
                </div>

                <div className="text-center p-6 bg-amber-600/10 rounded-2xl border border-amber-500/20">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2-5</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Find Best Fit
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Visual comparison of top candidates with intelligent ranking
                    and objective framework.
                  </p>
                  <div className="text-xs text-amber-400 mt-3 font-semibold">
                    Final selection
                  </div>
                </div>

                <div className="text-center p-6 bg-emerald-600/10 rounded-2xl border border-emerald-500/20">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1-5</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Quick Screen
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Instant binary FIT/REJECT decisions with keyword matching
                    and job alignment.
                  </p>
                  <div className="text-xs text-emerald-400 mt-3 font-semibold">
                    Rapid screening
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Recruiters Choose HireDesk
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of recruiters who have transformed their hiring
                process
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-600/10 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-4">
                  Four Analysis Methods, One Specialized Platform
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  HireDesk is a standalone AI hiring platform. Whether you need
                  deep individual analysis, batch processing of multiple
                  resumes, side-by-side candidate comparisons, or quick binary
                  screening, HireDesk adapts to your workflow. Choose the right
                  tool for each hiring scenario.
                </p>
              </div>

              <div className="bg-purple-600/10 backdrop-blur-sm p-8 rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Persistent Results & Smart Insights
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Your analysis results are automatically saved across all
                  methods. Return anytime to review candidate evaluations. Get
                  AI-powered insights including personality assessments, career
                  trajectories, and tailored interview questions for every
                  candidate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Efficiency & Results
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that drive our time saving technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
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
                <h3 className="text-xl font-bold text-white mb-3">
                  Automation First
                </h3>
                <p className="text-gray-300">
                  We automate every repetitive task in your hiring process. From
                  resume parsing to interview scheduling, focus on what humans
                  do best.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Recruiter-Focused
                </h3>
                <p className="text-gray-300">
                  Built specifically for recruiters who need to move fast and
                  hire effectively. Every feature is designed to save you time
                  and reduce stress.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-gray-300">
                  Enterprise-grade security with 99.9% uptime. Your data is
                  protected and your hiring process never stops because of
                  technical issues.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-600/30">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Time Saved, Results Delivered
                </h2>
                <p className="text-xl text-gray-300">
                  Real impact for recruiters using HireDesk
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    70%
                  </div>
                  <div className="text-gray-300 font-medium">Time Saved</div>
                </div>
                <div className="group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                    5x
                  </div>
                  <div className="text-gray-300 font-medium">Faster Hires</div>
                </div>
                <div className="group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                    95%
                  </div>
                  <div className="text-gray-300 font-medium">
                    Better Matches
                  </div>
                </div>
                <div className="group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                    10K+
                  </div>
                  <div className="text-gray-300 font-medium">
                    Happy Recruiters
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default About;
