import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { RateLimitModalProps } from "@app-types/components";

const RateLimitModal: React.FC<RateLimitModalProps> = ({
  isOpen,
  onClose,
  filesUploaded,
  uploadLimit,
}) => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "Unlock Unlimited Potential",
      content:
        "You've reached your 10-file limit. Upgrade to Premium for unlimited resume analysis and advanced AI insights.",
      benefits: [
        "Unlimited resume uploads",
        "Advanced AI matching algorithms",
        "Priority customer support",
        "Export detailed reports",
        "Team collaboration features",
      ],
    },
    {
      title: "Premium Features Await",
      content:
        "Join thousands of HR professionals who trust HireDesk Premium for their recruitment needs.",
      benefits: [
        "100+ uploads per month",
        "Real-time candidate scoring",
        "Custom interview templates",
        "Integration with ATS systems",
        "Advanced analytics dashboard",
      ],
    },
    {
      title: "Ready to Upgrade?",
      content:
        "Get started with Premium today and transform your hiring process with unlimited AI-powered insights.",
      benefits: [
        "Instant upgrade activation",
        "30-day money-back guarantee",
        "24/7 premium support",
        "Free onboarding session",
        "Exclusive beta features access",
      ],
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentTip(0);
    }
  }, [isOpen]);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#1B1B1B] rounded-[6px] border border-[rgba(107,114,128,0.2)] overflow-hidden">
        <div className="p-6 border-b border-[rgba(107,114,128,0.2)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.4)] flex items-center justify-center text-[#D4AF37]">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5E6C8]">
                Upload Limit Reached
              </h2>
              <p className="text-xs text-[#6B7280]">
                {filesUploaded}/{uploadLimit} files uploaded on Free Tier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Close modal"
            aria-label="Close modal"
            className="text-[#6B7280] hover:text-[#F5E6C8] p-1 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={prevTip}
              title="Previous tip"
              aria-label="Previous tip"
              className="text-[#6B7280] hover:text-[#F5E6C8] text-xs flex items-center gap-1 cursor-pointer"
            >
              ← Previous
            </button>

            <div className="flex space-x-1.5">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip
                      ? "bg-[#D4AF37]"
                      : "bg-[rgba(107,114,128,0.3)]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTip}
              title="Next tip"
              aria-label="Next tip"
              className="text-[#6B7280] hover:text-[#F5E6C8] text-xs flex items-center gap-1 cursor-pointer"
            >
              Next →
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#F5E6C8] mb-1.5">
              {tips[currentTip].title}
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {tips[currentTip].content}
            </p>
          </div>

          <div className="bg-[#171717] rounded-[6px] p-4 border border-[rgba(107,114,128,0.2)]">
            <h4 className="text-xs font-semibold uppercase text-[#D4AF37] mb-3">
              Included in Premium
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tips[currentTip].benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center text-xs text-[#F5E6C8]"
                >
                  <span className="text-[#D4AF37] mr-2">•</span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleContactClick}
              title="Contact Sales Team"
              aria-label="Contact Sales Team"
              className="btn-primary flex-1 py-2.5 px-4 text-xs font-semibold rounded-[6px]"
            >
              Contact Sales Team
            </button>

            <button
              onClick={onClose}
              className="btn-secondary flex-1 py-2.5 px-4 text-xs font-medium rounded-[6px]"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default RateLimitModal;
