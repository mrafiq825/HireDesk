import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@contexts/ToastContext";
import NavbarWithModal from "@layout/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset Your Password — HireDesk" },
    {
      name: "description",
      content:
        "Forgot your HireDesk password? Enter your email to receive a secure reset link and regain access to your AI-powered hiring platform.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/forgot-password" },
  ];
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const { showToast } = useToast();

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      showToast("Email is required", "error", { title: "Validation Error" });
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      showToast("Please enter a valid email address", "error", {
        title: "Invalid Email",
      });
      setIsLoading(false);
      return;
    }

    try {
      await forgotPassword(email);
      setEmail("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white text-center mb-2">
                  Forgot Password
                </h1>
                <p className="text-indigo-100 text-center text-sm">
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Email"
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
                  className="group relative px-6 py-3 font-semibold text-slate-200 rounded-xl overflow-hidden transition-all duration-300 border border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-600/10 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
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
                  onClick={() => navigate("/signup")}
                  className="group relative px-6 py-3 font-semibold text-slate-200 rounded-xl overflow-hidden transition-all duration-300 border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-600/10 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span className="relative z-10">Create New Account</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="group relative px-6 py-3 font-semibold text-slate-300 rounded-xl overflow-hidden transition-all duration-300 border border-slate-600/30 hover:border-slate-600/60 hover:bg-slate-700/20 hover:shadow-lg hover:shadow-slate-600/10 flex items-center justify-center gap-2 cursor-pointer"
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
                  <strong>Check your email:</strong> If an account exists with
                  this email, you'll receive a password reset link within a few
                  minutes. Check your spam folder if you don't see it.
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
