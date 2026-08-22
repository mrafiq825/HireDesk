import React from "react";
import type { ResumeAnalysisDisplayProps } from "@app-types/components";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { SkillsCard } from "./SkillsCard";
import { RoleRecommendationsCard } from "./RoleRecommendationsCard";
import { InterviewQuestionsCard } from "./InterviewQuestionsCard";
import { AnalysisOverview } from "./AnalysisOverview";
import { EducationCard } from "./EducationCard";
import { AdvancedAnalytics } from "./AdvancedAnalytics";

export const ResumeAnalysisDisplay: React.FC<ResumeAnalysisDisplayProps> = ({
  analysisData,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-48 bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {(analysisData.resumeData ||
        analysisData.roleRecommendations ||
        analysisData.questions) && (
        <section className="relative">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
              Analysis Overview
            </h2>
          </div>
          <AnalysisOverview analysis={analysisData} />
        </section>
      )}

      {analysisData.resumeData?.personalInfo && (
        <section className="relative">
          <PersonalInfoCard
            personalInfo={analysisData.resumeData.personalInfo}
          />
        </section>
      )}

      {analysisData.resumeData?.workExperience &&
        analysisData.resumeData.workExperience.length > 0 && (
          <section className="relative">
            <WorkExperienceCard
              workExperience={analysisData.resumeData.workExperience}
            />
          </section>
        )}

      {(analysisData.resumeData?.education || []).length > 0 ||
      (analysisData.resumeData?.highlights || []).length > 0 ? (
        <section className="relative">
          <EducationCard
            education={analysisData.resumeData?.education || []}
            highlights={analysisData.resumeData?.highlights || []}
          />
        </section>
      ) : null}

      {analysisData.resumeData?.skills &&
        analysisData.resumeData.skills.length > 0 && (
          <section className="relative">
            <SkillsCard skills={analysisData.resumeData.skills} />
          </section>
        )}

      {analysisData.roleRecommendations &&
        analysisData.roleRecommendations.length > 0 && (
          <section className="relative">
            <RoleRecommendationsCard
              recommendations={analysisData.roleRecommendations}
            />
          </section>
        )}

      {analysisData.questions && analysisData.questions.length > 0 && (
        <section className="relative">
          <InterviewQuestionsCard questions={analysisData.questions} />
        </section>
      )}

      {(analysisData.resumeScore ||
        analysisData.personalityInsights ||
        analysisData.careerPath) && (
        <section className="relative">
          <AdvancedAnalytics
            resumeScore={analysisData.resumeScore}
            personalityInsights={analysisData.personalityInsights}
            careerPath={analysisData.careerPath}
          />
        </section>
      )}
    </div>
  );
};
