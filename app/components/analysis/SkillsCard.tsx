import React, { useState } from "react";
import type { SkillsProps } from "@app-types/components";

export const SkillsCard: React.FC<SkillsProps> = ({ skills }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">
            Skills Breakdown
          </h3>
        </div>
        <span className="glass-badge glass-badge-primary">
          {skills.length} Competencies
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {skills.map((skill: string, skillIndex: number) => (
          <div
            key={skillIndex}
            onMouseEnter={() => setHoveredIndex(skillIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`glass-card p-3 sm:p-4 transition-all duration-200 ${
              hoveredIndex === skillIndex ? "border-[#94B69E]/50 text-[#94B69E]" : "text-[#F3F7F4]"
            }`}
          >
            <p className="text-sm font-semibold truncate">
              {skill}
            </p>
            <div
              className={`h-0.5 mt-2 bg-[#94B69E] transition-all duration-300 ${
                hoveredIndex === skillIndex ? "w-full shadow-[0_0_8px_#94B69E]" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#718078]">
        <span>Extracted via AI Parsing</span>
        <span className="font-semibold text-[#94B69E]">High Confidence Score</span>
      </div>
    </div>
  );
};
