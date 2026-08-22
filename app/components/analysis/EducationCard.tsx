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
                d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5v-10M3 12l9 5m9-5l-9-5m0 0l-9 5m9-5v10m0-10l9 5v10l-9 5"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
              Education & Key Highlights
            </h3>
            <p className="text-xs text-[#6B7280]">
              Academic Background and Verified Resume Highlights
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {education.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Education History
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="glass-card p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-xs text-[#F5E6C8]">
                        {edu.degree}
                      </h5>
                      <span className="glass-badge glass-badge-primary rounded-[4px]">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {highlights.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-[rgba(107,114,128,0.2)]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Key Highlights
            </h4>
            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="glass-card p-3 flex items-start gap-2.5"
                >
                  <span className="text-[#D4AF37] text-xs">✨</span>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
