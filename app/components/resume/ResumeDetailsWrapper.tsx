import React from "react";
import type { ResumeDetailsWrapperProps } from "@app-types/components";

const ResumeDetailsWrapper: React.FC<ResumeDetailsWrapperProps> = ({
  resumeData,
}) => {
  if (!resumeData) {
    return (
      <div className="bg-slate-800/70 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
        <p className="text-gray-300 text-center">
          Upload a resume to see the extracted details here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/70 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">
        Extracted Resume Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(resumeData.personalInfo?.name || resumeData.name) && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Name</h3>
            <p className="text-gray-300">
              {resumeData.personalInfo?.name || resumeData.name}
            </p>
          </div>
        )}

        {(resumeData.personalInfo?.email || resumeData.email) && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Email</h3>
            <p className="text-gray-300">
              {resumeData.personalInfo?.email || resumeData.email}
            </p>
          </div>
        )}

        {(resumeData.personalInfo?.phone || resumeData.phone) && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Phone</h3>
            <p className="text-gray-300">
              {resumeData.personalInfo?.phone || resumeData.phone}
            </p>
          </div>
        )}

        {resumeData.personalInfo?.location && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Location</h3>
            <p className="text-gray-300">{resumeData.personalInfo.location}</p>
          </div>
        )}

        {resumeData.workExperience && resumeData.workExperience.length > 0 && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-3">Work Experience</h3>
            <div className="space-y-4">
              {resumeData.workExperience.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="border-l-2 border-indigo-500/50 pl-4 pb-4 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <p className="text-gray-300 font-medium">{exp.title}</p>
                      <p className="text-gray-400 text-sm">{exp.company}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 sm:mt-0">
                      {exp.duration}
                    </p>
                  </div>
                  {exp.description &&
                    Array.isArray(exp.description) &&
                    exp.description.length > 0 && (
                      <ul className="text-gray-400 text-sm space-y-1 mt-2">
                        {exp.description.map((desc: string, descIndex: number) => (
                          <li key={descIndex} className="flex items-start">
                            <span className="text-indigo-400 mr-2">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm"
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
            <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
              <h3 className="font-medium text-gray-200 mb-3">Education</h3>
              <div className="space-y-4">
                {resumeData.education.map((edu: any, index: number) => (
                  <div
                    key={index}
                    className="border-l-2 border-indigo-500/50 pl-4 pb-4 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <p className="text-gray-300 font-medium">
                          {edu.degree}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {edu.institution}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs mt-1 sm:mt-0">
                        {edu.year}
                      </p>
                    </div>
                    {edu.details &&
                      Array.isArray(edu.details) &&
                      edu.details.length > 0 && (
                        <ul className="text-gray-400 text-sm space-y-1 mt-2">
                          {edu.details.map((detail: string, detailIndex: number) => (
                            <li key={detailIndex} className="flex items-start">
                              <span className="text-indigo-400 mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {resumeData.highlights && resumeData.highlights.length > 0 && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-2">Highlights</h3>
            <ul className="text-gray-300 space-y-2">
              {resumeData.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-400 mr-2 mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resumeData.experience && !resumeData.workExperience && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Experience</h3>
            {typeof resumeData.experience === "string" ? (
              <p className="text-gray-300">{resumeData.experience}</p>
            ) : Array.isArray(resumeData.experience) ? (
              <div className="space-y-3">
                {resumeData.experience.map((exp: any, index: number) => (
                  <div
                    key={index}
                    className="border-l-2 border-indigo-500/50 pl-3"
                  >
                    <p className="text-gray-300 font-medium">{exp.position}</p>
                    <p className="text-gray-400 text-sm">{exp.company}</p>
                    <p className="text-gray-500 text-xs">{exp.duration}</p>
                    {exp.description && (
                      <p className="text-gray-400 text-sm mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : resumeData.experience &&
              typeof resumeData.experience === "object" ? (
              <div className="border-l-2 border-indigo-500/50 pl-3">
                <p className="text-gray-300 font-medium">
                  {(resumeData.experience as any).position}
                </p>
                <p className="text-gray-400 text-sm">
                  {(resumeData.experience as any).company}
                </p>
                <p className="text-gray-500 text-xs">
                  {(resumeData.experience as any).duration}
                </p>
                {(resumeData.experience as any).description && (
                  <p className="text-gray-400 text-sm mt-1">
                    {(resumeData.experience as any).description}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-300">{String(resumeData.experience)}</p>
            )}
          </div>
        )}

        {resumeData.summary && (
          <div className="bg-slate-700/50 rounded-lg p-4 md:col-span-2">
            <h3 className="font-medium text-gray-200 mb-2">Summary</h3>
            <p className="text-gray-300">{resumeData.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDetailsWrapper;
