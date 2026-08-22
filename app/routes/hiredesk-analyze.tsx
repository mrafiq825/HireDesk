import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/hiredesk-analyze";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import ResumeUpload from "@resume/ResumeUpload";
import { AnalysisOverview } from "@analysis/AnalysisOverview";
import { PersonalInfoCard } from "@analysis/PersonalInfoCard";
import { SkillsCard } from "@analysis/SkillsCard";
import { WorkExperienceCard } from "@analysis/WorkExperienceCard";
import { EducationCard } from "@analysis/EducationCard";
import { RoleRecommendationsCard } from "@analysis/RoleRecommendationsCard";
import { InterviewQuestionsCard } from "@analysis/InterviewQuestionsCard";
import { AdvancedAnalytics } from "@analysis/AdvancedAnalytics";
import Toast from "@toast/Toast";
import RateLimitModal from "@ui/RateLimitModal";
import { aiService } from "@services/aiService";
import { getErrorCategory, formatErrorMessage } from "@utils/errorHandler";
import type {
  ResumeData,
  ResumeScore,
  PersonalityInsights,
  CareerPath,
  RoleRecommendation,
} from "@app-types/index";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "Smart Review — Deep AI Candidate Evaluation & Skill Mapping | HireDesk",
    },
    {
      name: "description",
      content:
        "Comprehensive AI analysis for individual candidates. Get personality insights, career trajectory, resume scoring, and tailored interview questions.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.app/hiredesk-analyze",
    },
  ];
}

const HireDeskAnalyze = () => {
  const { user } = useAuth();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Analysis State
  const [resumeData, setResumeData] = useState<any | null>(null);
  const [fitStatus, setFitStatus] = useState<string>("");
  const [reasoning, setReasoning] = useState<string>("");
  const [roleRecommendations, setRoleRecommendations] = useState<
    RoleRecommendation[]
  >([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);
  const [personalityInsights, setPersonalityInsights] =
    useState<PersonalityInsights | null>(null);
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [bestFitRole, setBestFitRole] = useState<string>("");

  const [error, setError] = useState<{
    show: boolean;
    message: string;
    type: "error" | "warning";
    category: string | null;
    originalError: any;
  }>({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("hiredesk_resumeData");
      if (savedData) {
        setResumeData(JSON.parse(savedData));
        setFitStatus(localStorage.getItem("hiredesk_fitStatus") || "");
        setReasoning(localStorage.getItem("hiredesk_reasoning") || "");
        setBestFitRole(localStorage.getItem("hiredesk_bestFitRole") || "");

        const savedRoles = localStorage.getItem("hiredesk_roleRecommendations");
        if (savedRoles) setRoleRecommendations(JSON.parse(savedRoles));

        const savedQuestions = localStorage.getItem("hiredesk_questions");
        if (savedQuestions) setQuestions(JSON.parse(savedQuestions));

        const savedScore = localStorage.getItem("hiredesk_resumeScore");
        if (savedScore) setResumeScore(JSON.parse(savedScore));

        const savedPersonality = localStorage.getItem(
          "hiredesk_personalityInsights",
        );
        if (savedPersonality)
          setPersonalityInsights(JSON.parse(savedPersonality));

        const savedCareer = localStorage.getItem("hiredesk_careerPath");
        if (savedCareer) setCareerPath(JSON.parse(savedCareer));
      }
    } catch (e) {
      console.warn("Could not hydrate analysis state", e);
    }
  }, []);

  const handleAnalyze = async (file: File) => {
    setCurrentFile(file);

    if (!targetRole.trim() || !jobDescription.trim()) {
      setError({
        show: true,
        message: "Target Role and Job Description are required.",
        type: "warning",
        category: null,
        originalError: null,
      });
      return;
    }

    setIsLoading(true);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });

    try {
      const result: any = await aiService.hireDeskAnalyze(
        file,
        targetRole,
        jobDescription,
      );

      const fStatus = result.fit_status || result.fitStatus || "";
      const bRole = result.best_fit_role || result.bestFitRole || "";
      const rRecs =
        result.role_recommendations || result.roleRecommendations || [];

      setResumeData(result.resumeData || null);
      setFitStatus(fStatus);
      setReasoning(result.reasoning || "");
      setRoleRecommendations(rRecs);
      setQuestions(result.questions || []);
      setResumeScore(result.resumeScore || null);
      setPersonalityInsights(result.personalityInsights || null);
      setCareerPath(result.careerPath || null);
      setBestFitRole(bRole);

      localStorage.setItem(
        "hiredesk_resumeData",
        JSON.stringify(result.resumeData),
      );
      localStorage.setItem("hiredesk_fitStatus", fStatus);
      localStorage.setItem("hiredesk_reasoning", result.reasoning || "");
      localStorage.setItem("hiredesk_bestFitRole", bRole);
      localStorage.setItem(
        "hiredesk_roleRecommendations",
        JSON.stringify(rRecs),
      );
      localStorage.setItem(
        "hiredesk_questions",
        JSON.stringify(result.questions),
      );
      localStorage.setItem(
        "hiredesk_resumeScore",
        JSON.stringify(result.resumeScore),
      );
      localStorage.setItem(
        "hiredesk_personalityInsights",
        JSON.stringify(result.personalityInsights),
      );
      localStorage.setItem(
        "hiredesk_careerPath",
        JSON.stringify(result.careerPath),
      );

      setToastMessage("Resume analysis complete!");
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
          category,
          originalError: err,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResumeData(null);
    setFitStatus("");
    setReasoning("");
    setRoleRecommendations([]);
    setQuestions([]);
    setResumeScore(null);
    setPersonalityInsights(null);
    setCareerPath(null);
    setBestFitRole("");
    setCurrentFile(null);

    localStorage.removeItem("hiredesk_resumeData");
    localStorage.removeItem("hiredesk_fitStatus");
    localStorage.removeItem("hiredesk_reasoning");
    localStorage.removeItem("hiredesk_bestFitRole");
    localStorage.removeItem("hiredesk_roleRecommendations");
    localStorage.removeItem("hiredesk_questions");
    localStorage.removeItem("hiredesk_resumeScore");
    localStorage.removeItem("hiredesk_personalityInsights");
    localStorage.removeItem("hiredesk_careerPath");
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
                  Smart Review
                </h1>
                <p className="text-[11px] text-[#6B7280]">
                  Candidate Deep Analysis
                </p>
              </div>
              <div className="w-20" />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {!resumeData ? (
            <div className="space-y-6">
              <div className="bg-[#1B1B1B] p-6 sm:p-8 rounded-[6px] border border-[rgba(107,114,128,0.2)] text-center">
                <span className="glass-badge glass-badge-primary mb-3 rounded-[4px]">
                  DEEP QUALIFICATION ANALYSIS
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#F5E6C8] mb-2">
                  Smart Candidate Review
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Upload a single candidate's resume with target role
                  requirements to run instant multi-dimensional scoring.
                </p>
              </div>

              <div className="glass-panel p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1">
                      Target Role *
                    </label>
                    <input
                      type="text"
                      className="glass-input w-full p-3 text-xs sm:text-sm"
                      placeholder="e.g. Senior Full Stack Architect"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#6B7280] mb-1">
                      Job Description *
                    </label>
                    <input
                      type="text"
                      className="glass-input w-full p-3 text-xs sm:text-sm"
                      placeholder="e.g. 5+ yrs React, Node.js, Cloud..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                </div>

                <ResumeUpload
                  onFileUpload={handleAnalyze}
                  isLoading={isLoading}
                  onError={(msg) =>
                    setError({
                      show: true,
                      message: typeof msg === "string" ? msg : "Upload error",
                      type: "error",
                      category: null,
                      originalError: null,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
                  Analysis Scorecard
                </h2>
                <button
                  onClick={handleReset}
                  className="btn-secondary px-4 py-2 text-xs"
                >
                  Analyze Another Candidate
                </button>
              </div>

              <AnalysisOverview
                analysis={{
                  fitStatus,
                  reasoning,
                  resumeScore,
                  bestFitRole,
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-6 sm:space-y-8">
                  {resumeData.personalInfo && (
                    <PersonalInfoCard personalInfo={resumeData.personalInfo} />
                  )}
                  {resumeData.skills && (
                    <SkillsCard skills={resumeData.skills} />
                  )}
                </div>

                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {resumeData.workExperience && (
                    <WorkExperienceCard
                      workExperience={resumeData.workExperience}
                    />
                  )}
                  {resumeData.education && (
                    <EducationCard education={resumeData.education} />
                  )}
                  {roleRecommendations.length > 0 && (
                    <RoleRecommendationsCard
                      recommendations={roleRecommendations}
                    />
                  )}
                  {questions.length > 0 && (
                    <InterviewQuestionsCard questions={questions} />
                  )}
                </div>
              </div>

              <AdvancedAnalytics
                resumeScore={resumeScore}
                personalityInsights={personalityInsights}
                careerPath={careerPath}
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

export default HireDeskAnalyze;
