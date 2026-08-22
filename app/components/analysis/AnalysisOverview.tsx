import React from "react";
import type { AnalysisOverviewProps } from "@app-types/components";

export const AnalysisOverview: React.FC<AnalysisOverviewProps> = ({
  analysis,
}) => {
  const getFitBadgeClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "fit":
        return "glass-badge-success";
      case "partial":
        return "glass-badge-warning";
      case "unfit":
        return "glass-badge-danger";
      default:
        return "glass-badge-info";
    }
  };

  const overviewItems = [
    {
      label: "Fit Status",
      value: analysis.fitStatus ? analysis.fitStatus.toUpperCase() : "—",
      icon: "✓",
      badgeClass: getFitBadgeClass(analysis.fitStatus),
      description: analysis.reasoning || "Analyzing candidate fit...",
    },
    {
      label: "Best Fit Role",
      value: analysis.bestFitRole || "—",
      icon: "🎯",
      badgeClass: "glass-badge-primary",
      description: analysis.bestFitRole
        ? `Recommended for: ${analysis.bestFitRole}`
        : "No role recommendation yet",
    },
    {
      label: "Role Matches",
      value: analysis.roleRecommendations?.length || 0,
      icon: "📋",
      badgeClass: "glass-badge-primary",
    },
    {
      label: "Interview Questions",
      value: analysis.questions?.length || 0,
      icon: "❓",
      badgeClass: "glass-badge-info",
    },
    {
      label: "Resume Score",
      value: analysis.resumeScore
        ? `${analysis.resumeScore.overall_score}%`
        : "—",
      icon: "⭐",
      badgeClass: "glass-badge-primary",
    },
    {
      label: "Insights Generated",
      value:
        (analysis.personalityInsights ? 1 : 0) + (analysis.careerPath ? 1 : 0),
      icon: "🧠",
      badgeClass: "glass-badge-info",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {overviewItems.map((item, index) => (
        <div
          key={index}
          className="glass-card p-4 sm:p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{item.icon}</span>
              <span
                className={`glass-badge ${item.badgeClass} rounded-[4px] text-[10px]`}
              >
                {item.label}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#F5E6C8] mt-1">
              {item.value}
            </p>
          </div>
          {item.description && (
            <p className="text-xs text-[#6B7280] mt-3 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
