import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/hiredesk-analyze";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useAuth } from "@contexts/AuthContext";
import ResumeUpload from "@resume/ResumeUpload";
import Toast from "@toast/Toast";
import { getErrorCategory, formatErrorMessage } from "@utils/errorHandler";
import { features } from "@data/features";
import { aiService } from "@services/aiService";
import RateLimitModal from "@ui/RateLimitModal";
import { ResumeAnalysisDisplay } from "@analysis/ResumeAnalysisDisplay";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireDesk - Smart Review" },
    {
      name: "description",
      content:
        "AI-powered resume analysis and interview question generation for smarter hiring decisions.",
    },
  ];
}

const HireDeskAnalyze = () => {
  const { user } = useAuth();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [fitStatus, setFitStatus] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [roleRecommendations, setRoleRecommendationsState] = useState<any[]>(
    [],
  );

  const setRoleRecommendations = (value: any[]) => {
    setRoleRecommendationsState(value);
    localStorage.setItem("hiredesk_roleRecommendations", JSON.stringify(value));
  };

  const [questionsState, setQuestionsState] = useState<any[]>([]);

  const setQuestions = (value: any[]) => {
    setQuestionsState(value);
    localStorage.setItem("hiredesk_questions", JSON.stringify(value));
  };

  const [resumeScore, setResumeScoreState] = useState<any>(null);

  const setResumeScore = (value: any) => {
    setResumeScoreState(value);
    localStorage.setItem("hiredesk_resumeScore", JSON.stringify(value));
  };

  const [personalityInsights, setPersonalityInsightsState] =
    useState<any>(null);

  const setPersonalityInsights = (value: any) => {
    setPersonalityInsightsState(value);
    localStorage.setItem("hiredesk_personalityInsights", JSON.stringify(value));
  };

  const [careerPath, setCareerPathState] = useState<any>(null);

  const setCareerPath = (value: any) => {
    setCareerPathState(value);
    localStorage.setItem("hiredesk_careerPath", JSON.stringify(value));
  };

  const [bestFitRole, setBestFitRoleState] = useState<string>("");

  const setBestFitRole = (value: string) => {
    setBestFitRoleState(value);
    localStorage.setItem("hiredesk_bestFitRole", JSON.stringify(value));
  };

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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [dataLoadedFromStorage, setDataLoadedFromStorage] = useState(false);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPersistedData = () => {
      try {
        const savedTargetRole = localStorage.getItem("hiredesk_targetRole");
        const savedJobDescription = localStorage.getItem(
          "hiredesk_jobDescription",
        );

        if (savedTargetRole) setTargetRole(savedTargetRole);
        if (savedJobDescription) setJobDescription(savedJobDescription);

        const savedResumeData = localStorage.getItem("hiredesk_resumeData");
        const savedFitStatus = localStorage.getItem("hiredesk_fitStatus");
        const savedReasoning = localStorage.getItem("hiredesk_reasoning");
        const savedBestFitRole = localStorage.getItem("hiredesk_bestFitRole");
        const savedRoleRecommendations = localStorage.getItem(
          "hiredesk_roleRecommendations",
        );
        const savedQuestions = localStorage.getItem("hiredesk_questions");
        const savedResumeScore = localStorage.getItem("hiredesk_resumeScore");
        const savedPersonalityInsights = localStorage.getItem(
          "hiredesk_personalityInsights",
        );
        const savedCareerPath = localStorage.getItem("hiredesk_careerPath");

        if (savedResumeData) {
          setResumeData(JSON.parse(savedResumeData));
        }
        if (savedFitStatus) setFitStatus(savedFitStatus);
        if (savedReasoning) setReasoning(savedReasoning);
        if (savedBestFitRole) setBestFitRole(JSON.parse(savedBestFitRole));
        if (savedRoleRecommendations) {
          const parsed = JSON.parse(savedRoleRecommendations);
          setRoleRecommendations(parsed);
        }
        if (savedQuestions) {
          setQuestions(JSON.parse(savedQuestions));
        }
        if (savedResumeScore) {
          setResumeScore(JSON.parse(savedResumeScore));
        }
        if (savedPersonalityInsights) {
          setPersonalityInsights(JSON.parse(savedPersonalityInsights));
        }
        if (savedCareerPath) {
          setCareerPath(JSON.parse(savedCareerPath));
        }

        if (
          savedResumeData ||
          savedFitStatus ||
          savedReasoning ||
          savedBestFitRole ||
          savedRoleRecommendations ||
          savedQuestions ||
          savedResumeScore ||
          savedPersonalityInsights ||
          savedCareerPath
        ) {
          setDataLoadedFromStorage(true);
        }
      } catch (error) {
        console.warn("Failed to load persisted data:", error);
        clearPersistedData();
      }
    };

    loadPersistedData();
  }, []);

  useEffect(() => {
    localStorage.setItem("hiredesk_targetRole", targetRole);
  }, [targetRole]);

  useEffect(() => {
    localStorage.setItem("hiredesk_jobDescription", jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    if (resumeData) {
      localStorage.setItem("hiredesk_resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem("hiredesk_fitStatus", fitStatus);
  }, [fitStatus]);

  useEffect(() => {
    localStorage.setItem("hiredesk_reasoning", reasoning);
  }, [reasoning]);

  const clearPersistedData = () => {
    localStorage.removeItem("hiredesk_resumeData");
    localStorage.removeItem("hiredesk_fitStatus");
    localStorage.removeItem("hiredesk_reasoning");
    localStorage.removeItem("hiredesk_bestFitRole");
    localStorage.removeItem("hiredesk_roleRecommendations");
    localStorage.removeItem("hiredesk_questions");
    localStorage.removeItem("hiredesk_resumeScore");
    localStorage.removeItem("hiredesk_personalityInsights");
    localStorage.removeItem("hiredesk_careerPath");
    localStorage.removeItem("hiredesk_expandedCategories");
  };

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

  const handleFileUpload = async (file: File) => {
    const uploadLimit = 10;
    const filesUploaded = user?.filesUploaded || 0;

    if (filesUploaded >= uploadLimit) {
      setShowRateLimitModal(true);
      return;
    }

    clearPersistedData();
    setResumeData(null);
    setFitStatus("");
    setReasoning("");
    setRoleRecommendations([]);
    setQuestions([]);
    setDataLoadedFromStorage(false);

    setIsLoading(true);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });

    if (!file) {
      setError({
        show: true,
        message: "No file selected.",
        type: "warning",
        category: "file",
        originalError: "No file selected",
      });
      setIsLoading(false);
      return;
    }

    if (!file.type.match(/pdf|msword|officedocument/)) {
      setError({
        show: true,
        message:
          "File type not supported. Please upload a PDF or Word document.",
        type: "warning",
        category: "file",
        originalError: "File type not supported",
      });
      setIsLoading(false);
      return;
    }

    try {
      const responseData = await aiService.hireDeskAnalyze(
        file,
        targetRole,
        jobDescription,
      );

      setFitStatus(responseData.fit_status || "");
      setReasoning(responseData.reasoning || "");
      setBestFitRole(responseData.best_fit_role || "");
      setRoleRecommendations(responseData.roleRecommendations || []);
      setResumeData(responseData.resumeData || responseData);
      setQuestions(responseData.questions || []);
      setResumeScore(responseData.resumeScore || null);
      setPersonalityInsights(responseData.personalityInsights || null);
      setCareerPath(responseData.careerPath || null);

      setToastMessage(
        "Resume analyzed successfully! AI insights generated. Scroll down to see the analysis.",
      );
      setToastType("success");
      setShowToast(true);

      setIsLoading(false);
    } catch (error: any) {
      const errorCategory = getErrorCategory(error);
      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: errorCategory,
        originalError: error,
      });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    clearPersistedData();
    setResumeData(null);
    setQuestions([]);
    setCurrentFile(null);
    setFitStatus("");
    setReasoning("");
    setBestFitRole("");
    setRoleRecommendations([]);
    setResumeScore(null);
    setPersonalityInsights(null);
    setCareerPath(null);
    setDataLoadedFromStorage(false);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4s"></div>
          </div>
          <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
        </div>
        <nav className="relative z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-sm group-hover:bg-indigo-300/30 transition-all"></div>
                  </div>
                  <span className="text-sm sm:text-base text-slate-200 font-semibold group-hover:text-white transition-colors">
                    Back to Dashboard
                  </span>
                </button>
              </div>

              <div className="md:hidden flex-1 text-center">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  HireDesk
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="text-center">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    HireDesk AI
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Intelligent Candidate Analysis
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="group flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {user?.name?.[0] || "U"}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-400">HR Specialist</p>
                  </div>
                  <svg
                    className={`h-3 w-3 sm:h-4 sm:w-4 text-slate-400 group-hover:text-slate-300 transition-all duration-300 ${
                      showProfileDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                    className="absolute right-0 mt-3 w-72 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-6 py-4 border-b border-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {user?.name?.[0] || "U"}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user?.email}
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span className="text-xs text-green-400">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="group flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/20 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
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

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/5 rounded-full blur-2xl sm:blur-3xl"></div>
            </div>

            <div className="relative z-10 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-5">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white/90 text-xs sm:text-sm font-medium">
                    AI-Powered Recruitment
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                    Smart Candidate
                  </span>
                  <br />
                  <span className="text-white">Analysis Hub</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-2 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  Transform your hiring process with AI-driven insights. Upload
                  resumes, analyze candidates, and make confident hiring
                  decisions with our intelligent recruitment platform.
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                    <span className="text-white/90 text-xs sm:text-sm">
                      Real-time Analysis
                    </span>
                  </div>
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                    <span className="text-white/90 text-xs sm:text-sm">
                      Skills Matching
                    </span>
                  </div>
                  <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                    <span className="text-white/90 text-xs sm:text-sm">
                      Interview Questions
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-1 text-yellow-300 px-2 sm:px-0">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/90 text-xs sm:text-sm">
                    Trusted by 1000+ HR Teams
                  </span>
                </div>
              </div>
            </div>
          </div>
          <section className="mb-5 sm:mb-10">
            <div className="text-center mb-0 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0 sm:mb-4 px-4 sm:px-0">
                <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  AI-Powered Features
                </span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Harness the power of artificial intelligence to revolutionize
                your recruitment process
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-4 sm:p-6 md:p-8">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="relative">
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110">
                          <feature.icon />
                        </div>
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl group-hover:bg-indigo-500/40 transition-all duration-300"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <svg
                            className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed text-sm sm:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4 sm:px-0">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Smart Resume Analysis
                </span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Transform your hiring process with AI-powered candidate insights
                and intelligent matching
              </p>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-5xl">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-[1.5rem] sm:rounded-[2rem] blur-xl sm:blur-2xl"></div>
                <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-indigo-600/10 rounded-[1.25rem] sm:rounded-[1.75rem] blur-lg sm:blur-xl"></div>

                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
                  <div className="relative bg-gradient-to-r from-cyan-600/15 via-blue-600/15 to-indigo-600/15 p-4 sm:p-6 md:p-8 border-b border-slate-700/50">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent)]"></div>

                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative">
                          <div className="p-3 sm:p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg">
                            <svg
                              className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6-4h6m-6 8h6m-7-4h.01M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                              />
                            </svg>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl blur-md opacity-30"></div>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                            AI Resume Analyzer
                          </h3>
                          <p className="text-slate-300 text-xs sm:text-sm">
                            Powered by advanced machine learning algorithms
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:hidden items-center justify-center">
                        <div className="flex items-center px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">
                            AI READY
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center space-x-3">
                        <div className="flex items-center px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">
                            AI READY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8">
                    <form
                      className="space-y-6 sm:space-y-8"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (currentFile) handleFileUpload(currentFile);
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mb-6 sm:mb-8">
                        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-0">
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg">
                                1
                              </div>
                              <span className="ml-2 text-white font-medium text-sm sm:text-base">
                                Position Details
                              </span>
                            </div>
                            <div className="hidden sm:block w-8 sm:w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-2 sm:mx-4"></div>
                            <div className="sm:hidden w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto mb-2"></div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg">
                                2
                              </div>
                              <span className="ml-2 text-white font-medium text-sm sm:text-base">
                                Resume Upload
                              </span>
                            </div>
                            <div className="hidden sm:block w-8 sm:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-2 sm:mx-4"></div>
                            <div className="sm:hidden w-0.5 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 mx-auto mb-2"></div>
                          </div>

                          <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg">
                              3
                            </div>
                            <span className="ml-2 text-white font-medium text-sm sm:text-base">
                              Analysis
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-4 sm:space-y-6">
                          <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300">
                              <div className="flex items-center mb-3 sm:mb-4">
                                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg mr-3">
                                  <svg
                                    className="h-5 w-5 text-cyan-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z"
                                    />
                                  </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold text-white">
                                  Target Position
                                </h4>
                              </div>
                              <input
                                type="text"
                                className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm sm:text-base"
                                value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}
                                placeholder="e.g. Senior Full Stack Developer"
                                required
                              />
                            </div>
                          </div>

                          <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300">
                              <div className="flex items-center mb-3 sm:mb-4">
                                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg mr-3">
                                  <svg
                                    className="h-5 w-5 text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6-4h6m-6 8h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold text-white">
                                  Job Requirements
                                </h4>
                              </div>
                              <textarea
                                className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none text-sm sm:text-base"
                                value={jobDescription}
                                onChange={(e) =>
                                  setJobDescription(e.target.value)
                                }
                                placeholder="Paste the complete job description with requirements, responsibilities, and qualifications..."
                                rows={4}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                          <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/50 hover:border-indigo-500/50 transition-all duration-300">
                              <div className="flex items-center mb-3 sm:mb-4">
                                <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg mr-3">
                                  <svg
                                    className="h-5 w-5 text-indigo-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                  </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold text-white">
                                  Resume Upload
                                </h4>
                              </div>
                              <ResumeUpload
                                onFileUpload={(file) => setCurrentFile(file)}
                                isLoading={isLoading}
                                onError={(errorData) => {
                                  setError({
                                    show: true,
                                    message:
                                      errorData.message ||
                                      "Error with file upload",
                                    type: "warning",
                                    category: errorData.category || "file",
                                    originalError: errorData,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 sm:pt-6">
                        <button
                          type="submit"
                          disabled={isLoading || !currentFile}
                          className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-1 shadow-2xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 cursor-pointer"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-slate-900/80 rounded-lg sm:rounded-xl px-6 sm:px-8 py-4 sm:py-5 group-hover:bg-transparent transition-all duration-500">
                            <div className="flex items-center justify-center">
                              {isLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-3 sm:mr-4"></div>
                                  <span className="text-white font-semibold text-base sm:text-lg">
                                    Analyzing Resume...
                                  </span>
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-white group-hover:scale-110 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                  <span className="text-white font-semibold text-base sm:text-lg">
                                    Start AI Analysis
                                  </span>
                                  <svg
                                    className="h-5 w-5 sm:h-6 sm:w-6 ml-3 sm:ml-4 text-white group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                  </svg>
                                </>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Premium AI Resume Analysis Display Component */}
          {(resumeData ||
            roleRecommendations.length > 0 ||
            questionsState.length > 0 ||
            resumeScore ||
            personalityInsights ||
            careerPath) && (
            <section className="mb-12 sm:mb-16">
              <ResumeAnalysisDisplay
                analysisData={{
                  resumeData,
                  roleRecommendations,
                  questions: questionsState,
                  resumeScore,
                  personalityInsights,
                  careerPath,
                  fitStatus,
                  reasoning,
                  bestFitRole,
                }}
                isLoading={isLoading}
              />
            </section>
          )}
          {(resumeData ||
            roleRecommendations.length > 0 ||
            questionsState.length > 0 ||
            resumeScore ||
            personalityInsights ||
            careerPath) && (
            <div className="flex justify-center mb-12 sm:mb-16">
              <button
                onClick={handleReset}
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg text-red-400 bg-gradient-to-br from-red-500/20 via-red-500/10 to-red-600/20 rounded-xl sm:rounded-2xl border border-red-500/30 hover:border-red-400/60 transition-all duration-300 hover:from-red-500/30 hover:to-red-600/30 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600/0 via-red-500/0 to-red-600/0 group-hover:from-red-600/5 group-hover:via-red-500/10 group-hover:to-red-600/5 transition-all duration-300"></div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>

                <span className="relative z-10 group-hover:text-red-300 transition-colors duration-300">
                  Clear All Data
                </span>

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur pointer-events-none bg-gradient-to-r from-red-600 to-red-500"></div>
              </button>
            </div>
          )}
          {error.show && (
            <Toast
              type={error.type}
              title={error.category === "limit" ? "Upload Limit" : "Error"}
              message={error.message}
              show={error.show}
              onClose={() => setError({ ...error, show: false })}
              duration={error.category === "limit" ? 4000 : 6000}
              errorData={{
                errorType: error.category,
                errorCategory: error.category,
                originalError: error.originalError,
              }}
              actions={
                error.category === "file"
                  ? [
                      {
                        label: "Try Again",
                        onClick: () => {
                          setError({ ...error, show: false });
                          handleReset();
                        },
                        variant: "primary",
                      },
                    ]
                  : [
                      {
                        label: "Retry",
                        onClick: () => {
                          setError({ ...error, show: false });
                          if (currentFile) {
                            handleFileUpload(currentFile);
                          }
                        },
                        variant: "primary",
                      },
                    ]
              }
            />
          )}
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              show={showToast}
              onClose={handleToastClose}
            />
          )}
          <RateLimitModal
            isOpen={showRateLimitModal}
            onClose={() => setShowRateLimitModal(false)}
            filesUploaded={user?.filesUploaded || 0}
            uploadLimit={10}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HireDeskAnalyze;
