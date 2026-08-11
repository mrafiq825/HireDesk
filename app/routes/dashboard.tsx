import { Link } from "react-router";
import type { Route } from "./+types/dashboard";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk — Command Center Dashboard" },
    {
      name: "description",
      content:
        "Your HireDesk command center — access Smart Review, Smart Screening, Find Best Fit, and Quick Screen to accelerate recruitment.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/dashboard" },
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
      <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#94B69E]/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-[#94B69E]/5 blur-[120px] pointer-events-none" />

        {/* Dashboard Glass Header */}
        <nav className="relative z-50 border-b border-white/10 bg-[#07110D]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#94B69E]/40 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-[#94B69E]"
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
                  <span className="text-xs font-semibold text-[#AAB8AF] hidden sm:inline">
                    Home
                  </span>
                </Link>
              </div>

              <div className="flex-1 text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7F4] tracking-tight">
                  HireDesk
                </h1>
                <p className="text-xs text-[#718078]">
                  AI Recruitment Command Center
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#94B69E]/30 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#94B69E] text-[#07110D] flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(148,182,158,0.3)]">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-[#F3F7F4]">
                      {user?.name || "User"}
                    </p>
                    <p className="text-[10px] text-[#718078]">Recruitment Specialist</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#AAB8AF] transition-transform duration-300 ${
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 glass-floating border border-white/15 p-2 z-50 shadow-2xl"
                  >
                    <div className="px-3.5 py-3 border-b border-white/10 mb-1">
                      <p className="text-sm font-semibold text-[#F3F7F4] truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-[#718078] truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold text-[#E58B8B] hover:bg-red-500/10 rounded-xl transition-colors duration-200 flex items-center gap-2 cursor-pointer"
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
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Main Area */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-10">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge glass-badge-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94B69E]" />
                <span>HIRING INTELLIGENCE SUITE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F3F7F4] tracking-tight">
                Select Your AI Tool
              </h2>
              <p className="text-base text-[#AAB8AF] leading-relaxed">
                Accelerate candidate evaluation, batch screening, comparison, and automated selection with specialized AI models.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Tool 1: Smart Review */}
            <Link
              to="/hiredesk-analyze"
              className="glass-card p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E] shadow-[0_0_15px_rgba(148,182,158,0.2)]">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="glass-badge glass-badge-primary">Single PDF</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F3F7F4] group-hover:text-[#94B69E] transition-colors">
                    Smart Review
                  </h3>
                  <p className="text-xs text-[#718078] font-medium mt-1 leading-relaxed">
                    In-depth resume breakdown with skill scoring, personality mapping, and personalized interview questions.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#94B69E]">
                <span>Start Deep Review</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Tool 2: Smart Screening */}
            <Link
              to="/batch-analyze"
              className="glass-card p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E] shadow-[0_0_15px_rgba(148,182,158,0.2)]">
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
                  </div>
                  <span className="glass-badge glass-badge-primary">2-10 Resumes</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F3F7F4] group-hover:text-[#94B69E] transition-colors">
                    Smart Screening
                  </h3>
                  <p className="text-xs text-[#718078] font-medium mt-1 leading-relaxed">
                    Batch upload applicant resumes to instantly compute comparative rankings and automated match scores.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#94B69E]">
                <span>Screen Batch</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Tool 3: Find Best Fit */}
            <Link
              to="/compare-resumes"
              className="glass-card p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E] shadow-[0_0_15px_rgba(148,182,158,0.2)]">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="glass-badge glass-badge-primary">Side-by-Side</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F3F7F4] group-hover:text-[#94B69E] transition-colors">
                    Find Best Fit
                  </h3>
                  <p className="text-xs text-[#718078] font-medium mt-1 leading-relaxed">
                    Compare finalist candidates side-by-side against custom job requirements to select top talent.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#94B69E]">
                <span>Compare Candidates</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Tool 4: Quick Screen */}
            <Link
              to="/selection-candidates"
              className="glass-card p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E] shadow-[0_0_15px_rgba(148,182,158,0.2)]">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="glass-badge glass-badge-primary">Instant Filter</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#F3F7F4] group-hover:text-[#94B69E] transition-colors">
                    Quick Screen
                  </h3>
                  <p className="text-xs text-[#718078] font-medium mt-1 leading-relaxed">
                    Binary FIT/REJECT assessment to quickly filter bulk applications and identify instant matches.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#94B69E]">
                <span>Run Quick Screen</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
