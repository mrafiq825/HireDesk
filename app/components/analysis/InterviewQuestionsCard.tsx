import React from "react";

interface InterviewQuestion {
  type: string;
  question: string;
  context: string;
}

interface InterviewQuestionsProps {
  questions: InterviewQuestion[];
}

export const InterviewQuestionsCard: React.FC<InterviewQuestionsProps> = ({
  questions,
}) => {
  return (
    <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37]">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
              Tailored Interview Questions
            </h3>
            <p className="text-xs text-[#6B7280]">
              {questions.length} AI-Generated Assessment Question
              {questions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((q, index) => (
          <div key={index} className="glass-card p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="glass-badge glass-badge-primary uppercase tracking-wider text-[10px] rounded-[4px]">
                {q.type}
              </span>
              <span className="text-xs font-semibold text-[#6B7280]">
                Q{index + 1}
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#F5E6C8] leading-relaxed">
              "{q.question}"
            </h4>
            <div className="p-3 rounded-[6px] bg-[#171717] border border-[rgba(107,114,128,0.2)] text-xs text-[#6B7280] leading-relaxed flex items-start gap-2">
              <span className="text-[#D4AF37] font-semibold">Context:</span>
              <span>{q.context}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
