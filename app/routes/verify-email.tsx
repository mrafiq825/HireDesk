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
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/verify-email",
    },
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
          "No verification token found in the URL. Please check your email for the correct verification link.",
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
            "The verification link may have expired or is invalid. Please request a new verification email.",
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
      <div className="min-h-screen bg-[#171717] relative flex items-center justify-center pt-20 pb-12 text-[#F5E6C8]">
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="rounded-[6px] overflow-hidden bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] p-6 sm:p-8">
            {status === "loading" && (
              <div className="text-center space-y-3">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin"></div>
                </div>
                <h1 className="text-xl font-bold text-[#F5E6C8]">
                  Verifying Your Email
                </h1>
                <p className="text-xs text-[#6B7280]">
                  Please wait while we verify your email address...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="text-center space-y-3">
                <div className="flex justify-center mb-3">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h1 className="text-xl font-bold text-[#D4AF37]">{message}</h1>
                <p className="text-xs text-[#6B7280]">{errorDetails}</p>

                <div className="pt-3 space-y-2.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7280]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
                    <span>Redirecting to dashboard...</span>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="btn-primary w-full py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="text-center space-y-3">
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#171717] border border-[rgba(239,68,68,0.3)] text-[#EF4444] flex items-center justify-center">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <h1 className="text-xl font-bold text-[#EF4444]">{message}</h1>
                <p className="text-xs text-[#6B7280]">{errorDetails}</p>

                <div className="pt-3 space-y-2.5">
                  <button
                    onClick={() => navigate("/resend-verification")}
                    className="btn-primary w-full py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
                  >
                    Resend Verification Email
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-secondary w-full py-2 text-xs font-semibold rounded-[6px]"
                  >
                    Back to Login
                  </button>
                </div>

                <div className="mt-4 p-3 rounded-[4px] bg-[#171717] border border-[rgba(107,114,128,0.2)]">
                  <p className="text-[11px] text-[#6B7280]">
                    <strong className="text-[#D4AF37]">Tip:</strong>{" "}
                    Verification links expire after 24 hours. If your link has
                    expired, you can request a new one.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
