import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@contexts/ToastContext";
import { PasswordStrengthIndicator } from "@ui/PasswordStrengthIndicator";
import NavbarWithModal from "@layout/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Set New Password — HireDesk Secure Reset" },
    {
      name: "description",
      content:
        "Set your new HireDesk password using your secure one-time reset link. Links expire after 24 hours. Choose a strong password to keep your account safe.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/reset-password",
    },
  ];
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPasswordWithToken } = useAuth();
  const { showToast } = useToast();

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [tokenError, setTokenError] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      setTokenError("Invalid reset link. Token is missing.");
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (newPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(newPassword)) strength += 25;
    if (/[a-z]/.test(newPassword)) strength += 25;
    if (/[0-9]/.test(newPassword)) strength += 25;

    setPasswordStrength(strength);
  }, [newPassword]);

  const validatePasswords = (): boolean => {
    if (!newPassword) {
      showToast("New password is required", "error", {
        title: "Validation Error",
      });
      return false;
    }

    if (!confirmPassword) {
      showToast("Please confirm your password", "error", {
        title: "Validation Error",
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error", {
        title: "Password Mismatch",
      });
      return false;
    }

    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error", {
        title: "Password Too Short",
      });
      return false;
    }

    if (!/[A-Z]/.test(newPassword)) {
      showToast(
        "Password must contain at least one uppercase letter (A-Z)",
        "error",
        { title: "Missing Uppercase Letter" },
      );
      return false;
    }

    if (!/[a-z]/.test(newPassword)) {
      showToast(
        "Password must contain at least one lowercase letter (a-z)",
        "error",
        { title: "Missing Lowercase Letter" },
      );
      return false;
    }

    if (!/[0-9]/.test(newPassword)) {
      showToast("Password must contain at least one number (0-9)", "error", {
        title: "Missing Number",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    if (!token) {
      showToast("Invalid reset link", "error", { title: "Error" });
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordWithToken(token, newPassword, confirmPassword);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenError) {
    return (
      <>
        <NavbarWithModal />
        <div className="min-h-screen bg-[#171717] relative flex items-center justify-center pt-20 pb-12 text-[#F5E6C8]">
          <div className="relative z-10 w-full max-w-md mx-auto px-4">
            <div className="rounded-[6px] overflow-hidden bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] p-6 sm:p-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-[4px] bg-[#171717] border border-[rgba(239,68,68,0.3)] text-[#EF4444] mx-auto">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#F5E6C8] mb-1">
                    Invalid Reset Link
                  </h1>
                  <p className="text-[#6B7280] text-xs">{tokenError}</p>
                </div>
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="btn-primary w-full py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
                  >
                    Request New Reset Link
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px]"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarWithModal />
      <div className="min-h-screen bg-[#171717] relative flex items-center justify-center pt-20 pb-12 text-[#F5E6C8]">
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="rounded-[6px] overflow-hidden bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)]">
            <div className="p-6 sm:p-8 border-b border-[rgba(107,114,128,0.2)] text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 rounded-[4px] bg-[#171717] border border-[rgba(212,175,55,0.3)] text-[#D4AF37] flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#F5E6C8] mb-1">
                Reset Your Password
              </h1>
              <p className="text-[#6B7280] text-xs">
                Enter your new password below. Make sure it's strong and secure.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    disabled={isLoading}
                    className="glass-input w-full p-2.5 text-xs sm:text-sm"
                  />
                  {newPassword && (
                    <PasswordStrengthIndicator
                      strength={passwordStrength}
                      newPassword={newPassword}
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    className="glass-input w-full p-2.5 text-xs sm:text-sm"
                  />
                  {newPassword && confirmPassword && (
                    <div className="mt-2">
                      {newPassword === confirmPassword ? (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-[#D4AF37]">
                          ✓ Passwords match
                        </p>
                      ) : (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-[#EF4444]">
                          ! Passwords don't match
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || passwordStrength < 100}
                  className="btn-primary w-full py-2.5 text-xs sm:text-sm font-semibold rounded-[6px] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#171717] border-t-transparent animate-spin"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              <div className="my-4 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[rgba(107,114,128,0.2)]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[#1B1B1B] text-[#6B7280]">
                    Other Options
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => navigate("/login")}
                  className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1"
                    />
                  </svg>
                  <span>Back to Login</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
                    />
                  </svg>
                  <span>Back to Home</span>
                </button>
              </div>

              <div className="p-3 rounded-[4px] bg-[#171717] border border-[rgba(107,114,128,0.2)]">
                <p className="text-[11px] text-[#6B7280] leading-relaxed">
                  <strong className="text-[#D4AF37]">Security Tip:</strong> This
                  link expires in 24 hours. If it expires, you'll need to
                  request a new password reset.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 text-xs text-[#6B7280]">
            Need help?{" "}
            <a href="/contact" className="text-[#D4AF37] hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
