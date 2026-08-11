import React from "react";
import type { AdvancedAnalyticsProps } from "@app-types/components";

const ScoreGauge: React.FC<{ score: number; label: string }> = ({
  score,
  label,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#94B69E"
            strokeWidth="8"
            strokeDasharray={`${(score / 100) * 326.7} 326.7`}
            strokeLinecap="round"
            className="transition-all duration-1000 shadow-[0_0_12px_#94B69E]"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#F3F7F4]">{score}</span>
          <span className="text-[10px] text-[#718078]">/100</span>
        </div>
      </div>

      <p className="text-center text-xs font-semibold text-[#AAB8AF]">
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">
                  Resume Quality Scorecard
                </h3>
                <p className="text-xs text-[#718078]">
                  Automated Multi-Metric Candidate Evaluation
                </p>
              </div>
            </div>
            <span className="glass-badge glass-badge-primary">
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
            <div className="glass-ai p-4 rounded-xl text-xs sm:text-sm text-[#AAB8AF] leading-relaxed mb-6">
              <span className="text-[#94B69E] font-semibold">AI Evaluation Summary: </span>
              {resumeScore.reasoning}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {resumeScore.strengths && (
              <div className="glass-card p-4">
                <h4 className="text-xs font-semibold uppercase text-[#94B69E] mb-3">Key Strengths</h4>
                <ul className="space-y-1.5 text-xs text-[#AAB8AF]">
                  {resumeScore.strengths.map((str: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#94B69E]">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resumeScore.weaknesses && (
              <div className="glass-card p-4">
                <h4 className="text-xs font-semibold uppercase text-[#E4C58A] mb-3">Areas for Review</h4>
                <ul className="space-y-1.5 text-xs text-[#AAB8AF]">
                  {resumeScore.weaknesses.map((weak: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#E4C58A]">!</span>
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
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F3F7F4]">
                  Personality & Work Style Insights
                </h3>
                <p className="text-xs text-[#718078]">
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
                    <span className="font-semibold text-[#F3F7F4] capitalize">{key.replace(/_/g, " ")}</span>
                    <span className="font-bold text-[#94B69E]">{value as number}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#94B69E] rounded-full shadow-[0_0_8px_#94B69E]"
                      style={{ width: `${value as number}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {personalityInsights.work_style && (
            <div className="glass-card p-4 text-xs text-[#AAB8AF] leading-relaxed">
              <span className="font-semibold text-[#94B69E] block mb-1">Workplace Leadership Style:</span>
              {personalityInsights.work_style}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
