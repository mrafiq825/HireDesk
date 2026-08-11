import { Link } from "react-router";
import type { Route } from "./+types/compare-resumes";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import { useState, useEffect } from "react";
import { getErrorCategory, formatErrorMessage } from "@utils/errorHandler";
import { aiService } from "@services/aiService";
import Toast from "@toast/Toast";
import RateLimitModal from "@ui/RateLimitModal";
import { ComparisonResultsDisplay } from "@comparison/ComparisonResultsDisplay";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find Best Fit — Side-by-Side Candidate Comparison | HireDesk" },
    {
      name: "description",
      content:
        "Compare 2-5 finalists side-by-side with HireDesk's AI ranking algorithm. Get objective scores, skill gap analysis, and a clear top-candidate recommendation.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/compare-resumes" },
  ];
}

const CompareResumes = () => {
  const { user } = useAuth();
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<any>(null);
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
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);

  useEffect(() => {
    try {
      const persistedResults = localStorage.getItem("compare-resumes-results");
      if (persistedResults) {
        const parsedResults = JSON.parse(persistedResults);
        if (parsedResults && typeof parsedResults === "object") {
          setComparisonResults(parsedResults);
        }
      }
    } catch (error) {
      console.warn("Failed to load persisted comparison results:", error);
    }
  }, []);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length < 2 || files.length > 5) {
      setError({
        show: true,
        message: "Please select between 2 and 5 resumes for candidate comparison.",
        type: "warning",
      });
      return;
    }
    setCurrentFiles(files);
    setError({ show: false, message: "", type: "error" });
  };

  const handleCompare = async () => {
    if (currentFiles.length < 2 || currentFiles.length > 5) {
      setError({
        show: true,
        message: "Select between 2 and 5 files to compare.",
        type: "warning",
      });
      return;
    }

    setIsLoading(true);
    setError({ show: false, message: "", type: "error" });

    try {
      const response = await aiService.compareResumes(currentFiles);
      setComparisonResults(response);
      localStorage.setItem(
        "compare-resumes-results",
        JSON.stringify(response)
      );
      setToastMessage("Candidate comparison complete!");
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
                <h1 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">Find Best Fit</h1>
                <p className="text-xs text-[#718078]">Side-by-Side Finalist Candidate Comparison</p>
              </div>
              <div className="w-20" />
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="glass-ai p-8 rounded-3xl border border-[#94B69E]/30 text-center">
            <span className="glass-badge glass-badge-primary mb-3">FINALIST EVALUATION</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F3F7F4] mb-2">
              Side-by-Side Candidate Ranking
            </h1>
            <p className="text-sm text-[#AAB8AF]">
              Upload 2 to 5 finalist resumes to generate comparative match scores, strengths, and winner recommendations.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#AAB8AF] mb-2">
                Select Resumes to Compare (2 - 5 PDF/DOCX)
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFilesSelected}
                className="glass-input w-full p-3 text-xs file:btn-primary file:mr-3 file:px-3 file:py-1 file:text-xs"
              />
              {currentFiles.length > 0 && (
                <p className="text-xs text-[#94B69E] mt-2 font-semibold">
                  {currentFiles.length} finalist file(s) selected
                </p>
              )}
            </div>

            {error.show && (
              <div className="p-3 glass-badge-danger w-full text-xs font-semibold rounded-xl">
                {error.message}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCompare}
                disabled={isLoading || currentFiles.length < 2}
                className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl"
              >
                {isLoading ? "Comparing Finalists..." : "Compare Resumes"}
              </button>
            </div>
          </div>

          {comparisonResults && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#F3F7F4]">Comparison Report</h3>
                <button
                  onClick={() => {
                    setComparisonResults(null);
                    localStorage.removeItem("compare-resumes-results");
                  }}
                  className="btn-secondary px-4 py-2 text-xs"
                >
                  Clear Results
                </button>
              </div>

              <ComparisonResultsDisplay results={comparisonResults} isLoading={isLoading} />
            </div>
          )}
        </main>

        <Toast show={showToast} message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
        <RateLimitModal isOpen={showRateLimitModal} onClose={() => setShowRateLimitModal(false)} filesUploaded={0} uploadLimit={10} />
      </div>
    </ProtectedRoute>
  );
};

export default CompareResumes;
