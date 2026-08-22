import React from "react";

interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

interface WorkExperienceProps {
  workExperience: WorkExperience[];
}

export const WorkExperienceCard: React.FC<WorkExperienceProps> = ({
  workExperience,
}) => {
  return (
    <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
      <div className="mb-8 flex items-center justify-between">
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 2a2 2 0 100-4 2 2 0 000 4zm0 0h.01M6 6V4m0 2a2 2 0 100-4 2 2 0 000 4zm0 0h.01M9 20h6m-3-4v4m-8-8h.01M5 20h.01"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
              Work Experience
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {workExperience.length} Position
              {workExperience.length !== 1 ? "s" : ""} Analyzed
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-3.5 sm:left-5 top-0 bottom-0 w-px bg-[rgba(107,114,128,0.2)]"></div>
        <div className="space-y-6 sm:space-y-8">
          {workExperience.map((exp, index) => (
            <div key={index} className="group relative pl-10 sm:pl-14">
              <div className="absolute left-1.5 sm:left-3 top-1 w-4 h-4 rounded-full bg-[#171717] border-2 border-[#D4AF37] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
              </div>
              <div className="glass-card p-4 sm:p-5 space-y-2">
                <div>
                  <h4 className="text-base font-bold text-[#F5E6C8] group-hover:text-[#D4AF37] transition-colors">
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-[#D4AF37]">
                      {exp.company}
                    </span>
                    <span className="text-xs text-[#6B7280]">•</span>
                    <span className="text-xs text-[#6B7280]">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-[rgba(107,114,128,0.2)]">
                  {exp.description.map((desc, descIndex) => (
                    <li
                      key={descIndex}
                      className="flex items-start gap-2 text-xs text-[#6B7280] leading-relaxed"
                    >
                      <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
