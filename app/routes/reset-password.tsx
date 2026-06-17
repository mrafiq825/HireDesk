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
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/reset-password" },
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
        { title: "Missing Uppercase Letter" }
      );
      return false;
    }

    if (!/[a-z]/.test(newPassword)) {
      showToast(
        "Password must contain at least one lowercase letter (a-z)",
        "error",
        { title: "Missing Lowercase Letter" }
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center pt-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-10 opacity-50">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
            </div>
            <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
          </div>

          <div className="relative z-10 w-full max-w-md mx-auto px-4">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-6 sm:p-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 mx-auto">
                  <svg
                    className="w-6 h-6 text-red-400"
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
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Invalid Reset Link
                  </h1>
                  <p className="text-slate-400 text-sm">{tokenError}</p>
                </div>
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Request New Reset Link
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full px-6 py-3 bg-slate-700/50 border border-slate-600/50 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/70 transition-all duration-300"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
          </div>
          <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-6 sm:p-8">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
                    <svg
                      className="w-6 h-6 text-white"
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
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                  Reset Your Password
                </h1>
                <p className="text-indigo-100 text-center text-sm">
                  Enter your new password below. Make sure it's strong and
                  secure.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-slate-300 mb-2"
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
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="block text-sm font-medium text-slate-300 mb-2"
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
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {newPassword && confirmPassword && (
                    <div className="mt-2">
                      {newPassword === confirmPassword ? (
                        <p className="flex items-center gap-2 text-xs font-medium text-green-400">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Passwords match
                        </p>
                      ) : (
                        <p className="flex items-center gap-2 text-xs font-medium text-red-400">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Passwords don't match
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || passwordStrength < 100}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              <div className="my-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-slate-800/80 text-slate-400 font-medium">
                    Other Options
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="group relative px-6 py-3 font-semibold text-slate-200 rounded-xl overflow-hidden transition-all duration-300 border border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-600/10 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    className="w-4 h-4 relative z-10"
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
                  <span className="relative z-10">Back to Login</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="group relative px-6 py-3 font-semibold text-slate-300 rounded-xl overflow-hidden transition-all duration-300 border border-slate-600/30 hover:border-slate-600/60 hover:bg-slate-700/20 hover:shadow-lg hover:shadow-slate-600/10 flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    className="w-4 h-4 relative z-10"
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
                  <span className="relative z-10">Back to Home</span>
                </button>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-slate-700/20 border border-slate-700/50">
                <p className="text-xs text-slate-400">
                  <strong>Security Tip:</strong> This link expires in 24 hours.
                  If it expires, you'll need to request a new password reset.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-slate-400">
            Need help?{" "}
            <a
              href="/contact"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
