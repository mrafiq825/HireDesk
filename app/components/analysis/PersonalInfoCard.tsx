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
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
        <div>
          <span className="glass-badge glass-badge-primary mb-2">CANDIDATE PROFILE</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F3F7F4]">
            {personalInfo.name}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#94B69E] text-[#07110D] flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(148,182,158,0.3)]">
          {personalInfo.name?.[0]?.toUpperCase() || "C"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-[#94B69E]">✉️</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#718078] uppercase font-semibold">Email Address</p>
            <p className="text-xs font-semibold text-[#F3F7F4] truncate">{personalInfo.email || "—"}</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-[#94B69E]">📞</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#718078] uppercase font-semibold">Phone Contact</p>
            <p className="text-xs font-semibold text-[#F3F7F4] truncate">{personalInfo.phone || "—"}</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-[#94B69E]">📍</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-[#718078] uppercase font-semibold">Location</p>
            <p className="text-xs font-semibold text-[#F3F7F4] truncate">{personalInfo.location || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
