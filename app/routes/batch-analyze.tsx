import { Link } from "react-router";
import type { Route } from "./+types/batch-analyze";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getErrorCategory, formatErrorMessage } from "@utils/errorHandler";
import { aiService } from "@services/aiService";
import Toast from "@toast/Toast";
import RateLimitModal from "@ui/RateLimitModal";
import BatchResultCard from "@batch/BatchResultCard";
import type {
  BatchAnalysisResult,
} from "@app-types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Screening — Batch AI Resume Analysis for 2–10 Candidates | HireDesk" },
    {
      name: "description",
      content:
        "Upload 2-10 resumes simultaneously for AI-powered batch analysis. Get consistent ranking scores, top candidate highlights, and comparative insights in minutes.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.app/batch-analyze" },
  ];
}

const BatchAnalyze = () => {
  const { user } = useAuth();
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [batchResults, setBatchResults] = useState<BatchAnalysisResult[]>([]);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
  const [error, setError] = useState<{
    show: boolean;
    message: string;
    type: "error" | "warning";
  }>({
    show: false,
    message: "",
    type: "error",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  useEffect(() => {
    try {
      const persistedResults = localStorage.getItem("batch-analyze-results");
      if (persistedResults) {
        const parsedResults = JSON.parse(persistedResults);
        if (Array.isArray(parsedResults) && parsedResults.length > 0) {
          setBatchResults(parsedResults);
        }
      }
    } catch (error) {
      console.warn("Failed to load persisted batch results:", error);
    }
  }, []);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length < 2 || files.length > 10) {
      setError({
        show: true,
        message: "Please select between 2 and 10 resumes for batch screening.",
        type: "warning",
      });
      return;
    }
    setCurrentFiles(files);
    setError({ show: false, message: "", type: "error" });
  };

  const handleBatchUpload = async () => {
    if (currentFiles.length < 2 || currentFiles.length > 10) {
      setError({
        show: true,
        message: "Select between 2 and 10 files.",
        type: "warning",
      });
      return;
    }

    if (!targetRole.trim() || !jobDescription.trim()) {
      setError({
        show: true,
        message: "Target Role and Job Description are required.",
        type: "warning",
      });
      return;
    }

    setIsLoading(true);
    setError({ show: false, message: "", type: "error" });

    try {
      const response = await aiService.batchAnalyze(
        currentFiles,
        targetRole,
        jobDescription
      );

      const results = response.results || [];
      setBatchResults(results);
      localStorage.setItem("batch-analyze-results", JSON.stringify(results));
      setToastMessage("Batch screening completed successfully!");
      setToastType("success");
      setShowToast(true);
    } catch (err: any) {
      const category = getErrorCategory(err);
      if (category === "rate_limit") {
        setShowRateLimitModal(true);
      } else {
        setError({
          show: true,
          message: formatErrorMessage(err),
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
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
                <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">Smart Batch Screening</h1>
                <p className="text-xs text-[#718078]">Screen 2-10 Resumes Simultaneously</p>
              </div>
              <div className="w-20" />
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="glass-ai p-8 rounded-3xl border border-[#94B69E]/30 text-center">
            <span className="glass-badge glass-badge-primary mb-3">HIGH-VOLUME RECRUITMENT</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F3F7F4] mb-2">
              Batch Candidate Screening
            </h1>
            <p className="text-sm text-[#AAB8AF]">
              Upload 2 to 10 resume files concurrently to compute automated applicant scorecards.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Target Role</label>
                <input
                  type="text"
                  className="glass-input w-full p-3.5 text-sm"
                  placeholder="e.g. Lead Product Manager"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Select Resumes (2 - 10 PDF/DOCX)</label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFilesSelected}
                  className="glass-input w-full p-2.5 text-xs file:btn-primary file:mr-3 file:px-3 file:py-1 file:text-xs"
                />
                {currentFiles.length > 0 && (
                  <p className="text-xs text-[#94B69E] mt-2 font-semibold">
                    {currentFiles.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">Job Description</label>
              <textarea
                className="glass-input w-full p-3.5 text-sm h-32 resize-none"
                placeholder="Paste position requirements..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {error.show && (
              <div className="p-3 glass-badge-danger w-full text-xs font-semibold rounded-xl">
                {error.message}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleBatchUpload}
                disabled={isLoading || currentFiles.length < 2 || !targetRole || !jobDescription}
                className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl"
              >
                {isLoading ? "Screening Resumes..." : "Run Batch Screening"}
              </button>
            </div>
          </div>

          {batchResults.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#F3F7F4]">Screening Scorecards ({batchResults.length})</h3>
                <button
                  onClick={() => {
                    setBatchResults([]);
                    localStorage.removeItem("batch-analyze-results");
                  }}
                  className="btn-secondary px-4 py-2 text-xs"
                >
                  Clear Results
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {batchResults.map((res, idx) => (
                  <BatchResultCard key={idx} result={res} index={idx} />
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

export default BatchAnalyze;
