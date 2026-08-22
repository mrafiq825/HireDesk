import React from "react";
import type { AdvancedAnalyticsProps } from "@app-types/components";

const ScoreGauge: React.FC<{ score: number; label: string }> = ({
  score,
  label,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(107, 114, 128, 0.2)"
            strokeWidth="7"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="7"
            strokeDasharray={`${(score / 100) * 326.7} 326.7`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#F5E6C8]">{score}</span>
          <span className="text-[10px] text-[#6B7280]">/100</span>
        </div>
      </div>

      <p className="text-center text-xs font-semibold text-[#6B7280]">
        {label}
      </p>
    </div>
  );
};

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({
  resumeScore,
  personalityInsights,
  careerPath,
}) => {
  if (!resumeScore && !personalityInsights && !careerPath) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Resume Quality Score */}
      {resumeScore && (
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
                  Resume Quality Scorecard
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Automated Multi-Metric Candidate Evaluation
                </p>
              </div>
            </div>
            <span className="glass-badge glass-badge-primary rounded-[4px]">
              Overall {Math.round(resumeScore.overall_score)}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <ScoreGauge
              score={Math.round(resumeScore.overall_score)}
              label="Overall"
            />
            <ScoreGauge
              score={Math.round(resumeScore.technical_score)}
              label="Technical"
            />
            <ScoreGauge
              score={Math.round(resumeScore.experience_score)}
              label="Experience"
            />
            <ScoreGauge
              score={Math.round(resumeScore.education_score)}
              label="Education"
            />
            <ScoreGauge
              score={Math.round(resumeScore.communication_score)}
              label="Communication"
            />
          </div>

          {resumeScore.reasoning && (
            <div className="bg-[#171717] border border-[rgba(107,114,128,0.2)] p-4 rounded-[6px] text-xs text-[#6B7280] leading-relaxed mb-6">
              <span className="text-[#D4AF37] font-semibold">
                AI Evaluation Summary:{" "}
              </span>
              {resumeScore.reasoning}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {resumeScore.strengths && (
              <div className="glass-card p-4">
                <h4 className="text-xs font-semibold uppercase text-[#D4AF37] mb-3">
                  Key Strengths
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6B7280]">
                  {resumeScore.strengths.map((str: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#D4AF37]">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resumeScore.weaknesses && (
              <div className="glass-card p-4">
                <h4 className="text-xs font-semibold uppercase text-[#F59E0B] mb-3">
                  Areas for Review
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6B7280]">
                  {resumeScore.weaknesses.map((weak: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#F59E0B]">!</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Personality Insights */}
      {personalityInsights && (
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
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
                  Personality & Work Style Insights
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Behavioral & Team Culture Evaluation
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {personalityInsights.traits &&
              Object.entries(personalityInsights.traits).map(([key, value]) => (
                <div key={key} className="glass-card p-4">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-[#F5E6C8] capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-bold text-[#D4AF37]">
                      {value as number}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden border border-[rgba(107,114,128,0.2)]">
                    <div
                      className="h-full bg-[#D4AF37] rounded-full"
                      style={{ width: `${value as number}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {personalityInsights.work_style && (
            <div className="glass-card p-4 text-xs text-[#6B7280] leading-relaxed">
              <span className="font-semibold text-[#D4AF37] block mb-1">
                Workplace Leadership Style:
              </span>
              {personalityInsights.work_style}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
