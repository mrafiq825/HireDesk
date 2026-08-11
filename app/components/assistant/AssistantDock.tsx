import { useEffect, useState } from "react";
import { assistantService } from "@services/assistantService";
import { useToast } from "@contexts/ToastContext";
import { useForm } from "@hooks/useForm";
import type {
  HireDeskQueryPayload,
  HireDeskQueryResponse,
  HireDeskQueryType,
} from "@app-types";

const initialForm = {
  query: "",
  queryType: "screening" as HireDeskQueryType,
};

type DockMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  queryType: HireDeskQueryType;
  ts: string;
};

const AssistantDock = () => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DockMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [mockMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("mock") === "1";
  });

  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm<typeof initialForm>(initialForm, (v) => {
      const errs: Partial<Record<keyof typeof initialForm, string>> = {};
      const trimmed = v.query.trim();
      if (!trimmed) {
        errs.query = "Query is required.";
      } else if (trimmed.length > 2000) {
        errs.query = "Max 2000 characters.";
      }
      return errs;
    });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("assistant_dock_messages");
    const savedForm = window.localStorage.getItem("assistant_dock_form");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (error) {
        console.warn("Could not parse dock messages", error);
      }
    }
    if (savedForm) {
      try {
        setValues({ ...initialForm, ...JSON.parse(savedForm) });
      } catch (error) {
        console.warn("Could not parse dock form", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "assistant_dock_messages",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("assistant_dock_form", JSON.stringify(values));
  }, [values]);

  const addMessage = (msg: DockMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const mockResponse = (
    payload: HireDeskQueryPayload
  ): HireDeskQueryResponse => ({
    success: true,
    data: {
      answer: `Mock ${payload.queryType} response for your request.`,
      queryType: payload.queryType,
      timestamp: new Date().toISOString(),
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    setPending(true);
    const payload: HireDeskQueryPayload = {
      query: formValues.query.trim(),
      queryType: formValues.queryType,
    };

    addMessage({
      id: `user-${Date.now()}`,
      role: "user",
      content: payload.query,
      queryType: payload.queryType,
      ts: new Date().toISOString(),
    });

    try {
      const response = mockMode
        ? mockResponse(payload)
        : await assistantService.query(payload);

      if (!response.success) {
        throw new Error(response.message || "Assistant request failed");
      }

      addMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.data.answer,
        queryType: response.data.queryType,
        ts: response.data.timestamp,
      });
      showToast("Assistant responded", "success", { title: "HireDesk" });
    } catch (error: any) {
      console.error("Assistant dock error", error);
      showToast(
        error?.message || "Unable to process request. Please retry.",
        "error",
        { title: "Assistant error" }
      );
    } finally {
      setPending(false);
    }
  });

  return (
    <div className="fixed right-4 bottom-4 z-40 w-[320px] sm:w-[360px] max-w-[calc(100%-2rem)]">
      <div className="glass-floating border border-white/15 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#94B69E] animate-pulse" />
            <span className="text-xs font-bold text-[#F3F7F4]">HireDesk Quick AI Assistant</span>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-xs text-[#94B69E] hover:underline font-semibold cursor-pointer"
          >
            {open ? "Minimize" : "Open Assistant"}
          </button>
        </div>

        {open && (
          <div className="space-y-3">
            <form className="space-y-3" onSubmit={onSubmit}>
              <div>
                <textarea
                  id="dock-query"
                  name="query"
                  value={values.query}
                  onChange={handleChange}
                  rows={2}
                  className="glass-input w-full p-2.5 text-xs resize-none"
                  placeholder="Quick prompt: screening, interview Qs..."
                />
                {errors.query && <p className="text-[10px] text-[#E58B8B] mt-1">{errors.query}</p>}
              </div>

              <div className="flex gap-2">
                <select
                  id="dock-type"
                  name="queryType"
                  value={values.queryType}
                  onChange={handleChange}
                  className="glass-input flex-1 p-2 text-xs bg-[#07110D]"
                >
                  <option value="screening">Screening</option>
                  <option value="interview_questions">Interview Questions</option>
                  <option value="job_posting">Job Posting</option>
                  <option value="candidate_match">Candidate Match</option>
                </select>
                <button
                  type="submit"
                  disabled={pending}
                  className="btn-primary px-4 py-2 text-xs font-semibold"
                >
                  {pending ? "..." : "Send"}
                </button>
              </div>
            </form>

            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl border text-xs ${
                    msg.role === "user"
                      ? "glass-card border-white/10"
                      : "glass-ai border-[#94B69E]/30"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-[#94B69E] mb-1">
                    <span className="font-bold">{msg.role === "user" ? "You" : "HireDesk"}</span>
                    <span>{msg.queryType}</span>
                  </div>
                  <p className="text-[#F3F7F4] leading-relaxed">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantDock;
