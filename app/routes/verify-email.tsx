import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import type { Route } from "../+types/root";
import { useAuth } from "@contexts/AuthContext";
import NavbarWithModal from "@layout/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify Your Email — HireDesk Account Activation" },
    {
      name: "description",
      content:
        "Click the link in your inbox to verify your email address and activate your HireDesk account. Verification links are valid for 24 hours.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/verify-email" },
  ];
}

type VerificationStatus = "loading" | "success" | "error";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, isAuthenticated } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing");
        setErrorDetails(
          "No verification token found in the URL. Please check your email for the correct verification link."
        );
        return;
      }

      try {
        await verifyEmail(token);
        setStatus("success");
        setMessage("Email verified successfully!");
        setErrorDetails("You are now logged in. Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error: any) {
        setStatus("error");
        setMessage("Email verification failed");
        setErrorDetails(
          error.message ||
            "The verification link may have expired or is invalid. Please request a new verification email."
        );
      }
    };

    if (!isAuthenticated) {
      verifyEmailToken();
    } else {
      navigate("/");
    }
  }, [searchParams, verifyEmail, navigate, isAuthenticated]);

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
          {status === "loading" && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-700/30"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Verifying Your Email
              </h1>
              <p className="text-slate-400">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <svg
                    className="w-8 h-8 text-green-400 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-2">
                {message}
              </h1>
              <p className="text-slate-300 mb-6">{errorDetails}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Redirecting to dashboard...</span>
                </div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30">
                  <svg
                    className="w-8 h-8 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent mb-2">
                {message}
              </h1>
              <p className="text-slate-300 mb-8">{errorDetails}</p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/resend-verification")}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Resend Verification Email
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-6 py-3 bg-slate-700/50 border border-slate-600/50 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/70 hover:border-slate-600 transition-all duration-300"
                >
                  Back to Login
                </button>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-slate-400">
                  <strong>Tip:</strong> Verification links expire after 24
                  hours. If your link has expired, you can request a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
