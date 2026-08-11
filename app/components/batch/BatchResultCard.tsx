import { useState } from "react";
import type { BatchResultCardProps } from "@app-types/components";
import type { RoleRecommendation } from "@app-types/index";

export const BatchResultCard = ({ result, index }: BatchResultCardProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (result.status === "error") {
    return (
      <div className="glass-panel p-6 border-l-4 border-l-[#E58B8B]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 text-[#E58B8B] font-bold flex items-center justify-center text-xs">
              #{index + 1}
            </span>
            <div>
              <h5 className="font-bold text-[#F3F7F4]">{result.file_name || `Candidate ${index + 1}`}</h5>
              <p className="text-xs text-[#E58B8B] mt-0.5">{result.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result.data) {
    return null;
  }

  const {
    resumeData,
    resumeScore,
    roleRecommendations,
    personalityInsights,
    careerPath,
  } = result.data;
  const { personalInfo, workExperience, education, skills, highlights } =
    resumeData;

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-start justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#94B69E] text-[#07110D] font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(148,182,158,0.3)]">
            #{index + 1}
          </div>
          <div>
            <h5 className="text-lg font-bold text-[#F3F7F4]">{personalInfo?.name || `Candidate ${index + 1}`}</h5>
            <p className="text-xs text-[#AAB8AF] mt-0.5">{personalInfo?.email || "—"} • {personalInfo?.location || "Location N/A"}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="glass-badge glass-badge-success text-base py-1 px-3">
            {resumeScore?.overall_score || "N/A"}% Overall
          </span>
        </div>
      </div>

      {resumeScore && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="glass-card p-2.5">
            <span className="text-[#718078] block">Technical</span>
            <span className="font-bold text-[#94B69E]">{resumeScore.technical_score}%</span>
          </div>
          <div className="glass-card p-2.5">
            <span className="text-[#718078] block">Experience</span>
            <span className="font-bold text-[#94B69E]">{resumeScore.experience_score}%</span>
          </div>
          <div className="glass-card p-2.5">
            <span className="text-[#718078] block">Education</span>
            <span className="font-bold text-[#94B69E]">{resumeScore.education_score}%</span>
          </div>
          <div className="glass-card p-2.5">
            <span className="text-[#718078] block">Communication</span>
            <span className="font-bold text-[#94B69E]">{resumeScore.communication_score}%</span>
          </div>
        </div>
      )}

      {highlights && highlights.length > 0 && (
        <div className="glass-ai p-4 space-y-2">
          <h6 className="text-xs font-semibold uppercase text-[#94B69E]">Key Highlights</h6>
          <div className="space-y-1 text-xs text-[#AAB8AF]">
            {highlights.slice(0, 3).map((h: string, idx: number) => (
              <p key={idx} className="flex gap-2">
                <span className="text-[#94B69E]">✓</span>
                <span>{h}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Accordion Expanders */}
      <div className="space-y-2 text-xs">
        {skills && skills.length > 0 && (
          <div className="glass-card p-3">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("skills")}>
              <span className="font-semibold text-[#F3F7F4]">Extracted Skills ({skills.length})</span>
              <span className="text-[#94B69E]">{expandedSection === "skills" ? "▲" : "▼"}</span>
            </div>
            {expandedSection === "skills" && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                {skills.map((s: string, idx: number) => (
                  <span key={idx} className="glass-badge glass-badge-primary">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchResultCard;
