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
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/dashboard",
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
      <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
        {/* Dashboard Minimalist Header */}
        <nav className="relative z-50 border-b border-[rgba(107,114,128,0.2)] bg-[#171717]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] hover:border-[rgba(212,175,55,0.4)] transition-colors duration-180 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-[#D4AF37]"
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
                  <span className="text-xs font-semibold text-[#6B7280] hidden sm:inline">
                    Home
                  </span>
                </Link>
              </div>

              <div className="flex-1 text-center">
                <h1 className="text-lg sm:text-xl font-bold text-[#F5E6C8] tracking-tight">
                  HireDesk
                </h1>
                <p className="text-[11px] text-[#6B7280]">Command Center</p>
              </div>

              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] hover:border-[rgba(212,175,55,0.3)] transition-colors duration-180 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-[4px] bg-[#D4AF37] text-[#171717] flex items-center justify-center font-bold text-xs">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-[#F5E6C8]">
                      {user?.name || "User"}
                    </p>
                  </div>
                  <svg
                    className={`w-3.5 h-3.5 text-[#6B7280] transition-transform duration-180 ${
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
                    className="absolute right-0 mt-2 w-56 bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-[rgba(107,114,128,0.2)] mb-1">
                      <p className="text-xs font-semibold text-[#F5E6C8] truncate">
                        {user?.name}
                      </p>
                      <p className="text-[10px] text-[#6B7280] truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-3 py-2 text-xs font-semibold text-[#EF4444] hover:bg-[#EF4444]/10 rounded-[4px] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-10">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] glass-badge glass-badge-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>WORKSPACE MODULES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5E6C8] tracking-tight">
                Select Your AI Tool
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Accelerate candidate evaluation, batch screening, comparison,
                and automated selection with specialized AI models.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Tool 1: Smart Review */}
            <Link
              to="/hiredesk-analyze"
              className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
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
                  <span className="glass-badge glass-badge-primary rounded-[4px] text-[10px]">
                    Single PDF
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5E6C8] group-hover:text-[#D4AF37] transition-colors">
                    Smart Review
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    In-depth resume breakdown with skill scoring, personality
                    mapping, and personalized interview questions.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(107,114,128,0.2)] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>Start Review</span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Tool 2: Smart Screening */}
            <Link
              to="/batch-analyze"
              className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
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
                  <span className="glass-badge glass-badge-primary rounded-[4px] text-[10px]">
                    2-10 Resumes
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5E6C8] group-hover:text-[#D4AF37] transition-colors">
                    Smart Screening
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Batch upload applicant resumes to instantly compute
                    comparative rankings and automated match scores.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(107,114,128,0.2)] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>Screen Batch</span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Tool 3: Find Best Fit */}
            <Link
              to="/compare-resumes"
              className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
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
                  <span className="glass-badge glass-badge-primary rounded-[4px] text-[10px]">
                    Side-by-Side
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5E6C8] group-hover:text-[#D4AF37] transition-colors">
                    Find Best Fit
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Compare finalist candidates side-by-side against custom job
                    requirements to select top talent.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(107,114,128,0.2)] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>Compare Candidates</span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Tool 4: Quick Screen */}
            <Link
              to="/selection-candidates"
              className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
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
                  <span className="glass-badge glass-badge-primary rounded-[4px] text-[10px]">
                    Instant Filter
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5E6C8] group-hover:text-[#D4AF37] transition-colors">
                    Quick Screen
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Binary FIT/REJECT assessment to quickly filter bulk
                    applications and identify instant matches.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[rgba(107,114,128,0.2)] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>Run Quick Screen</span>
                <span className="group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
