import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/hiredesk-chat";
import ProtectedRoute from "@auth/ProtectedRoute";
import { useForm } from "@hooks/useForm";
import { assistantService } from "@services/assistantService";
import { useToast } from "@contexts/ToastContext";
import { getErrorCategory, formatErrorMessage } from "@utils/errorHandler";
import type {
  HireDeskQueryPayload,
  HireDeskQueryResponse,
  HireDeskQueryType,
} from "@app-types";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "HireDesk Chat — AI Recruiter Co-pilot for Screening & Interviews",
    },
    {
      name: "description",
      content:
        "Chat with HireDesk's AI co-pilot to generate screening questions, draft interview prompts, create job postings, and match candidates to roles in real time.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/hiredesk-chat",
    },
  ];
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  queryType: HireDeskQueryType;
  content: string;
  timestamp: string;
};

type FormState = {
  query: string;
  queryType: HireDeskQueryType;
  jobRole: string;
  candidateInfo: string;
  context: string;
};

const INITIAL_FORM: FormState = {
  query: "",
  queryType: "screening",
  jobRole: "",
  candidateInfo: "",
  context: "",
};

const queryTypeHints: Record<HireDeskQueryType, string> = {
  screening: "Provide the role for sharper screening prompts.",
  interview_questions:
    "Add years of experience or stack details in context for better questions.",
  job_posting: "Paste your draft JD in the query; keep the role visible.",
  candidate_match:
    "Paste resume notes in Candidate Info or specify a job role to run matching.",
};

const statusStyles: Record<
  "loading" | "operational" | "degraded" | "down" | "unavailable",
  string
> = {
  loading: "glass-badge-warning",
  operational: "glass-badge-success",
  degraded: "glass-badge-warning",
  down: "glass-badge-danger",
  unavailable: "glass-badge-danger",
};

const mockResponse = (
  payload: HireDeskQueryPayload,
): HireDeskQueryResponse => ({
  success: true,
  data: {
    answer: `Mock ${payload.queryType} response for "${payload.jobRole || "role"}" with context applied.`,
    queryType: payload.queryType,
    timestamp: new Date().toISOString(),
  },
});

const HireDeskChat = () => {
  const { showToast } = useToast();
  const [serviceStatus, setServiceStatus] = useState<
    "loading" | "operational" | "degraded" | "down" | "unavailable"
  >("loading");
  const [statusMessage, setStatusMessage] = useState("Checking service...");
  const [supportedQueryTypes, setSupportedQueryTypes] = useState<
    HireDeskQueryType[]
  >([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState(
    "Too many requests from this IP, please try again later.",
  );

  const mockMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("mock") === "1";
  }, []);

  const validateForm = (values: FormState) => {
    const errors: Partial<Record<keyof FormState, string>> = {};

    const trimmedQuery = values.query.trim();
    const trimmedJobRole = values.jobRole.trim();
    const trimmedCandidateInfo = values.candidateInfo.trim();
    const trimmedContext = values.context.trim();

    if (!trimmedQuery) {
      errors.query = "Query is required (1-2000 chars).";
    } else if (trimmedQuery.length > 2000) {
      errors.query = "Query must be 1-2000 characters.";
    }

    if (values.queryType === "candidate_match") {
      if (!trimmedJobRole && !trimmedCandidateInfo) {
        errors.candidateInfo =
          "For candidate_match, provide a job role or candidate info.";
      }
    }

    if (trimmedJobRole.length > 200) {
      errors.jobRole = "Job role must be 200 characters or fewer.";
    }

    if (trimmedCandidateInfo.length > 3000) {
      errors.candidateInfo = "Candidate info must be 3000 characters or fewer.";
    }

    if (trimmedContext.length > 1000) {
      errors.context = "Context must be 1000 characters or fewer.";
    }

    return errors;
  };

  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    setValues,
  } = useForm<FormState>(INITIAL_FORM, validateForm);

  const fetchStatus = async () => {
    setServiceStatus("loading");
    setStatusMessage("Checking service...");

    try {
      const response = await assistantService.getStatus();
      const status = response.data.status || "operational";
      setServiceStatus(status);
      setSupportedQueryTypes(response.data.supportedQueryTypes || []);
      setStatusMessage(
        status === "operational"
          ? "Operational"
          : "Service available with limits",
      );
    } catch (error) {
      console.error("HireDesk status error", error);
      setServiceStatus("unavailable");
      setStatusMessage("Service unavailable");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedForm = window.localStorage.getItem("hiredesk_chat_last_form");
    const savedHistory = window.localStorage.getItem("hiredesk_chat_history");

    if (savedForm) {
      try {
        setValues({ ...INITIAL_FORM, ...JSON.parse(savedForm) });
      } catch (error) {
        console.warn("Could not hydrate form", error);
      }
    }

    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch (error) {
        console.warn("Could not hydrate history", error);
      }
    }
  }, [setValues]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "hiredesk_chat_last_form",
      JSON.stringify(values),
    );
  }, [values]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "hiredesk_chat_history",
      JSON.stringify(messages),
    );
  }, [messages]);

  const appendMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const processResponse = (response: HireDeskQueryResponse) => {
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      queryType: response.data.queryType,
      content: response.data.answer,
      timestamp: response.data.timestamp,
    };
    appendMessage(assistantMessage);
    showToast("HireDesk answered your request", "success", {
      title: "Response ready",
    });
  };

  const onSubmit = handleSubmit(async (formValues) => {
    clearErrors();
    setRateLimited(false);

    if (serviceStatus !== "operational" && !mockMode) {
      showToast("Service is not available right now.", "warning", {
        title: "Service unavailable",
      });
      return;
    }

    const payload: HireDeskQueryPayload = {
      query: formValues.query.trim(),
      queryType: formValues.queryType,
      jobRole: formValues.jobRole.trim() || undefined,
      candidateInfo: formValues.candidateInfo.trim() || undefined,
      context: formValues.context.trim() || undefined,
    };

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      queryType: payload.queryType,
      content: payload.query,
      timestamp: new Date().toISOString(),
    };
    appendMessage(userMessage);

    if (mockMode) {
      processResponse(mockResponse(payload));
      return;
    }

    try {
      const response = await assistantService.query(payload);

      if (!response.success) {
        throw new Error(response.message || "HireDesk request failed");
      }

      processResponse(response);
    } catch (error: any) {
      console.error("HireDesk chat error", error);
      const category = getErrorCategory(error);
      const message = formatErrorMessage(error);

      if (error?.status === 429) {
        setRateLimited(true);
        const rateMessage =
          error?.errorData?.message ||
          message ||
          "Too many requests from this IP, please try again later.";

        setRateLimitMessage(rateMessage);
        showToast(rateMessage, "error", { title: "Rate limited" });
        return;
      }

      if (category === "validation") {
        showToast(message, "error", { title: "Validation error" });
      } else if (category === "network") {
        showToast("Unable to connect to the server. Please retry.", "error", {
          title: "Network error",
        });
      } else {
        showToast(message || "We hit a snag. Please retry.", "error", {
          title: "Request failed",
        });
      }

      setError(
        "query",
        "We could not process this request. Please adjust and retry.",
      );
    }
  });

  const clearAll = () => {
    reset();
    setMessages([]);
    setRateLimited(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("hiredesk_chat_last_form");
      window.localStorage.removeItem("hiredesk_chat_history");
    }
  };

  const disableSubmit =
    isLoading ||
    rateLimited ||
    serviceStatus === "unavailable" ||
    serviceStatus === "down";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
        <header className="relative z-10 border-b border-[rgba(107,114,128,0.2)] bg-[#171717] py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="btn-secondary px-3 py-1.5 text-xs rounded-[6px]"
                >
                  ← Dashboard
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-[#F5E6C8]">
                      HireDesk AI Co-pilot
                    </h1>
                    <span className="glass-badge glass-badge-primary rounded-[4px] text-[10px]">
                      AI Chat
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Recruitment assistance & prompt engineering
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span
                  className={`glass-badge rounded-[4px] text-xs ${statusStyles[serviceStatus]}`}
                >
                  {serviceStatus === "loading" ? "Checking..." : statusMessage}
                </span>
                {messages.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="btn-secondary px-3 py-1 text-xs rounded-[6px]"
                  >
                    Clear Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Messages Log */}
          {messages.length > 0 && (
            <div className="space-y-3 max-w-4xl mx-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-[6px] transition-all border ${
                    msg.role === "user"
                      ? "bg-[#1B1B1B] border-[rgba(107,114,128,0.3)] ml-auto max-w-2xl"
                      : "bg-[#171717] border-[rgba(212,175,55,0.3)] max-w-3xl"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                      {msg.role === "user" ? "You" : "HireDesk AI Assistant"}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F5E6C8] leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <section className="glass-panel p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[#F5E6C8]">
                AI Recruiter Workspace
              </h2>
              <p className="text-xs text-[#6B7280]">
                Generate screening prompts, JD descriptions, and candidate match
                scores
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <div className="flex justify-between text-xs text-[#6B7280] font-semibold mb-1">
                  <span>Prompt / Query *</span>
                  <span>{values.query.trim().length}/2000</span>
                </div>
                <textarea
                  name="query"
                  value={values.query}
                  onChange={handleChange}
                  rows={4}
                  className="glass-input w-full p-3 text-xs sm:text-sm"
                  placeholder="Ask HireDesk to screen candidates, generate tailored interview questions, or match a resume..."
                />
                {errors.query && (
                  <p className="text-xs text-[#EF4444] mt-1">{errors.query}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                    Query Type
                  </label>
                  <select
                    name="queryType"
                    value={values.queryType}
                    onChange={handleChange}
                    className="glass-input w-full p-2.5 text-xs sm:text-sm bg-[#171717]"
                  >
                    <option value="screening">Screening</option>
                    <option value="interview_questions">
                      Interview Questions
                    </option>
                    <option value="job_posting">Job Posting</option>
                    <option value="candidate_match">Candidate Match</option>
                  </select>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {queryTypeHints[values.queryType]}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                    Job Role Title (Optional)
                  </label>
                  <input
                    type="text"
                    name="jobRole"
                    value={values.jobRole}
                    onChange={handleChange}
                    className="glass-input w-full p-2.5 text-xs sm:text-sm"
                    placeholder="e.g. Senior Frontend Architect"
                  />
                  {errors.jobRole && (
                    <p className="text-xs text-[#EF4444] mt-1">
                      {errors.jobRole}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Candidate Notes / Summary (Optional)
                </label>
                <textarea
                  name="candidateInfo"
                  value={values.candidateInfo}
                  onChange={handleChange}
                  rows={2}
                  className="glass-input w-full p-2.5 text-xs sm:text-sm"
                  placeholder="Paste resume snippet or candidate highlights..."
                />
                {errors.candidateInfo && (
                  <p className="text-xs text-[#EF4444] mt-1">
                    {errors.candidateInfo}
                  </p>
                )}
              </div>

              {rateLimited && (
                <div className="p-3 glass-badge-danger text-xs font-semibold rounded-[4px]">
                  {rateLimitMessage}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={disableSubmit}
                  className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
                >
                  {isLoading ? "Processing Request..." : "Send to HireDesk AI"}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HireDeskChat;
