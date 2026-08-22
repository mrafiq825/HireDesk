import React from "react";
import type { ComparisonResultsDisplayProps } from "@app-types/components";

export const ComparisonResultsDisplay: React.FC<
  ComparisonResultsDisplayProps
> = ({ results, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!results || !results.ranked_candidates) {
    return null;
  }

  const { ranked_candidates, comparison_summary, recommendations } = results;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card p-4 sm:p-5 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
            {comparison_summary.total_submitted}
          </p>
          <p className="text-[11px] text-[#6B7280] mt-1 font-semibold uppercase">
            Total Resumes
          </p>
        </div>
        <div className="glass-card p-4 sm:p-5 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#D4AF37]">
            {comparison_summary.successful}
          </p>
          <p className="text-[11px] text-[#6B7280] mt-1 font-semibold uppercase">
            Analyzed
          </p>
        </div>
        <div className="glass-card p-4 sm:p-5 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#D4AF37]">
            {comparison_summary.highest_score.toFixed(1)}%
          </p>
          <p className="text-[11px] text-[#6B7280] mt-1 font-semibold uppercase">
            Top Score
          </p>
        </div>
        <div className="glass-card p-4 sm:p-5 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
            {comparison_summary.average_score.toFixed(1)}%
          </p>
          <p className="text-[11px] text-[#6B7280] mt-1 font-semibold uppercase">
            Average Score
          </p>
        </div>
      </div>

      {/* Ranked Candidates Grid */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-[#F5E6C8]">
          Ranked Finalists
        </h3>
        {ranked_candidates.map((candidate, index) => (
          <div
            key={`${candidate.filename}-${index}`}
            className={`glass-card p-5 sm:p-6 relative overflow-hidden ${
              index === 0 ? "border-[rgba(212,175,55,0.5)]" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-4 border-b border-[rgba(107,114,128,0.2)]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-[4px] bg-[#D4AF37] text-[#171717] font-bold flex items-center justify-center text-xs">
                  #{index + 1}
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#F5E6C8]">
                    {candidate.resumeData?.personalInfo?.name ||
                      candidate.filename}
                  </h4>
                  <p className="text-xs text-[#6B7280]">{candidate.filename}</p>
                </div>
              </div>

              <span className="glass-badge glass-badge-success text-xs py-1 px-2.5 rounded-[4px]">
                {candidate.score.toFixed(1)}% Match Score
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              {candidate.strengths && (
                <div>
                  <h5 className="font-semibold text-[#D4AF37] uppercase mb-2">
                    Strengths
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.strengths.map((str, idx) => (
                      <span
                        key={idx}
                        className="glass-badge glass-badge-primary rounded-[4px] text-xs"
                      >
                        {str}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {candidate.weaknesses && (
                <div>
                  <h5 className="font-semibold text-[#F59E0B] uppercase mb-2">
                    Weaknesses
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.weaknesses.map((weak, idx) => (
                      <span
                        key={idx}
                        className="glass-badge glass-badge-warning rounded-[4px] text-xs"
                      >
                        {weak}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="bg-[#171717] p-5 sm:p-6 space-y-3 border border-[rgba(212,175,55,0.3)] rounded-[6px]">
          <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            AI Hiring Decision Guide
          </h4>
          <ul className="space-y-2 text-xs text-[#6B7280] leading-relaxed">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-[#D4AF37]">💡</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
