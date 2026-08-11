import React from "react";

interface Education {
  degree: string;
  institution: string;
  year: string;
  details?: string[];
}

interface EducationProps {
  education: Education[];
  highlights?: string[];
}

export const EducationCard: React.FC<EducationProps> = ({
  education,
  highlights = [],
}) => {
  return (
    <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#94B69E]/15 border border-[#94B69E]/30 flex items-center justify-center text-[#94B69E]">
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
                d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5v-10M3 12l9 5m9-5l-9-5m0 0l-9 5m9-5v10m0-10l9 5v10l-9 5"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">
              Education & Key Highlights
            </h3>
            <p className="text-xs text-[#718078]">
              Academic Background and Verified Resume Highlights
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {education.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94B69E]">Education History</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {education.map((edu, index) => (
                <div key={index} className="glass-card p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-sm text-[#F3F7F4]">{edu.degree}</h5>
                      <span className="glass-badge glass-badge-primary">{edu.year}</span>
                    </div>
                    <p className="text-xs text-[#AAB8AF] mt-1">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {highlights.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94B69E]">Key Highlights</h4>
            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="glass-card p-3.5 flex items-start gap-3">
                  <span className="text-[#94B69E] text-sm">✨</span>
                  <p className="text-xs sm:text-sm text-[#AAB8AF] leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
