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
            className="h-48 glass-panel animate-pulse"
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-[#F3F7F4]">{comparison_summary.total_submitted}</p>
          <p className="text-xs text-[#718078] mt-1 font-semibold uppercase">Total Resumes</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-[#94B69E]">{comparison_summary.successful}</p>
          <p className="text-xs text-[#718078] mt-1 font-semibold uppercase">Analyzed</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-[#94B69E]">{comparison_summary.highest_score.toFixed(1)}%</p>
          <p className="text-xs text-[#718078] mt-1 font-semibold uppercase">Top Score</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-2xl font-bold text-[#F3F7F4]">{comparison_summary.average_score.toFixed(1)}%</p>
          <p className="text-xs text-[#718078] mt-1 font-semibold uppercase">Average Score</p>
        </div>
      </div>

      {/* Ranked Candidates Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#F3F7F4]">Ranked Finalists</h3>
        {ranked_candidates.map((candidate, index) => (
          <div
            key={`${candidate.filename}-${index}`}
            className={`glass-card p-6 relative overflow-hidden ${
              index === 0 ? "border-[#94B69E]/50 glass-ai" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#94B69E] text-[#07110D] font-bold flex items-center justify-center text-sm shadow-[0_0_12px_rgba(148,182,158,0.3)]">
                  #{index + 1}
                </span>
                <div>
                  <h4 className="text-lg font-bold text-[#F3F7F4]">
                    {candidate.resumeData?.personalInfo?.name || candidate.filename}
                  </h4>
                  <p className="text-xs text-[#718078]">{candidate.filename}</p>
                </div>
              </div>

              <span className="glass-badge glass-badge-success text-base py-1 px-3.5">
                {candidate.score.toFixed(1)}% Match Score
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              {candidate.strengths && (
                <div>
                  <h5 className="font-semibold text-[#94B69E] uppercase mb-2">Strengths</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.strengths.map((str, idx) => (
                      <span key={idx} className="glass-badge glass-badge-primary">
                        {str}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {candidate.weaknesses && (
                <div>
                  <h5 className="font-semibold text-[#E4C58A] uppercase mb-2">Weaknesses</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.weaknesses.map((weak, idx) => (
                      <span key={idx} className="glass-badge glass-badge-warning">
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
        <div className="glass-ai p-6 space-y-3 border border-[#94B69E]/30">
          <h4 className="text-sm font-bold text-[#94B69E] uppercase tracking-wider">AI Hiring Decision Guide</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#AAB8AF] leading-relaxed">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-[#94B69E]">💡</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
