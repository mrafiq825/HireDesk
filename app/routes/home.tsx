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
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 bg-grid-white/[0.02] opacity-50"></div>
      <section className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-7xl md:text-9xl lg:text-10xl font-black text-white leading-none tracking-tighter">
                <span className="inline-block">HireDesk</span>
                <br />
                <span className="relative inline-block">
                  <span className="relative bg-linear-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
                    AI Hiring Assistant
                  </span>
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="h-1 w-12 bg-linear-to-r from-blue-400 to-transparent rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="h-1 w-12 bg-linear-to-l from-blue-400 to-transparent rounded-full"></div>
              </div>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light space-y-3">
              <span className="block">
                Transform your entire hiring workflow with AI that actually
                understands talent.
              </span>
              <span className="block">
                <span className="text-blue-300 font-semibold">
                  Deep analysis
                </span>
                {" • "}
                <span className="text-purple-300 font-semibold">
                  Instant screening
                </span>
                {" • "}
                <span className="text-emerald-300 font-semibold">
                  Smart comparisons
                </span>
              </span>
              <span className="text-sm text-gray-400">
                From 100 applicants to your perfect hire in hours, not weeks.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/dashboard"
                className="group relative px-12 py-5 md:px-14 md:py-6 font-bold text-lg text-white rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30"></div>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
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
                  HireDesk
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* The Challenge */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-blue-400 mb-4 px-3 py-1 bg-blue-400/10 rounded-full">
                THE CHALLENGE
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-0 leading-tight">
                The Hiring Problem
                <span className="block text-red-400">
                  Every Recruiter Faces
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-5 leading-relaxed">
                Recruiting shouldn't consume your entire workweek. Traditional
                hiring methods leave money on the table and talent in the trash.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-linear-to-r from-red-500/10 to-transparent border border-red-500/20">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-600/20 border border-red-500/30">
                      <svg
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-2xl">
                      Hours Spent on Resume Screening
                    </h3>
                    <p className="text-gray-400">
                      Manually reading 100+ resumes takes weeks, draining your
                      team's energy and pushing start dates further back.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-linear-to-r from-orange-500/10 to-transparent border border-orange-500/20">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-600/20 border border-orange-500/30">
                      <svg
                        className="h-6 w-6 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-2xl">
                      Generic Interview Questions
                    </h3>
                    <p className="text-gray-400">
                      Same tired questions that don't reveal real
                      potential—interviewees are rehearsed, feedback is
                      surface-level.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-linear-to-r from-yellow-500/10 to-transparent border border-yellow-500/20">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-yellow-600/20 border border-yellow-500/30">
                      <svg
                        className="h-6 w-6 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-2xl">
                      Missed Top Talent
                    </h3>
                    <p className="text-gray-400">
                      Quality candidates slip through the cracks because you
                      simply can't review everyone thoroughly and fairly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-red-600/20 to-orange-600/10 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/5 rounded-full blur-2xl"></div>

                <div className="relative">
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                      Average Recruiter
                    </p>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      40 Hours
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Wasted per hiring cycle
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">
                          Resume Screening
                        </span>
                        <span className="text-red-400 font-bold text-lg">
                          25 hrs
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-5/6 bg-linear-to-r from-red-600 to-red-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">
                          Question Prep
                        </span>
                        <span className="text-orange-400 font-bold text-lg">
                          10 hrs
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/4 bg-linear-to-r from-orange-600 to-orange-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">
                          Admin Tasks
                        </span>
                        <span className="text-yellow-400 font-bold text-lg">
                          5 hrs
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/8 bg-linear-to-r from-yellow-600 to-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-700/50">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <svg
                        className="w-6 h-6"
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
                      <span className="font-semibold">
                        HireDesk cuts this down to 12 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CAPABILITIES */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-blue-400 mb-4 px-3 py-1 bg-blue-400/10 rounded-full">
              CAPABILITIES
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Four Tools Built for
              <span className="block text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                Every Hiring Stage
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From rapid screening to confident final decisions—pick the right
              tool for each moment in your hiring workflow
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/20 flex flex-col">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Smart Review
                </h3>
                <p className="text-blue-300 text-sm font-semibold mb-3">
                  Deep individual analysis
                </p>
                <p className="text-gray-300 text-sm leading-relaxed grow">
                  Unlock personality insights, leadership potential, and
                  tailored interview questions for each candidate.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-pink-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/20 flex flex-col">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Smart Screening
                </h3>
                <p className="text-purple-300 text-sm font-semibold mb-3">
                  Batch analysis (2-10)
                </p>
                <p className="text-gray-300 text-sm leading-relaxed grow">
                  Process multiple resumes instantly with automated ranking and
                  intelligent scoring.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-amber-600/20 to-orange-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-amber-500/20 flex flex-col">
                <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Find Best Fit
                </h3>
                <p className="text-amber-300 text-sm font-semibold mb-3">
                  Compare top candidates (2-5)
                </p>
                <p className="text-gray-300 text-sm leading-relaxed grow">
                  Visual side-by-side comparison with objective ranking to make
                  confident final decisions.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-emerald-500/20 flex flex-col">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Quick Screen
                </h3>
                <p className="text-emerald-300 text-sm font-semibold mb-3">
                  Binary decisions (1-5)
                </p>
                <p className="text-gray-300 text-sm leading-relaxed grow">
                  Instant FIT/REJECT screening with keyword matching and job
                  alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* WORKFLOW */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              WORKFLOW
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              How Top Companies
              <span className="block text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text">
                Use HireDesk
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A complete hiring workflow for every stage of your recruitment
              process
            </p>
          </div>
          <div className="space-y-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-linear-to-r from-blue-500/10 to-blue-500/0 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>

                <div className="relative flex items-start gap-8">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-linear-to-br from-blue-500 to-blue-600 font-bold text-white text-xl shadow-lg">
                      1️⃣
                    </div>
                  </div>
                  <div className="grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Initial Screening: Quick Screen Tool
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      Receive 100+ applications? Use Quick Screen to instantly
                      evaluate candidates against your job requirements. In
                      minutes, identify who's FIT and who's not.{" "}
                      <span className="font-semibold text-blue-300">
                        10 resumes per day quota
                      </span>{" "}
                      keeps you focused on quality.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                      <svg
                        className="w-5 h-5 text-blue-400"
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
                      <span className="text-blue-300 font-semibold text-sm">
                        Replace 8 hours with 30 minutes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-linear-to-r from-purple-500/10 to-purple-500/0 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>

                <div className="relative flex items-start gap-8">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-linear-to-br from-purple-500 to-purple-600 font-bold text-white text-xl shadow-lg">
                      2️⃣
                    </div>
                  </div>
                  <div className="grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Batch Evaluation: Smart Screening Tool
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      Got 5-10 promising candidates after screening? Upload them
                      all at once. Smart Screening evaluates, ranks, and scores
                      them, saving you from comparing resumes manually. Get{" "}
                      <span className="font-semibold text-purple-300">
                        automated insights on each candidate's strengths
                      </span>
                      .
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                      <svg
                        className="w-5 h-5 text-purple-400"
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
                      <span className="text-purple-300 font-semibold text-sm">
                        Process batch in 2 minutes vs 2 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-amber-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-linear-to-r from-amber-500/10 to-amber-500/0 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-amber-400/20 group-hover:border-amber-400/40 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>

                <div className="relative flex items-start gap-8">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-linear-to-br from-amber-500 to-amber-600 font-bold text-white text-xl shadow-lg">
                      3️⃣
                    </div>
                  </div>
                  <div className="grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Deep Dive: Smart Review Tool
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      Before the interview, really understand your top 2-3
                      candidates. Smart Review reveals{" "}
                      <span className="font-semibold text-amber-300">
                        personality traits, leadership style, technical depth
                      </span>
                      , and generates role-specific interview questions. Go
                      beyond resume keywords.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-400/30 rounded-lg">
                      <svg
                        className="w-5 h-5 text-amber-400"
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
                      <span className="text-amber-300 font-semibold text-sm">
                        Ask questions that reveal true potential
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-linear-to-r from-emerald-500/10 to-emerald-500/0 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl"></div>

                <div className="relative flex items-start gap-8">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 font-bold text-white text-xl shadow-lg">
                      4️⃣
                    </div>
                  </div>
                  <div className="grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Final Decision: Find Best Fit Tool
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      Down to your final 2-5 candidates? Compare them
                      side-by-side with Find Best Fit. See{" "}
                      <span className="font-semibold text-emerald-300">
                        scoring differences, strengths vs weaknesses, fit
                        alignment
                      </span>
                      —all on one screen. Make confident, defensible decisions.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                      <svg
                        className="w-5 h-5 text-emerald-400"
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
                      <span className="text-emerald-300 font-semibold text-sm">
                        Eliminate gut-feeling with objective scoring
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ADVANTAGES */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-emerald-400 mb-4 px-3 py-1 bg-emerald-400/10 rounded-full">
              ADVANTAGES
            </span>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Why HireDesk
              <span className="block text-transparent bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text">
                Wins
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete AI-powered hiring toolkit built for modern recruiters
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/40 transition-all duration-300 flex flex-col">
                <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  AI-Powered Insights
                </h3>
                <p className="text-gray-300 leading-relaxed grow">
                  Advanced ML algorithms analyze resumes beyond
                  keywords—uncovering personality traits, leadership potential,
                  skill depth, and cultural fit that traditional screening
                  misses.
                </p>
              </div>
            </div>
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-purple-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-purple-400/40 transition-all duration-300 flex flex-col">
                <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-300 leading-relaxed grow">
                  Analyze one resume in seconds or process 10 candidates
                  simultaneously. Get results instantly instead of spending days
                  on manual evaluation.
                </p>
              </div>
            </div>
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-emerald-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-emerald-400/40 transition-all duration-300 flex flex-col">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Data-Driven Decisions
                </h3>
                <p className="text-gray-300 leading-relaxed grow">
                  Make hiring calls backed by objective AI scoring and
                  comprehensive analysis. Reduce bias, defend your decisions,
                  and improve outcomes consistently.
                </p>
              </div>
            </div>
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-linear-to-br from-pink-600/20 to-pink-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-pink-400/40 transition-all duration-300 flex flex-col">
                <div className="w-14 h-14 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Smart Questions
                </h3>
                <p className="text-gray-300 leading-relaxed grow">
                  Get AI-generated interview questions tailored to each
                  candidate's background and your specific role. No more generic
                  interviews.
                </p>
              </div>
            </div>
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-linear-to-br from-orange-600/20 to-orange-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-orange-400/40 transition-all duration-300 flex flex-col">
                <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  70% Time Savings
                </h3>
                <p className="text-gray-300 leading-relaxed grow">
                  Reclaim your time for strategic work. Let AI handle the
                  repetitive screening while you focus on building relationships
                  with top candidates.
                </p>
              </div>
            </div>
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-600/20 to-cyan-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-cyan-400/40 transition-all duration-300 flex flex-col">
                <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Persistent Results
                </h3>
                <p className="text-gray-300 leading-relaxed grow">
                  Your analysis results are automatically saved. Return anytime
                  to review previous evaluations. Never lose track of candidate
                  assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-pink-400 mb-4 px-3 py-1 bg-pink-400/10 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Trusted by Industry
              <span className="block text-transparent bg-linear-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text">
                Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join 500+ companies revolutionizing their hiring process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">SJ</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      Sarah Johnson
                    </h4>
                    <p className="text-gray-400 text-sm">
                      VP of Talent, TechFlow Inc.
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-300 italic leading-relaxed">
                  "Smart Review is incredible. I get detailed personality
                  insights, leadership assessments, and tailored interview
                  questions for each candidate. It's like having a psychologist
                  and technical expert in one tool."
                </p>
                <div className="mt-4 text-xs text-blue-400 font-semibold">
                  Uses: Smart Review
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-purple-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-purple-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">MR</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      Marcus Rodriguez
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Head of Recruiting, InnovateLabs
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-300 italic leading-relaxed">
                  "Quick Screen and Smart Screening changed everything. We
                  process 50+ resumes in an afternoon instead of a week.
                  Time-to-fill dropped 60%."
                </p>
                <div className="mt-4 text-xs text-purple-400 font-semibold">
                  Uses: Quick Screen & Smart Screening
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-emerald-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-emerald-400/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">LC</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Lisa Chen</h4>
                    <p className="text-gray-400 text-sm">
                      Talent Lead, GrowthCo
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-300 italic leading-relaxed">
                  "Find Best Fit is a game-changer. When we have multiple strong
                  candidates, we compare them visually with intelligent scoring.
                  Makes objective decisions."
                </p>
                <div className="mt-4 text-xs text-emerald-400 font-semibold">
                  Uses: Find Best Fit
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative bg-linear-to-r from-blue-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-gray-700/50 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-600/5 rounded-full blur-3xl"></div>

              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-3">
                    500+
                  </div>
                  <div className="text-gray-300 font-semibold">Companies</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
                    50K+
                  </div>
                  <div className="text-gray-300 font-semibold">
                    Candidates Screened
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-3">
                    95%
                  </div>
                  <div className="text-gray-300 font-semibold">
                    Success Rate
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-3">
                    70%
                  </div>
                  <div className="text-gray-300 font-semibold">Time Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SUCCESS METRICS */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-yellow-400 mb-4 px-3 py-1 bg-yellow-400/10 rounded-full">
              SUCCESS METRICS
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Real Results from
              <span className="block text-transparent bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text">
                Real Companies
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how top companies are transforming their hiring with
              HireDesk's AI-powered platform
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/40 transition-all duration-300 text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  70%
                </div>
                <div className="text-sm text-gray-300">Time Saved</div>
                <div className="text-xs text-gray-400 mt-1">
                  Average reduction in hiring time
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-emerald-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 group-hover:border-emerald-400/40 transition-all duration-300 text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                  85%
                </div>
                <div className="text-sm text-gray-300">Accuracy Rate</div>
                <div className="text-xs text-gray-400 mt-1">
                  AI ranking accuracy vs human decisions
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-purple-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 group-hover:border-purple-400/40 transition-all duration-300 text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                  60%
                </div>
                <div className="text-sm text-gray-300">Faster Hires</div>
                <div className="text-xs text-gray-400 mt-1">
                  Reduction in time-to-fill positions
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-pink-600/20 to-pink-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 group-hover:border-pink-400/40 transition-all duration-300 text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-300">Companies</div>
                <div className="text-xs text-gray-400 mt-1">
                  Trust HireDesk for their hiring
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700/50 group-hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        TechCorp Solutions
                      </h3>
                      <p className="text-gray-400 text-sm">
                        500+ employees, SaaS company
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-yellow-400 font-semibold">
                        Case Study
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">
                      "From 3 weeks to 3 days for senior developer hiring"
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                      <div className="text-lg font-bold text-blue-300">21</div>
                      <div className="text-xs text-gray-400">Days Saved</div>
                    </div>
                    <div className="text-center p-3 bg-emerald-500/10 rounded-lg">
                      <div className="text-lg font-bold text-emerald-300">
                        15
                      </div>
                      <div className="text-xs text-gray-400">
                        Candidates Screened
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                      <div className="text-lg font-bold text-purple-300">
                        92%
                      </div>
                      <div className="text-xs text-gray-400">
                        Match Accuracy
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "HireDesk transformed our hiring process. We used to spend
                    weeks reviewing resumes manually. Now with Smart Screening
                    and Find Best Fit, we can evaluate 15 candidates in a day
                    with confidence. The AI insights are incredibly accurate."
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Tools Used:</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          Smart Screening
                        </span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                          Find Best Fit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-cyan-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700/50 group-hover:border-emerald-400/40 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Global Finance Corp
                      </h3>
                      <p className="text-gray-400 text-sm">
                        2000+ employees, Financial services
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-yellow-400 font-semibold">
                        Case Study
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">
                      "Eliminated unconscious bias in executive hiring"
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-emerald-500/10 rounded-lg">
                      <div className="text-lg font-bold text-emerald-300">
                        0%
                      </div>
                      <div className="text-xs text-gray-400">Bias Detected</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                      <div className="text-lg font-bold text-blue-300">25</div>
                      <div className="text-xs text-gray-400">
                        Executive Candidates
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                      <div className="text-lg font-bold text-purple-300">
                        96%
                      </div>
                      <div className="text-xs text-gray-400">
                        Stakeholder Satisfaction
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "As a financial institution, diversity and inclusion are
                    critical. HireDesk's objective AI analysis helped us
                    eliminate unconscious bias in our executive hiring process.
                    The detailed personality insights and structured evaluation
                    criteria gave us confidence in our decisions."
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Tools Used:</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs">
                          Smart Review
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          Quick Screen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* COMPATIBILITY */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-orange-400 mb-4 px-3 py-1 bg-orange-400/10 rounded-full">
              COMPATIBILITY
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Works Everywhere
              <span className="block text-transparent bg-linear-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text">
                You Work
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seamless experience across all modern browsers and devices with
              support for all major resume formats
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/40 transition-all duration-300">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  File Formats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">PDF documents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">
                      Microsoft Word (.docx)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Legacy Word (.doc)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Up to 10MB per file</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-emerald-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-emerald-400/40 transition-all duration-300">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-1.657 0-3-1.343-3-3m3 3c1.657 0 3-1.343 3-3m-3 3c-1.657 0-3-1.343-3-3m3 3c1.657 0 3-1.343 3-3"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Browser Support
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Chrome 90+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Firefox 88+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Safari 14+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Edge 90+</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-purple-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-purple-400/40 transition-all duration-300">
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Device Support
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Desktop & Laptop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">
                      Tablet (iPad, Android)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Mobile (Responsive)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <span className="text-gray-300">All screen sizes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative bg-linear-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl"></div>

              <div className="relative text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  System Requirements
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      Internet
                    </div>
                    <p className="text-gray-300">
                      Stable broadband connection for file uploads
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      Storage
                    </div>
                    <p className="text-gray-300">
                      No local storage required - everything in the cloud
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-2">
                      Updates
                    </div>
                    <p className="text-gray-300">
                      Automatic updates - always using the latest features
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQs */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-block text-sm font-semibold text-emerald-400 mb-4 px-3 py-1 bg-emerald-400/10 rounded-full">
              FAQs
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Frequently Asked
              <span className="block text-transparent bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about HireDesk and how it can
              transform your hiring process
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-blue-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  How accurate is HireDesk's AI analysis?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our AI has been trained on thousands of successful hires
                  across various industries. It achieves 85%+ accuracy in
                  candidate ranking and provides detailed insights that
                  complement human judgment rather than replace it.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-purple-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-purple-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  What file formats are supported?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We support PDF, DOC, and DOCX formats. Files up to 10MB are
                  accepted. Our AI can extract text from scanned documents and
                  handles various resume layouts automatically.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-600/20 to-emerald-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-emerald-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  Is my data secure and private?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Absolutely. All data is encrypted in transit and at rest. We
                  comply with GDPR and never share your candidate data. Files
                  are automatically deleted after 30 days unless you choose to
                  save them.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-amber-600/20 to-amber-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-amber-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  How many resumes can I analyze per day?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Free accounts get 10 candidate evaluations per day. This
                  includes any combination of individual analysis, batch
                  processing, comparisons, or quick screening across all four
                  tools.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-pink-600/20 to-pink-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-pink-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-linear-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  Can I integrate HireDesk with my ATS?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We're building API integrations with popular ATS platforms.
                  Currently, you can export results as PDF reports. API access
                  is available for enterprise customers.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-600/20 to-cyan-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 group-hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    ?
                  </span>
                  What makes HireDesk different from other AI tools?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Unlike generic AI tools, HireDesk is specifically designed for
                  recruitment. It understands hiring context, provides
                  recruitment-specific insights, and offers four specialized
                  tools for different hiring stages.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <p className="text-gray-300 mb-2">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
