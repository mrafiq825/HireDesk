import React, { useState } from "react";
import type { RoleRecommendationsProps } from "@app-types/components";

export const RoleRecommendationsCard: React.FC<RoleRecommendationsProps> = ({
  recommendations,
}) => {
  const [expandedRole, setExpandedRole] = useState<number | null>(0);

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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">
              Recommended Roles
            </h3>
            <p className="text-xs text-[#718078]">
              {recommendations.length} Position Recommendation{recommendations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((role, index) => {
          const isExpanded = expandedRole === index;

          return (
            <div
              key={index}
              className={`glass-card p-5 sm:p-6 cursor-pointer transition-all duration-200 ${
                isExpanded ? "border-[#94B69E]/60 bg-white/10" : ""
              }`}
              onClick={() => setExpandedRole(isExpanded ? null : index)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-bold text-[#F3F7F4]">{role.roleName}</h4>
                    <span className="glass-badge glass-badge-primary">{role.careerLevel}</span>
                  </div>
                  <p className="text-xs text-[#718078] mt-1">Industry: {role.industryFit}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="glass-badge glass-badge-success text-sm py-1 px-3">
                    {role.matchPercentage}% Match
                  </div>
                  <span className={`text-[#AAB8AF] transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#AAB8AF] mt-3 leading-relaxed">
                {role.reasoning}
              </p>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-semibold uppercase text-[#94B69E] mb-2">Matching Skills</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {role.requiredSkills.map((skill, sIdx) => (
                        <span key={sIdx} className="glass-badge glass-badge-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {role.missingSkills.length > 0 && (
                    <div>
                      <h5 className="text-xs font-semibold uppercase text-[#E4C58A] mb-2">Development Areas</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {role.missingSkills.map((skill, sIdx) => (
                          <span key={sIdx} className="glass-badge glass-badge-warning">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
