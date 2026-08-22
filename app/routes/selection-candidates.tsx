import { useState, useRef, useEffect } from "react";
import type { Route } from "./+types/selection-candidates";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { Link } from "react-router";
import { aiService } from "@services/aiService";
import Toast from "@toast/Toast";
import RateLimitModal from "@ui/RateLimitModal";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "Quick Screen — AI-Powered FIT/REJECT Candidate Evaluation | HireDesk",
    },
    {
      name: "description",
      content:
        "Upload up to 5 resumes with a job title and required keywords. HireDesk's AI delivers instant FIT or REJECT decisions with clear reasoning.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/selection-candidates",
    },
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
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        setError("You can only select up to 5 resumes at a time.");
        return;
      }
      setSelectedFiles(files);
      setError(null);
    }
  };

  const handleProcessSelection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setError("Please select at least 1 resume.");
      return;
    }
    if (!jobTitle.trim()) {
      setError("Please enter a job title.");
      return;
    }
    if (!keywords.trim()) {
      setError("Please enter required keywords.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.selectCandidates(
        selectedFiles,
        jobTitle.trim(),
        keywords.trim(),
      );

      setSelectionResponse(response);
      setShowResults(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(response));
      }
      setToastMessage("Quick Screening complete!");
      setToastType("success");
      setShowToast(true);
    } catch (err: any) {
      setError(err.message || "Failed to process candidate selection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setJobTitle("");
    setKeywords("");
    setSelectionResponse(null);
    setShowResults(false);
    setError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(RESULTS_STORAGE_KEY);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
        <nav className="relative z-50 border-b border-[rgba(107,114,128,0.2)] bg-[#171717]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-xs font-semibold text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-180"
              >
                ← Dashboard
              </Link>
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
                  Quick Screen
                </h1>
                <p className="text-[11px] text-[#6B7280]">
                  Instant FIT / REJECT Criteria Filter
                </p>
              </div>
              <div className="w-20" />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-[6px] border border-[rgba(107,114,128,0.2)] text-center">
            <span className="glass-badge glass-badge-primary mb-3 rounded-[4px]">
              RAPID SELECTION ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5E6C8] mb-2">
              Binary FIT / REJECT Screening
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Upload up to 5 applicant resumes with target keywords to generate
              immediate binary decisions.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <form onSubmit={handleProcessSelection} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="glass-input w-full p-3 text-xs sm:text-sm"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                    Required Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    className="glass-input w-full p-3 text-xs sm:text-sm"
                    placeholder="e.g. React, TypeScript, GraphQL, Next.js"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                  Select Resumes (Max 5 PDF/DOCX)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="glass-input w-full p-2.5 text-xs file:btn-primary file:mr-3 file:px-3 file:py-1 file:text-xs file:rounded-[4px]"
                />
                {selectedFiles.length > 0 && (
                  <p className="text-xs text-[#D4AF37] mt-2 font-semibold">
                    {selectedFiles.length} file(s) selected
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 glass-badge-danger w-full text-xs font-semibold rounded-[4px]">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                {showResults && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary px-4 py-2.5 text-xs rounded-[6px]"
                  >
                    Reset Form
                  </button>
                )}
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    selectedFiles.length === 0 ||
                    !jobTitle ||
                    !keywords
                  }
                  className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
                >
                  {isLoading ? "Screening Candidates..." : "Run Quick Screen"}
                </button>
              </div>
            </form>
          </div>

          {showResults && selectionResponse && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="glass-card p-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
                    {selectionResponse.total_candidates}
                  </p>
                  <p className="text-[11px] text-[#6B7280] font-semibold uppercase">
                    Evaluated
                  </p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#D4AF37]">
                    {selectionResponse.fit_count}
                  </p>
                  <p className="text-[11px] text-[#6B7280] font-semibold uppercase">
                    FIT Candidates
                  </p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#EF4444]">
                    {selectionResponse.reject_count}
                  </p>
                  <p className="text-[11px] text-[#6B7280] font-semibold uppercase">
                    REJECTED
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
                  Evaluation Results
                </h3>
                {selectionResponse.results.map((res, idx) => (
                  <div
                    key={idx}
                    className={`glass-panel p-4 sm:p-5 flex items-center justify-between border-l-4 ${
                      res.status === "FIT"
                        ? "border-l-[#D4AF37]"
                        : "border-l-[#EF4444]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-bold text-[#F5E6C8] text-sm sm:text-base">
                          {res.candidate}
                        </h4>
                        <span
                          className={`glass-badge rounded-[4px] text-xs ${
                            res.status === "FIT"
                              ? "glass-badge-success"
                              : "glass-badge-danger"
                          }`}
                        >
                          {res.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280]">{res.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <Toast
          show={showToast}
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
        <RateLimitModal
          isOpen={showRateLimitModal}
          onClose={() => setShowRateLimitModal(false)}
          filesUploaded={0}
          uploadLimit={10}
        />
      </div>
    </ProtectedRoute>
  );
};

export default SelectionCandidates;
