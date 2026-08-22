import React, { useState } from "react";
import type { SkillsProps } from "@app-types/components";

export const SkillsCard: React.FC<SkillsProps> = ({ skills }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
            Skills Breakdown
          </h3>
        </div>
        <span className="glass-badge glass-badge-primary rounded-[4px]">
          {skills.length} Competencies
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {skills.map((skill: string, skillIndex: number) => (
          <div
            key={skillIndex}
            onMouseEnter={() => setHoveredIndex(skillIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`glass-card p-3 sm:p-4 transition-colors duration-180 ${
              hoveredIndex === skillIndex
                ? "border-[rgba(212,175,55,0.5)] text-[#D4AF37]"
                : "text-[#F5E6C8]"
            }`}
          >
            <p className="text-xs font-semibold truncate">{skill}</p>
            <div
              className={`h-0.5 mt-2 bg-[#D4AF37] transition-all duration-180 ${
                hoveredIndex === skillIndex ? "w-full" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[rgba(107,114,128,0.2)] flex items-center justify-between text-xs text-[#6B7280]">
        <span>Extracted via AI Parsing</span>
        <span className="font-semibold text-[#D4AF37]">
          High Confidence Score
        </span>
      </div>
    </div>
  );
};
