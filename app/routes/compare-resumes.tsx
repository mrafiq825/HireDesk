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
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/compare-resumes",
    },
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
        message:
          "Please select between 2 and 5 resumes for candidate comparison.",
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
      localStorage.setItem("compare-resumes-results", JSON.stringify(response));
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
                  Find Best Fit
                </h1>
                <p className="text-[11px] text-[#6B7280]">
                  Side-by-Side Finalist Candidate Comparison
                </p>
              </div>
              <div className="w-20" />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-[6px] border border-[rgba(107,114,128,0.2)] text-center">
            <span className="glass-badge glass-badge-primary mb-3 rounded-[4px]">
              FINALIST EVALUATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5E6C8] mb-2">
              Side-by-Side Candidate Ranking
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Upload 2 to 5 finalist resumes to generate comparative match
              scores, strengths, and winner recommendations.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5">
                Select Resumes to Compare (2 - 5 PDF/DOCX)
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFilesSelected}
                className="glass-input w-full p-2.5 text-xs file:btn-primary file:mr-3 file:px-3 file:py-1 file:text-xs file:rounded-[4px]"
              />
              {currentFiles.length > 0 && (
                <p className="text-xs text-[#D4AF37] mt-2 font-semibold">
                  {currentFiles.length} finalist file(s) selected
                </p>
              )}
            </div>

            {error.show && (
              <div className="p-3 glass-badge-danger w-full text-xs font-semibold rounded-[4px]">
                {error.message}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCompare}
                disabled={isLoading || currentFiles.length < 2}
                className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
              >
                {isLoading ? "Comparing Finalists..." : "Compare Resumes"}
              </button>
            </div>
          </div>

          {comparisonResults && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
                  Comparison Report
                </h3>
                <button
                  onClick={() => {
                    setComparisonResults(null);
                    localStorage.removeItem("compare-resumes-results");
                  }}
                  className="btn-secondary px-4 py-2 text-xs rounded-[6px]"
                >
                  Clear Results
                </button>
              </div>

              <ComparisonResultsDisplay
                results={comparisonResults}
                isLoading={isLoading}
              />
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

export default CompareResumes;
