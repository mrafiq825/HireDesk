import { useState } from "react";
import { createPortal } from "react-dom";
import type { TipsModalProps } from "@app-types/components";

const TipsModal = ({ isOpen, onClose }: TipsModalProps) => {
  const [currentTip, setCurrentTip] = useState(0);

  const hiringTips = [
    {
      title: "Define Clear Job Requirements",
      content:
        "Before starting the hiring process, clearly define the role's responsibilities, required skills, and cultural fit criteria. This helps attract the right candidates and makes evaluation more objective.",
      icon: "📋",
    },
    {
      title: "Use Behavioral Interview Questions",
      content:
        "Ask candidates to describe specific situations where they demonstrated key skills. Questions like 'Tell me about a time when...' reveal actual experience and problem-solving abilities.",
      icon: "💭",
    },
    {
      title: "Assess Cultural Fit",
      content:
        "Technical skills can be taught, but cultural fit is harder to change. Evaluate whether candidates align with your company values and will thrive in your work environment.",
      icon: "🤝",
    },
    {
      title: "Check References Thoroughly",
      content:
        "Don't skip reference checks. Previous employers can provide valuable insights into work ethic, reliability, and areas for improvement that interviews might not reveal.",
      icon: "🔍",
    },
    {
      title: "Consider Growth Potential",
      content:
        "Look beyond current skills to assess learning ability and growth mindset. Candidates who show curiosity and adaptability often outperform those with just technical expertise.",
      icon: "📈",
    },
    {
      title: "Provide Realistic Job Previews",
      content:
        "Be honest about challenges and expectations. This helps candidates make informed decisions and reduces turnover by ensuring they understand what they're signing up for.",
      icon: "🎯",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % hiringTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + hiringTips.length) % hiringTips.length);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#1B1B1B] rounded-[6px] border border-[rgba(107,114,128,0.2)] max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-[rgba(107,114,128,0.2)]">
          <h2 className="text-lg font-bold text-[#F5E6C8] flex items-center gap-2">
            Hiring Tips
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#F5E6C8] transition-colors p-1 cursor-pointer"
            aria-label="Close tips"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-3">{hiringTips[currentTip].icon}</div>
            <h3 className="text-base font-semibold text-[#F5E6C8] mb-2">
              {hiringTips[currentTip].title}
            </h3>
            <p className="text-[#6B7280] text-xs leading-relaxed">
              {hiringTips[currentTip].content}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevTip}
              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#F5E6C8] transition-colors text-xs cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex gap-1.5">
              {hiringTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTip(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip
                      ? "bg-[#D4AF37]"
                      : "bg-[rgba(107,114,128,0.3)]"
                  }`}
                  aria-label={`Go to tip ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTip}
              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#F5E6C8] transition-colors text-xs cursor-pointer"
            >
              Next
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-[11px] text-[#6B7280]">
              Tip {currentTip + 1} of {hiringTips.length}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="btn-primary w-full py-2.5 px-4 text-xs font-semibold rounded-[6px]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TipsModal;
