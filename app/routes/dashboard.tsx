import { Link } from "react-router";
import type { Route } from "./+types/dashboard";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Dashboard" },
    {
      name: "description",
      content:
        "Your HireDesk dashboard - choose from Smart Review, Smart Screening, or Find Best Fit for your hiring needs.",
    },
  ];
}

const Dashboard = () => {
  const { user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-slate-800/15 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-slate-800/10 blur-3xl"></div>
        </div>
        <nav className="relative z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-300 hidden sm:inline">
                    Back
                  </span>
                </button>
              </div>
              <div className="flex-1 text-center">
                <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  HireDesk
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Intelligent Hiring Platform
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base font-medium text-white">
                      {user?.name?.[0] || "U"}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-100">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-400">HR Team</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      showProfileDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
                {showProfileDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-4 border-b border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-medium text-white">
                            {user?.name?.[0] || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-5">
          <div className="mb-10 sm:mb-5">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-400 tracking-wider">
                  HIRING INTELLIGENCE
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight leading-tight">
                Power Your Hiring
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Advanced AI-driven tools designed specifically for HR
                professionals. Screen, analyze, compare, and select top talent
                with confidence. All powered by cutting-edge technology.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            <Link
              to="/hiredesk-analyze"
              className="group relative px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-900/90 hover:to-blue-950/30 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                      Smart Review
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Deep dive analysis of individual resumes with AI-powered
                      insights, skill assessment, and personalized interview
                      questions.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/40 transition-all">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-500/20 rounded-full border border-blue-500/30">
                    Detailed Analysis
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700/50 rounded-full">
                    Q&A Ready
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-blue-300 transition-colors duration-300 pt-3">
                  <span className="text-sm font-semibold">Start Analyzing</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              to="/batch-analyze"
              className="group relative px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-900/90 hover:to-purple-950/30 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:to-purple-600/10 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      Smart Screening
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Efficiently process multiple resumes at once. Quickly
                      filter and identify your top candidates with batch
                      analysis.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/40 transition-all">
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
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 text-xs font-semibold text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30">
                    Batch Process
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700/50 rounded-full">
                    Fast & Efficient
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-purple-300 transition-colors duration-300 pt-3">
                  <span className="text-sm font-semibold">Screen Now</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              to="/compare-resumes"
              className="group relative px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-900/90 hover:to-amber-950/30 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-amber-600/0 group-hover:from-amber-600/5 group-hover:to-amber-600/10 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                      Find Best Fit
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Compare candidates side-by-side with advanced scoring.
                      Identify perfect matches using intelligent algorithms.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/40 transition-all">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 text-xs font-semibold text-amber-300 bg-amber-500/20 rounded-full border border-amber-500/30">
                    Smart Ranking
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700/50 rounded-full">
                    Scoring Engine
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-amber-300 transition-colors duration-300 pt-3">
                  <span className="text-sm font-semibold">Compare Now</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link
              to="/selection-candidates"
              className="group relative px-6 py-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-900/90 hover:to-emerald-950/30 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-600/5 group-hover:to-emerald-600/10 transition-all duration-300 pointer-events-none"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-300"></div>

              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">
                      Quick Screen
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Binary FIT/REJECT screening with AI keyword matching.
                      Instantly identify job-ready candidates from your pool.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/40 transition-all">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 text-xs font-semibold text-emerald-300 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                    Live Now
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700/50 rounded-full">
                    Instant Results
                  </span>
                </div>

                <div className="flex items-center text-slate-400 group-hover:text-emerald-300 transition-colors duration-300 pt-3">
                  <span className="text-sm font-semibold">Screen Now</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
