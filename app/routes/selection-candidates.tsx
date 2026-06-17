import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/selection-candidates";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { Link } from "react-router";
import { aiService } from "@services/aiService";
import { authService } from "@services/authService";
import Toast from "@toast/Toast";
import RateLimitModal from "@ui/RateLimitModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quick Screen — AI-Powered FIT/REJECT Candidate Evaluation | HireDesk" },
    {
      name: "description",
      content:
        "Upload up to 5 resumes with a job title and required keywords. HireDesk's AI delivers instant FIT or REJECT decisions with clear reasoning for each candidate.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/selection-candidates" },
  ];
}

interface CandidateResult {
  candidate: string;
  status: "FIT" | "REJECT";
  message: string;
}

interface SelectionResponse {
  job_title: string;
  keywords: string[];
  total_candidates: number;
  fit_count: number;
  reject_count: number;
  results: CandidateResult[];
}

const STORAGE_KEY = "selectionCandidates_state";
const RESULTS_STORAGE_KEY = "selectionCandidates_results";

const SelectionCandidates = () => {
  const { user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectionResponse, setSelectionResponse] =
    useState<SelectionResponse | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
  const [selectedCandidateCount, setSelectedCandidateCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedState = sessionStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const {
            jobTitle: savedTitle,
            keywords: savedKeywords,
            showResults: savedShowResults,
          } = JSON.parse(savedState);
          if (savedTitle) setJobTitle(savedTitle);
          if (savedKeywords) setKeywords(savedKeywords);
          if (savedShowResults) setShowResults(savedShowResults);
        }

        const savedResults = sessionStorage.getItem(RESULTS_STORAGE_KEY);
        if (savedResults) {
          const results = JSON.parse(savedResults);
          setSelectionResponse(results);
          if (!showResults) setShowResults(true);
        }
      } catch (err) {
        console.error("Error loading persisted state:", err);
      }
      setIsInitialized(true);
    }

    if (user?.selected_candidate) {
      setSelectedCandidateCount(user.selected_candidate);
    }
  }, [user]);

  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            jobTitle,
            keywords,
            showResults,
          }),
        );
      } catch (err) {
        console.error("Error saving form state:", err);
      }
    }
  }, [jobTitle, keywords, showResults, isInitialized]);

  useEffect(() => {
    if (isInitialized && selectionResponse && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          RESULTS_STORAGE_KEY,
          JSON.stringify(selectionResponse),
        );
      } catch (err) {
        console.error("Error saving results:", err);
      }
    }
  }, [selectionResponse, isInitialized]);

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

  const handleToastClose = () => {
    setShowToast(false);
  };

  const refreshUserStats = async () => {
    try {
      const profile = await authService.getProfile();
      setSelectedCandidateCount(profile.selected_candidate || 0);
    } catch (error) {
      console.error("Failed to refresh user stats:", error);
      if (user) {
        setSelectedCandidateCount(user.selected_candidate || 0);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (selectedFiles.length + files.length > 5) {
        setToastMessage("Maximum 5 resumes allowed");
        setToastType("warning");
        setShowToast(true);
        return;
      }

      const validFiles = files.filter((file) => {
        const isValid =
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        if (!isValid) {
          setToastMessage(`${file.name} is not a valid format (PDF or DOCX)`);
          setToastType("warning");
          setShowToast(true);
        }

        if (file.size > 10 * 1024 * 1024) {
          setToastMessage(`${file.name} exceeds 10MB limit`);
          setToastType("warning");
          setShowToast(true);
          return false;
        }

        return isValid;
      });

      setSelectedFiles((prev) => [...prev, ...validFiles]);
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selectedFiles.length === 0) {
      setToastMessage("Please upload at least 1 resume");
      setToastType("warning");
      setShowToast(true);
      return;
    }

    if (selectedFiles.length > 5) {
      setToastMessage("Maximum 5 resumes allowed");
      setToastType("warning");
      setShowToast(true);
      return;
    }

    if (!jobTitle.trim()) {
      setToastMessage("Job title is required");
      setToastType("warning");
      setShowToast(true);
      return;
    }

    if (!keywords.trim()) {
      setToastMessage("Keywords are required");
      setToastType("warning");
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await aiService.selectCandidates(
        selectedFiles,
        jobTitle,
        keywords,
      );

      setSelectionResponse(response);
      setShowResults(true);
      setToastMessage(
        "Candidates evaluated successfully! View the results below.",
      );
      setToastType("success");
      setShowToast(true);
    } catch (err: any) {
      if (err.status === 429) {
        await refreshUserStats();
        setShowRateLimitModal(true);
      } else {
        setToastMessage(
          err.message || "Failed to analyze candidates. Try again.",
        );
        setToastType("error");
        setShowToast(true);
      }
      console.error("Selection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setSelectedFiles([]);
    setJobTitle("");
    setKeywords("");
    setSelectionResponse(null);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(RESULTS_STORAGE_KEY);
      } catch (err) {
        console.error("Error clearing persisted state:", err);
      }
    }
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
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
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
                </Link>
              </div>

              <div className="flex-1 text-center">
                <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Candidate Selection
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  FIT/REJECT Analysis Tool
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
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
                        <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
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

        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-16 sm:py-5">
          {!showResults ? (
            <>
              <div className="mb-5">
                <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
                  Candidate Selection & Screening
                </h2>
                <p className="text-slate-400 max-w-2xl">
                  Upload resumes and define job requirements. Our AI will
                  evaluate each candidate and provide FIT or REJECT decisions
                  based on keyword matching and skill alignment.
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5"
              >
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-white mb-4">
                    📄 Upload Resumes (1-5 files)
                    <span className="text-red-400 ml-1">*</span>
                  </label>

                  <div
                    className="border-2 border-dashed border-slate-700 hover:border-slate-600 rounded-xl p-8 transition-colors duration-200 cursor-pointer text-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      aria-label="Upload resume files"
                      className="hidden"
                    />
                    <svg
                      className="w-12 h-12 text-slate-400 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-slate-300 font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-slate-400 text-sm">
                      PDF, DOC, or DOCX (Max 10MB each)
                    </p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <p className="text-sm font-medium text-slate-300">
                        Selected Files ({selectedFiles.length}/5)
                      </p>
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <svg
                              className="w-5 h-5 text-slate-400 shrink-0"
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
                            <div className="min-w-0">
                              <p className="text-sm text-white truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            title="Remove file"
                            aria-label={`Remove ${file.name}`}
                            className="p-1 hover:bg-slate-700 rounded transition-colors duration-200 shrink-0 ml-2 cursor-pointer"
                          >
                            <svg
                              className="w-5 h-5 text-slate-400 hover:text-red-400"
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
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="job-title"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Job Title
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <input
                    id="job-title"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Developer, Product Manager"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:bg-slate-800/70 transition-all duration-200"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Keywords & Requirements
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., Python,AWS,Docker,Leadership,5+ years experience"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:bg-slate-800/70 transition-all duration-200 resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Comma-separated list of required skills, experience levels,
                    and qualifications
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    selectedFiles.length === 0 ||
                    !jobTitle.trim() ||
                    !keywords.trim()
                  }
                  className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Analyzing Candidates...
                    </>
                  ) : (
                    <>
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
                      Evaluate Candidates
                    </>
                  )}
                </button>
              </form>
            </>
          ) : selectionResponse ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                  <p className="text-slate-400 text-sm mb-2">Total Analyzed</p>
                  <p className="text-3xl font-bold text-white">
                    {selectionResponse.total_candidates}
                  </p>
                </div>
                <div className="bg-slate-900/40 border border-green-900/30 rounded-xl p-6">
                  <p className="text-slate-400 text-sm mb-2">✓ FIT</p>
                  <p className="text-3xl font-bold text-green-400">
                    {selectionResponse.fit_count}
                  </p>
                </div>
                <div className="bg-slate-900/40 border border-red-900/30 rounded-xl p-6">
                  <p className="text-slate-400 text-sm mb-2">✕ REJECT</p>
                  <p className="text-3xl font-bold text-red-400">
                    {selectionResponse.reject_count}
                  </p>
                </div>
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                  <p className="text-slate-400 text-sm mb-2">Success Rate</p>
                  <p className="text-3xl font-bold text-white">
                    {selectionResponse.total_candidates > 0
                      ? Math.round(
                          (selectionResponse.fit_count /
                            selectionResponse.total_candidates) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="mb-8 p-6 bg-slate-900/40 border border-slate-800 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Job Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Job Title</p>
                    <p className="text-white font-medium">
                      {selectionResponse.job_title}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectionResponse.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-slate-800 text-slate-200 rounded-full border border-slate-700"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Candidate Results
                </h3>
                {selectionResponse.results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border transition-all ${
                      result.status === "FIT"
                        ? "bg-green-900/10 border-green-500/30 hover:border-green-500/50"
                        : "bg-red-900/10 border-red-500/30 hover:border-red-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-semibold">
                          {result.candidate}
                        </h4>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ml-4 ${
                          result.status === "FIT"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {result.status === "FIT" ? "✓ FIT" : "✕ REJECT"}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Analyze More
                </button>
              </div>
            </>
          ) : null}
        </main>

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            show={showToast}
            onClose={handleToastClose}
            duration={
              toastType === "warning" || toastType === "error" ? 6000 : 4000
            }
          />
        )}
        <RateLimitModal
          isOpen={showRateLimitModal}
          onClose={() => setShowRateLimitModal(false)}
          filesUploaded={selectedCandidateCount}
          uploadLimit={10}
        />
      </div>
    </ProtectedRoute>
  );
};

export default SelectionCandidates;
