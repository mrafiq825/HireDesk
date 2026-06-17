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
    { title: "HireDesk Chat — AI Recruiter Co-pilot for Screening & Interviews" },
    {
      name: "description",
      content:
        "Chat with HireDesk's AI co-pilot to generate screening questions, draft interview prompts, create job postings, and match candidates to roles in real time.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.vercel.app/hiredesk-chat" },
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
  loading:
    "bg-amber-400 text-white font-bold border-2 border-amber-500 shadow-lg shadow-amber-400/80",
  operational:
    "bg-emerald-400 text-white font-bold border-2 border-emerald-500 shadow-lg shadow-emerald-400/80",
  degraded:
    "bg-yellow-400 text-white font-bold border-2 border-yellow-500 shadow-lg shadow-yellow-400/80",
  down: "bg-red-400 text-white font-bold border-2 border-red-500 shadow-lg shadow-red-400/80",
  unavailable:
    "bg-red-400 text-white font-bold border-2 border-red-500 shadow-lg shadow-red-400/80",
};

const mockResponse = (
  payload: HireDeskQueryPayload
): HireDeskQueryResponse => ({
  success: true,
  data: {
    answer: `Mock ${payload.queryType} response for "${payload.jobRole || "role"}" with context applied.`,
    queryType: payload.queryType,
    timestamp: new Date().toISOString(),
  },
});

const HINT_CARD_BG =
  "bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90";

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
    "Too many requests from this IP, please try again later."
  );
  const [assistantOpen, setAssistantOpen] = useState(true);

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
          : "Service available with limits"
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
      JSON.stringify(values)
    );
  }, [values]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "hiredesk_chat_history",
      JSON.stringify(messages)
    );
  }, [messages]);

  const appendMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showToast("Copied to clipboard", "success", { title: "Copied" });
    } catch (error) {
      showToast("Could not copy text", "error", { title: "Copy failed" });
      console.error("Copy failed", error);
    }
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
        "We could not process this request. Please adjust and retry."
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
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-size-[20px_20px]"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-24 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl"></div>
          </div>
        </div>

        <header className="relative z-10 border-b border-slate-700/40 bg-linear-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex items-start gap-5 flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                      HireDesk
                    </h1>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/40">
                      Chat
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-indigo-200 mb-1">
                    Recruiter Co-pilot
                  </p>
                  <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                    AI-powered screening, interviews, job postings & candidate
                    matching
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-3">
                <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">
                  {mockMode && (
                    <span className="px-4 py-2 rounded-lg text-sm font-bold bg-blue-500/25 text-white border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 flex items-center gap-2">
                      Mock mode
                    </span>
                  )}
                  <span
                    className={`px-5 py-2.5 rounded-lg text-sm font-bold inline-flex items-center gap-3 ${statusStyles[serviceStatus]}`}
                  >
                    <span className="flex items-center gap-2"></span>
                    <span className="tracking-wide text-white">
                      {serviceStatus === "loading"
                        ? "Checking..."
                        : statusMessage}
                    </span>
                  </span>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
          <section
            className={`${HINT_CARD_BG} rounded-2xl border border-slate-700/60 p-6 shadow-xl`}
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Ask HireDesk
                    </h2>
                    <p className="text-sm text-slate-400">
                      Fill in the fields to mirror backend validation. Candidate
                      match requires job role or candidate info.
                    </p>
                  </div>
                  <button
                    onClick={clearAll}
                    className="text-sm text-slate-300 hover:text-white underline decoration-dotted underline-offset-4"
                  >
                    Clear state
                  </button>
                </div>

                <form className="space-y-4" onSubmit={onSubmit}>
                  <div className="space-y-2">
                    <label
                      htmlFor="query"
                      className="text-sm font-medium text-slate-200 flex items-center justify-between"
                    >
                      <span>Query *</span>
                      <span className="text-xs text-slate-400">
                        {values.query.trim().length}/2000
                      </span>
                    </label>
                    <textarea
                      id="query"
                      name="query"
                      value={values.query}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      placeholder="Ask HireDesk to screen, draft interview questions, optimize a posting, or match a candidate."
                    />
                    {errors.query && (
                      <p className="text-xs text-red-400">{errors.query}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="queryType"
                        className="text-sm font-medium text-slate-200"
                      >
                        Query type *
                      </label>
                      <select
                        id="queryType"
                        name="queryType"
                        value={values.queryType}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      >
                        <option value="screening">Screening</option>
                        <option value="interview_questions">
                          Interview questions
                        </option>
                        <option value="job_posting">Job posting</option>
                        <option value="candidate_match">Candidate match</option>
                      </select>
                      <p className="text-xs text-slate-400">
                        {queryTypeHints[values.queryType]}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="jobRole"
                        className="text-sm font-medium text-slate-200 flex items-center justify-between"
                      >
                        <span>Job role (optional)</span>
                        <span className="text-xs text-slate-400">
                          {values.jobRole.trim().length}/200
                        </span>
                      </label>
                      <input
                        id="jobRole"
                        type="text"
                        name="jobRole"
                        value={values.jobRole}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                        placeholder="e.g. Senior React Developer"
                      />
                      {errors.jobRole && (
                        <p className="text-xs text-red-400">{errors.jobRole}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="candidateInfo"
                      className="text-sm font-medium text-slate-200 flex items-center justify-between"
                    >
                      <span>Candidate info (optional)</span>
                      <span className="text-xs text-slate-400">
                        {values.candidateInfo.trim().length}/3000
                      </span>
                    </label>
                    <textarea
                      id="candidateInfo"
                      name="candidateInfo"
                      value={values.candidateInfo}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      placeholder="Paste resume highlights, notes, or summary for candidate match."
                    />
                    {errors.candidateInfo && (
                      <p className="text-xs text-red-400">
                        {errors.candidateInfo}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="context"
                      className="text-sm font-medium text-slate-200 flex items-center justify-between"
                    >
                      <span>Context (optional)</span>
                      <span className="text-xs text-slate-400">
                        {values.context.trim().length}/1000
                      </span>
                    </label>
                    <textarea
                      id="context"
                      name="context"
                      value={values.context}
                      onChange={handleChange}
                      rows={2}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                      placeholder="Add stack, seniority, location, or process notes."
                    />
                    {errors.context && (
                      <p className="text-xs text-red-400">{errors.context}</p>
                    )}
                  </div>

                  {rateLimited && (
                    <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-100">
                      <p className="text-sm font-semibold">Rate limited</p>
                      <p className="text-sm text-amber-200/80">
                        {rateLimitMessage}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={disableSubmit}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
                    >
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Send to HireDesk</span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M12 5l7 7-7 7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                    <div className="text-xs text-slate-400">
                      {supportedQueryTypes.length > 0 && (
                        <span>Supported: {supportedQueryTypes.join(", ")}</span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section
            className={`${HINT_CARD_BG} rounded-2xl border border-slate-700/60 p-5 shadow-inner`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
                <p className="text-sm font-semibold text-indigo-100 mb-2">
                  Client-side validation
                </p>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>Query required, 1-2000 chars.</li>
                  <li>jobRole ≤ 200, candidateInfo ≤ 3000, context ≤ 1000.</li>
                  <li>candidate_match needs jobRole or candidateInfo.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="text-sm font-semibold text-emerald-100 mb-2">
                  Behavior
                </p>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>
                    Status chip disables submit when down or rate limited.
                  </li>
                  <li>
                    Errors surface verbatim for 4xx; 500 uses safe fallback.
                  </li>
                  <li>History and last form persist for quick resubmits.</li>
                  <li>Mock mode via ?mock=1 for UI-only testing.</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HireDeskChat;
