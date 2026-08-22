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
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/forgot-password",
    },
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#F5E6C8] mb-1">
                Forgot Password
              </h1>
              <p className="text-[#6B7280] text-xs">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase text-[#6B7280] mb-1.5"
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
                    className="glass-input w-full p-2.5 text-xs sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="btn-primary w-full py-2.5 text-xs sm:text-sm font-semibold rounded-[6px] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#171717] border-t-transparent animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Email"
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
                  className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 cursor-pointer"
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
                  onClick={() => navigate("/signup")}
                  className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 cursor-pointer"
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Create New Account</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px] flex items-center justify-center gap-2 cursor-pointer"
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
                  <strong className="text-[#D4AF37]">Check your email:</strong>{" "}
                  If an account exists with this email, you'll receive a
                  password reset link within a few minutes. Check your spam
                  folder if you don't see it.
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
