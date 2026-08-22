import type { PasswordStrengthProps } from "@app-types/components";

const getStrengthWidthClass = (strength: number): string => {
  if (strength === 0) return "w-0";
  if (strength <= 10) return "w-[10%]";
  if (strength <= 20) return "w-[20%]";
  if (strength <= 30) return "w-[30%]";
  if (strength <= 40) return "w-[40%]";
  if (strength <= 50) return "w-[50%]";
  if (strength <= 60) return "w-[60%]";
  if (strength <= 70) return "w-[70%]";
  if (strength <= 80) return "w-[80%]";
  if (strength <= 90) return "w-[90%]";
  return "w-full";
};

export const PasswordStrengthIndicator = ({
  strength,
  newPassword,
}: PasswordStrengthProps) => {
  const getStrengthLabel = () => {
    if (strength === 0) return "No password";
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthBgColor = () => {
    if (strength === 0) return "bg-[#6B7280]";
    if (strength <= 25) return "bg-[#EF4444]";
    if (strength <= 50) return "bg-[#F59E0B]";
    if (strength <= 75) return "bg-[#D4AF37]";
    return "bg-[#D4AF37]";
  };

  const getStrengthTextColor = () => {
    if (strength === 0) return "text-[#6B7280]";
    if (strength <= 25) return "text-[#EF4444]";
    if (strength <= 50) return "text-[#F59E0B]";
    if (strength <= 75) return "text-[#D4AF37]";
    return "text-[#D4AF37]";
  };

  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  return (
    <div className="mt-4 space-y-3">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#6B7280]">
            Password Strength:
          </span>
          <span className={`text-xs font-semibold ${getStrengthTextColor()}`}>
            {getStrengthLabel()}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden border border-[rgba(107,114,128,0.2)]">
          <div
            className={`h-full ${getStrengthBgColor()} transition-all duration-180 rounded-full ${getStrengthWidthClass(strength)}`}
          ></div>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <p className="text-xs font-medium text-[#F5E6C8]">Requirements:</p>
        <ul className="space-y-1">
          <li
            className={`flex items-center gap-2 text-xs transition-colors duration-180 ${
              hasMinLength ? "text-[#D4AF37]" : "text-[#6B7280]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {hasMinLength ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            <span>At least 8 characters</span>
          </li>

          <li
            className={`flex items-center gap-2 text-xs transition-colors duration-180 ${
              hasUppercase ? "text-[#D4AF37]" : "text-[#6B7280]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {hasUppercase ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            <span>One uppercase letter (A-Z)</span>
          </li>

          <li
            className={`flex items-center gap-2 text-xs transition-colors duration-180 ${
              hasLowercase ? "text-[#D4AF37]" : "text-[#6B7280]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {hasLowercase ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            <span>One lowercase letter (a-z)</span>
          </li>

          <li
            className={`flex items-center gap-2 text-xs transition-colors duration-180 ${
              hasNumber ? "text-[#D4AF37]" : "text-[#6B7280]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {hasNumber ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
            <span>One number (0-9)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
