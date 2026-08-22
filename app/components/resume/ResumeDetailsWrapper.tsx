import React from "react";
import type { ResumeDetailsWrapperProps } from "@app-types/components";

const ResumeDetailsWrapper: React.FC<ResumeDetailsWrapperProps> = ({
  resumeData,
}) => {
  if (!resumeData) {
    return (
      <div className="bg-[#1B1B1B] rounded-[6px] p-6 mt-8 border border-[rgba(107,114,128,0.2)]">
        <p className="text-[#6B7280] text-center text-xs">
          Upload a resume to see the extracted details here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1B1B1B] rounded-[6px] p-6 mt-8 border border-[rgba(107,114,128,0.2)]">
      <h2 className="text-xl font-bold text-[#F5E6C8] mb-6">
        Extracted Resume Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(resumeData.personalInfo?.name || resumeData.name) && (
          <div className="bg-[#171717] rounded-[6px] p-4 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-1">
              Name
            </h3>
            <p className="text-xs text-[#F5E6C8]">
              {resumeData.personalInfo?.name || resumeData.name}
            </p>
          </div>
        )}

        {(resumeData.personalInfo?.email || resumeData.email) && (
          <div className="bg-[#171717] rounded-[6px] p-4 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-1">
              Email
            </h3>
            <p className="text-xs text-[#F5E6C8]">
              {resumeData.personalInfo?.email || resumeData.email}
            </p>
          </div>
        )}

        {(resumeData.personalInfo?.phone || resumeData.phone) && (
          <div className="bg-[#171717] rounded-[6px] p-4 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-1">
              Phone
            </h3>
            <p className="text-xs text-[#F5E6C8]">
              {resumeData.personalInfo?.phone || resumeData.phone}
            </p>
          </div>
        )}

        {resumeData.personalInfo?.location && (
          <div className="bg-[#171717] rounded-[6px] p-4 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-1">
              Location
            </h3>
            <p className="text-xs text-[#F5E6C8]">
              {resumeData.personalInfo.location}
            </p>
          </div>
        )}

        {resumeData.workExperience && resumeData.workExperience.length > 0 && (
          <div className="bg-[#171717] rounded-[6px] p-4 md:col-span-2 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-3">
              Work Experience
            </h3>
            <div className="space-y-4">
              {resumeData.workExperience.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="border-l-2 border-[#D4AF37] pl-3 pb-3 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <div>
                      <p className="text-[#F5E6C8] font-medium text-xs">
                        {exp.title}
                      </p>
                      <p className="text-[#6B7280] text-xs">{exp.company}</p>
                    </div>
                    <p className="text-[#6B7280] text-[11px] mt-1 sm:mt-0">
                      {exp.duration}
                    </p>
                  </div>
                  {exp.description &&
                    Array.isArray(exp.description) &&
                    exp.description.length > 0 && (
                      <ul className="text-[#6B7280] text-xs space-y-1 mt-1.5">
                        {exp.description.map(
                          (desc: string, descIndex: number) => (
                            <li key={descIndex} className="flex items-start">
                              <span className="text-[#D4AF37] mr-1.5">•</span>
                              <span>{desc}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="bg-[#171717] rounded-[6px] p-4 md:col-span-2 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="glass-badge glass-badge-primary rounded-[4px] text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {resumeData.education &&
          Array.isArray(resumeData.education) &&
          resumeData.education.length > 0 && (
            <div className="bg-[#171717] rounded-[6px] p-4 md:col-span-2 border border-[rgba(107,114,128,0.2)]">
              <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-3">
                Education
              </h3>
              <div className="space-y-4">
                {resumeData.education.map((edu: any, index: number) => (
                  <div
                    key={index}
                    className="border-l-2 border-[#D4AF37] pl-3 pb-3 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <div>
                        <p className="text-[#F5E6C8] font-medium text-xs">
                          {edu.degree}
                        </p>
                        <p className="text-[#6B7280] text-xs">
                          {edu.institution}
                        </p>
                      </div>
                      <p className="text-[#6B7280] text-[11px] mt-1 sm:mt-0">
                        {edu.year}
                      </p>
                    </div>
                    {edu.details &&
                      Array.isArray(edu.details) &&
                      edu.details.length > 0 && (
                        <ul className="text-[#6B7280] text-xs space-y-1 mt-1.5">
                          {edu.details.map(
                            (detail: string, detailIndex: number) => (
                              <li
                                key={detailIndex}
                                className="flex items-start"
                              >
                                <span className="text-[#D4AF37] mr-1.5">•</span>
                                <span>{detail}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {resumeData.highlights && resumeData.highlights.length > 0 && (
          <div className="bg-[#171717] rounded-[6px] p-4 md:col-span-2 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-2">
              Highlights
            </h3>
            <ul className="text-[#6B7280] space-y-1.5 text-xs">
              {resumeData.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#D4AF37] mr-1.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resumeData.experience && !resumeData.workExperience && (
          <div className="bg-[#171717] rounded-[6px] p-4 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-2">
              Experience
            </h3>
            {typeof resumeData.experience === "string" ? (
              <p className="text-xs text-[#F5E6C8]">{resumeData.experience}</p>
            ) : Array.isArray(resumeData.experience) ? (
              <div className="space-y-3">
                {resumeData.experience.map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-[#D4AF37] pl-3">
                    <p className="text-[#F5E6C8] font-medium text-xs">
                      {exp.position}
                    </p>
                    <p className="text-[#6B7280] text-xs">{exp.company}</p>
                    <p className="text-[#6B7280] text-[11px]">{exp.duration}</p>
                    {exp.description && (
                      <p className="text-[#6B7280] text-xs mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : resumeData.experience &&
              typeof resumeData.experience === "object" ? (
              <div className="border-l-2 border-[#D4AF37] pl-3">
                <p className="text-[#F5E6C8] font-medium text-xs">
                  {(resumeData.experience as any).position}
                </p>
                <p className="text-[#6B7280] text-xs">
                  {(resumeData.experience as any).company}
                </p>
                <p className="text-[#6B7280] text-[11px]">
                  {(resumeData.experience as any).duration}
                </p>
                {(resumeData.experience as any).description && (
                  <p className="text-[#6B7280] text-xs mt-1">
                    {(resumeData.experience as any).description}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-[#F5E6C8]">
                {String(resumeData.experience)}
              </p>
            )}
          </div>
        )}

        {resumeData.summary && (
          <div className="bg-[#171717] rounded-[6px] p-4 md:col-span-2 border border-[rgba(107,114,128,0.2)]">
            <h3 className="text-xs font-semibold uppercase text-[#D4AF37] mb-2">
              Summary
            </h3>
            <p className="text-xs text-[#F5E6C8] leading-relaxed">
              {resumeData.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDetailsWrapper;
