import React from "react";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoCardProps {
  personalInfo: PersonalInfo;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  personalInfo,
}) => {
  return (
    <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-[rgba(107,114,128,0.2)]">
        <div>
          <span className="glass-badge glass-badge-primary mb-2 rounded-[4px]">
            CANDIDATE PROFILE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
            {personalInfo.name}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-[4px] bg-[#D4AF37] text-[#171717] flex items-center justify-center font-bold text-lg">
          {personalInfo.name?.[0]?.toUpperCase() || "C"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-[#D4AF37]">✉</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#6B7280] uppercase font-semibold">
              Email Address
            </p>
            <p className="text-xs font-semibold text-[#F5E6C8] truncate">
              {personalInfo.email || "—"}
            </p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-[#D4AF37]">📞</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#6B7280] uppercase font-semibold">
              Phone Contact
            </p>
            <p className="text-xs font-semibold text-[#F5E6C8] truncate">
              {personalInfo.phone || "—"}
            </p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-[#D4AF37]">📍</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#6B7280] uppercase font-semibold">
              Location
            </p>
            <p className="text-xs font-semibold text-[#F5E6C8] truncate">
              {personalInfo.location || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
