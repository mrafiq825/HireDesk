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
      <div className="glass-panel p-6 border-l-4 border-l-[#EF4444]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-[4px] bg-[#171717] border border-[rgba(239,68,68,0.3)] text-[#EF4444] font-bold flex items-center justify-center text-xs">
              #{index + 1}
            </span>
            <div>
              <h5 className="font-bold text-[#F5E6C8] text-sm">
                {result.file_name || `Candidate ${index + 1}`}
              </h5>
              <p className="text-xs text-[#EF4444] mt-0.5">{result.error}</p>
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
      <div className="flex items-start justify-between pb-4 border-b border-[rgba(107,114,128,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[4px] bg-[#D4AF37] text-[#171717] font-bold text-xs flex items-center justify-center">
            #{index + 1}
          </div>
          <div>
            <h5 className="text-base font-bold text-[#F5E6C8]">
              {personalInfo?.name || `Candidate ${index + 1}`}
            </h5>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {personalInfo?.email || "—"} •{" "}
              {personalInfo?.location || "Location N/A"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="glass-badge glass-badge-success text-xs py-1 px-2.5 rounded-[4px]">
            {resumeScore?.overall_score || "N/A"}% Overall
          </span>
        </div>
      </div>

      {resumeScore && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="glass-card p-2.5">
            <span className="text-[#6B7280] block text-[11px]">Technical</span>
            <span className="font-bold text-[#D4AF37]">
              {resumeScore.technical_score}%
            </span>
          </div>
          <div className="glass-card p-2.5">
            <span className="text-[#6B7280] block text-[11px]">Experience</span>
            <span className="font-bold text-[#D4AF37]">
              {resumeScore.experience_score}%
            </span>
          </div>
          <div className="glass-card p-2.5">
            <span className="text-[#6B7280] block text-[11px]">Education</span>
            <span className="font-bold text-[#D4AF37]">
              {resumeScore.education_score}%
            </span>
          </div>
          <div className="glass-card p-2.5">
            <span className="text-[#6B7280] block text-[11px]">
              Communication
            </span>
            <span className="font-bold text-[#D4AF37]">
              {resumeScore.communication_score}%
            </span>
          </div>
        </div>
      )}

      {highlights && highlights.length > 0 && (
        <div className="bg-[#171717] border border-[rgba(107,114,128,0.2)] rounded-[6px] p-3.5 space-y-1.5">
          <h6 className="text-xs font-semibold uppercase text-[#D4AF37]">
            Key Highlights
          </h6>
          <div className="space-y-1 text-xs text-[#6B7280]">
            {highlights.slice(0, 3).map((h: string, idx: number) => (
              <p key={idx} className="flex gap-2">
                <span className="text-[#D4AF37]">✓</span>
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
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("skills")}
            >
              <span className="font-semibold text-[#F5E6C8]">
                Extracted Skills ({skills.length})
              </span>
              <span className="text-[#D4AF37] text-xs">
                {expandedSection === "skills" ? "▲" : "▼"}
              </span>
            </div>
            {expandedSection === "skills" && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(107,114,128,0.2)]">
                {skills.map((s: string, idx: number) => (
                  <span
                    key={idx}
                    className="glass-badge glass-badge-primary rounded-[4px] text-xs"
                  >
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
