import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@contexts/AuthContext";
import { TermsOfServiceModal } from "@modals/TermsOfServiceModal";
import { PrivacyPolicyModal } from "@modals/PrivacyPolicyModal";
import type { LoginFormData, SignUpFormData } from "@app-types";
import "./AuthCard.css";

export interface AuthCardProps {
  initialMode?: "signin" | "signup";
}

export const AuthCard: React.FC<AuthCardProps> = ({
  initialMode = "signin",
}) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isSignUp, setIsSignUp] = useState<boolean>(initialMode === "signup");
  const [hasToggled, setHasToggled] = useState<boolean>(false);

  // Password visibility states
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form loading & error states
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  // Email verification screen state
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Terms & Privacy Modal states
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Sign In Controlled State
  const [signInData, setSignInData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Sign Up Controlled State
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    name: "",
    company_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Validation Error States
  const [signInErrors, setSignInErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [signUpErrors, setSignUpErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});

  const handleToggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasToggled(true);
    const nextModeIsSignUp = !isSignUp;
    setIsSignUp(nextModeIsSignUp);
    setSignInError("");
    setSignUpError("");
    setUnverifiedEmail("");

    // Sync route URL seamlessly
    if (nextModeIsSignUp) {
      navigate("/signup", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const validateSignIn = (): boolean => {
    const errors: Partial<Record<keyof LoginFormData, string>> = {};
    if (!signInData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      errors.email = "Email is invalid";
    }

    if (!signInData.password) {
      errors.password = "Password is required";
    } else if (signInData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = (): boolean => {
    const errors: Partial<Record<keyof SignUpFormData, string>> = {};

    if (!signUpData.name || !signUpData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!signUpData.company_name || !signUpData.company_name.trim()) {
      errors.company_name = "Company name is required";
    }

    if (!signUpData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      errors.email = "Email is invalid";
    }

    if (!signUpData.password) {
      errors.password = "Password is required";
    } else if (signUpData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(signUpData.password)) {
      errors.password =
        "Password requires uppercase, lowercase, and a number";
    }

    if (!signUpData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!signUpData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the Terms and Privacy Policy";
    }

    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInError("");
    setUnverifiedEmail("");

    if (!validateSignIn()) return;

    setIsSignInLoading(true);
    try {
      await login(signInData.email, signInData.password);
      navigate("/");
    } catch (error: any) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.requiresVerification
      ) {
        setUnverifiedEmail(signInData.email);
        setSignInError("Please verify your email address before logging in.");
      } else {
        setSignInError(
          error.response?.data?.error || "Login failed. Please try again."
        );
      }
    } finally {
      setIsSignInLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignUpError("");

    if (!validateSignUp()) return;

    setIsSignUpLoading(true);
    try {
      await register({
        name: signUpData.name,
        company_name: signUpData.company_name,
        email: signUpData.email,
        password: signUpData.password,
      });
      setRegisteredEmail(signUpData.email);
      setRequiresVerification(true);
    } catch (error: any) {
      setSignUpError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setIsSignUpLoading(false);
    }
  };

  // Determine animation classes for background elements
  // Note: '.signup' places teal bg on RIGHT (for Sign In view on left),
  // while '.signin' places teal bg on LEFT (for Sign Up view on right).
  const bgAnimationClass = hasToggled
    ? isSignUp
      ? "signin"
      : "signup"
    : initialMode === "signup"
      ? "signin"
      : "signup";

  if (requiresVerification) {
    return (
      <div className="auth-card-container">
        <div className="card" style={{ height: "auto", minHeight: "400px" }}>
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Check Your Email
            </h2>
            <p className="text-slate-600 mb-4 text-sm">
              Account created successfully! We sent a verification link to:
            </p>
            <p className="text-base font-semibold text-[#624B4F] break-all bg-slate-100 px-4 py-2 rounded-lg mb-6">
              {registeredEmail}
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={() => navigate("/resend-verification")}
                className="w-full bg-[#624B4F] text-white py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm cursor-pointer"
              >
                Didn't receive email?
              </button>
              <button
                onClick={() => {
                  setRequiresVerification(false);
                  setIsSignUp(false);
                  navigate("/login");
                }}
                className="w-full bg-slate-200 text-slate-700 py-2.5 rounded-lg hover:bg-slate-300 transition-all font-medium text-sm cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card-container">
      <div className="card">
        {/* Background animated shapes */}
        <div className={`card-bg card-bg-1 ${bgAnimationClass}`} />
        <div className={`card-bg card-bg-2 ${bgAnimationClass}`} />

        {/* Brand Logos - Order preserved for CSS sibling selectors */}
        <div className="logo logo-1 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/40 flex items-center justify-center border border-white/20 shadow-inner overflow-hidden p-1">
            <img
              src="/logo/logo-icon-transparent.png"
              alt="HireDesk Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
              Hire<span className="text-cyan-200">Desk</span>
            </span>
            <span className="text-[10px] font-bold text-cyan-100/90 tracking-widest uppercase mt-1">
              AI Hiring Platform
            </span>
          </div>
        </div>

        <div className="logo logo-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/40 flex items-center justify-center border border-white/20 shadow-inner overflow-hidden p-1">
            <img
              src="/logo/logo-icon-transparent.png"
              alt="HireDesk Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
              Hire<span className="text-cyan-200">Desk</span>
            </span>
            <span className="text-[10px] font-bold text-cyan-100/90 tracking-widest uppercase mt-1">
              AI Hiring Platform
            </span>
          </div>
        </div>

        {/* Sign In Form */}
        <div className={`form signin ${!isSignUp ? "active" : ""}`}>
          <form onSubmit={handleSignInSubmit} noValidate>
            <h2>Login</h2>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={signInData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSignInData({ ...signInData, email: e.target.value })
                }
                className={signInErrors.email ? "input-error" : ""}
                required
              />
              {signInErrors.email && (
                <span className="error-text">{signInErrors.email}</span>
              )}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showSignInPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signInData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSignInData({ ...signInData, password: e.target.value })
                  }
                  className={signInErrors.password ? "input-error" : ""}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  className="toggle-password-btn"
                  title={showSignInPassword ? "Hide Password" : "Show Password"}
                >
                  {showSignInPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {signInErrors.password && (
                <span className="error-text">{signInErrors.password}</span>
              )}
            </div>

            <div className="form-footer-links">
              <Link to="/forgot-password" className="link-btn">
                Forgot password?
              </Link>
              <Link to="/resend-verification" className="link-btn">
                Verify Email
              </Link>
            </div>

            {signInError && (
              <div className="auth-alert-box">
                <p>{signInError}</p>
                {unverifiedEmail && (
                  <button
                    type="button"
                    onClick={() => navigate("/resend-verification")}
                    className="link-btn mt-1 text-xs underline font-semibold"
                  >
                    Resend verification email
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSignInLoading}
              className="auth-btn"
            >
              {isSignInLoading ? "SIGNING IN..." : "SIGN IN"}
            </button>

            <a href="#signup" onClick={handleToggleMode} className="auth-toggle-link">
              Don't have an account? <em>Sign up</em>
            </a>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`form signup ${isSignUp ? "active" : ""}`}>
          <form onSubmit={handleSignUpSubmit} noValidate>
            <h2>Register</h2>

            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={signUpData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSignUpData({ ...signUpData, name: e.target.value })
                }
                className={signUpErrors.name ? "input-error" : ""}
                required
              />
              {signUpErrors.name && (
                <span className="error-text">{signUpErrors.name}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Company Name"
                value={signUpData.company_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSignUpData({
                    ...signUpData,
                    company_name: e.target.value,
                  })
                }
                className={signUpErrors.company_name ? "input-error" : ""}
                required
              />
              {signUpErrors.company_name && (
                <span className="error-text">{signUpErrors.company_name}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={signUpData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                className={signUpErrors.email ? "input-error" : ""}
                required
              />
              {signUpErrors.email && (
                <span className="error-text">{signUpErrors.email}</span>
              )}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showSignUpPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                  className={signUpErrors.password ? "input-error" : ""}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  className="toggle-password-btn"
                >
                  {showSignUpPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {signUpErrors.password && (
                <span className="error-text">{signUpErrors.password}</span>
              )}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={signUpData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSignUpData({
                      ...signUpData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={signUpErrors.confirmPassword ? "input-error" : ""}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="toggle-password-btn"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {signUpErrors.confirmPassword && (
                <span className="error-text">
                  {signUpErrors.confirmPassword}
                </span>
              )}
            </div>

            <div className="terms-checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={signUpData.agreeToTerms}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSignUpData({
                    ...signUpData,
                    agreeToTerms: e.target.checked,
                  })
                }
              />
              <label htmlFor="agreeToTerms">
                I agree to the{" "}
                <button
                  type="button"
                  className="link-btn underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTermsModal(true);
                  }}
                >
                  Terms
                </button>{" "}
                &{" "}
                <button
                  type="button"
                  className="link-btn underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacyModal(true);
                  }}
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {signUpErrors.agreeToTerms && (
              <span className="error-text">{signUpErrors.agreeToTerms}</span>
            )}

            {signUpError && (
              <div className="auth-alert-box">
                <p>{signUpError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSignUpLoading}
              className="auth-btn"
            >
              {isSignUpLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </button>

            <a href="#signin" onClick={handleToggleMode} className="auth-toggle-link">
              Already have an account? <em>Sign in</em>
            </a>
          </form>
        </div>
      </div>

      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
};

export default AuthCard;
