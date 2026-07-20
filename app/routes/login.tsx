import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "@layout/Navbar";
import RedirectIfAuthenticated from "@auth/RedirectIfAuthenticated";
import { useAuth } from "@contexts/AuthContext";
import { useForm } from "@hooks/useForm";
import type { Route } from "../+types/root";
import type { LoginFormData } from "@app-types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In to HireDesk — AI-Powered Hiring Platform" },
    {
      name: "description",
      content:
        "Log in to your HireDesk account and access AI-powered resume screening, candidate comparison, and batch analysis tools to hire top talent faster.",
    },
    // Auth pages should not be indexed — no SEO value + private content
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/login" },
    {
      name: "keywords",
      content: "Login, HireDesk",
    },
  ];
}

const validateLogin = (values: LoginFormData) => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const { values, errors, isLoading, handleChange, handleSubmit } =
    useForm<LoginFormData>(
      {
        email: "",
        password: "",
        rememberMe: false,
      },
      validateLogin
    );

  const onSubmit = async (formData: LoginFormData) => {
    setLoginError("");
    setUnverifiedEmail("");

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error: any) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.requiresVerification
      ) {
        setUnverifiedEmail(formData.email);
        setLoginError("Please verify your email address before logging in.");
      } else {
        setLoginError(
          error.response?.data?.error || "Login failed. Please try again."
        );
      }
    }
  };

  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar />

        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-300">
                  Sign in to your HireDesk account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors placeholder-gray-400 ${
                      errors.email
                        ? "border-red-500 bg-red-500/10 text-red-300"
                        : "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-colors placeholder-gray-400 ${
                        errors.password
                          ? "border-red-500 bg-red-500/10 text-red-300"
                          : "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
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
                          className="w-5 h-5"
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
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      Remember me
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {loginError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="text-red-300 text-sm font-medium">
                          {loginError}
                        </p>
                        {unverifiedEmail && (
                          <div className="mt-3 space-y-2">
                            <p className="text-red-200 text-xs">
                              Email:{" "}
                              <span className="font-medium">
                                {unverifiedEmail}
                              </span>
                            </p>
                            <button
                              type="button"
                              onClick={() => navigate("/resend-verification")}
                              className="text-blue-400 hover:text-blue-300 text-sm font-medium underline transition-colors"
                            >
                              Send verification email again
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                  <Link
                    to="/resend-verification"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Verify email
                  </Link>
                </div>

                <p className="text-gray-300 text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
};

export default Login;
