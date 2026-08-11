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
    { title: "Quick Screen — AI-Powered FIT/REJECT Candidate Evaluation | HireDesk" },
    {
      name: "description",
      content:
        "Upload up to 5 resumes with a job title and required keywords. HireDesk's AI delivers instant FIT or REJECT decisions with clear reasoning.",
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
          const { jobTitle: savedTitle, keywords: savedKeywords, showResults: savedShowResults } = JSON.parse(savedState);
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
        keywords.trim()
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
      <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#94B69E]/10 blur-[130px] pointer-events-none" />

        <nav className="relative z-50 border-b border-white/10 bg-[#07110D]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#AAB8AF] hover:text-[#94B69E]"
              >
                ← Dashboard
              </Link>
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">Quick Screen</h1>
                <p className="text-xs text-[#718078]">Instant FIT / REJECT Keyword Filter</p>
              </div>
              <div className="w-20" />
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="glass-ai p-8 rounded-3xl border border-[#94B69E]/30 text-center">
            <span className="glass-badge glass-badge-primary mb-3">RAPID SELECTION ENGINE</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F3F7F4] mb-2">
              Binary FIT / REJECT Screening
            </h1>
            <p className="text-sm text-[#AAB8AF]">
              Upload up to 5 applicant resumes with target keywords to generate immediate binary decisions.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <form onSubmit={handleProcessSelection} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Job Title</label>
                  <input
                    type="text"
                    className="glass-input w-full p-3.5 text-sm"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">
                    Required Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    className="glass-input w-full p-3.5 text-sm"
                    placeholder="e.g. React, TypeScript, GraphQL, Next.js"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">
                  Select Resumes (Max 5 PDF/DOCX)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="glass-input w-full p-2.5 text-xs file:btn-primary file:mr-3 file:px-3 file:py-1 file:text-xs"
                />
                {selectedFiles.length > 0 && (
                  <p className="text-xs text-[#94B69E] mt-2 font-semibold">
                    {selectedFiles.length} file(s) selected
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 glass-badge-danger w-full text-xs font-semibold rounded-xl">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                {showResults && (
                  <button type="button" onClick={handleReset} className="btn-secondary px-5 py-3 text-xs">
                    Reset Form
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading || selectedFiles.length === 0 || !jobTitle || !keywords}
                  className="btn-primary px-8 py-3 text-sm font-semibold"
                >
                  {isLoading ? "Screening Candidates..." : "Run Quick Screen"}
                </button>
              </div>
            </form>
          </div>

          {showResults && selectionResponse && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-[#F3F7F4]">{selectionResponse.total_candidates}</p>
                  <p className="text-xs text-[#718078] font-semibold uppercase">Evaluated</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-[#94B69E]">{selectionResponse.fit_count}</p>
                  <p className="text-xs text-[#718078] font-semibold uppercase">FIT Candidates</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-[#E58B8B]">{selectionResponse.reject_count}</p>
                  <p className="text-xs text-[#718078] font-semibold uppercase">REJECTED</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#F3F7F4]">Evaluation Results</h3>
                {selectionResponse.results.map((res, idx) => (
                  <div
                    key={idx}
                    className={`glass-panel p-5 flex items-center justify-between border-l-4 ${
                      res.status === "FIT" ? "border-l-[#94B69E] glass-ai" : "border-l-[#E58B8B]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-[#F3F7F4] text-base">{res.candidate}</h4>
                        <span
                          className={`glass-badge ${
                            res.status === "FIT" ? "glass-badge-success" : "glass-badge-danger"
                          }`}
                        >
                          {res.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#AAB8AF]">{res.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <Toast show={showToast} message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
        <RateLimitModal isOpen={showRateLimitModal} onClose={() => setShowRateLimitModal(false)} filesUploaded={0} uploadLimit={10} />
      </div>
    </ProtectedRoute>
  );
};

export default SelectionCandidates;
