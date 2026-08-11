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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 2a2 2 0 100-4 2 2 0 000 4zm0 0h.01M6 6V4m0 2a2 2 0 100-4 2 2 0 000 4zm0 0h.01M9 20h6m-3-4v4m-8-8h.01M5 20h.01"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">
              Work Experience
            </h3>
            <p className="text-xs text-[#718078] mt-0.5">
              {workExperience.length} Position{workExperience.length !== 1 ? "s" : ""} Analyzed
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#94B69E]/30"></div>
        <div className="space-y-6 sm:space-y-8">
          {workExperience.map((exp, index) => (
            <div key={index} className="group relative pl-12 sm:pl-16">
              <div className="absolute left-1.5 sm:left-3.5 top-1 w-5 h-5 rounded-full bg-[#07110D] border-2 border-[#94B69E] shadow-[0_0_10px_#94B69E] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#94B69E] rounded-full" />
              </div>
              <div className="glass-card p-5 sm:p-6 space-y-3">
                <div>
                  <h4 className="text-lg font-bold text-[#F3F7F4] group-hover:text-[#94B69E] transition-colors">
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-semibold text-[#94B69E]">{exp.company}</span>
                    <span className="text-xs text-[#718078]">•</span>
                    <span className="text-xs text-[#718078]">{exp.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-2 border-t border-white/5">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="flex items-start gap-2 text-xs sm:text-sm text-[#AAB8AF] leading-relaxed">
                      <span className="text-[#94B69E] font-bold mt-0.5">•</span>
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
