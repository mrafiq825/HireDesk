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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
              Recommended Roles
            </h3>
            <p className="text-xs text-[#6B7280]">
              {recommendations.length} Position Recommendation
              {recommendations.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((role, index) => {
          const isExpanded = expandedRole === index;

          return (
            <div
              key={index}
              className={`glass-card p-4 sm:p-5 cursor-pointer transition-colors duration-180 ${
                isExpanded ? "border-[rgba(212,175,55,0.5)]" : ""
              }`}
              onClick={() => setExpandedRole(isExpanded ? null : index)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-base font-bold text-[#F5E6C8]">
                      {role.roleName}
                    </h4>
                    <span className="glass-badge glass-badge-primary rounded-[4px]">
                      {role.careerLevel}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Industry: {role.industryFit}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="glass-badge glass-badge-success text-xs py-1 px-2.5 rounded-[4px]">
                    {role.matchPercentage}% Match
                  </div>
                  <span
                    className={`text-[#6B7280] text-xs transition-transform duration-180 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed">
                {role.reasoning}
              </p>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-[rgba(107,114,128,0.2)] grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-semibold uppercase text-[#D4AF37] mb-2">
                      Matching Skills
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {role.requiredSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="glass-badge glass-badge-primary rounded-[4px] text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {role.missingSkills.length > 0 && (
                    <div>
                      <h5 className="text-xs font-semibold uppercase text-[#F59E0B] mb-2">
                        Development Areas
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {role.missingSkills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="glass-badge glass-badge-warning rounded-[4px] text-xs"
                          >
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
