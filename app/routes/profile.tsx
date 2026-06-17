import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "@layout/Navbar";
import { useAuth } from "@contexts/AuthContext";
import { authService } from "@services/authService";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Profile — Usage Analytics & Account Settings | HireDesk" },
    {
      name: "description",
      content:
        "View your HireDesk profile, track feature usage across Smart Review, Smart Screening, Find Best Fit, and Quick Screen, and manage your account password and details.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://hiredesk.vercel.app/profile" },
  ];
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [featureUsage, setFeatureUsage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<
    Partial<typeof passwordData>
  >({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profileData = await authService.getProfile();
        setProfile(profileData);

        if (profileData.email) {
          try {
            // Fetch feature usage statistics
            const featureUsage = await authService.getFeatureUsage(
              profileData.email
            );

            setFeatureUsage(featureUsage);
          } catch (usageError: any) {
            console.error("Error fetching feature usage:", usageError);
            // Set default values if fetch fails
            setFeatureUsage({
              filesUploaded: profileData.filesUploaded || 0,
              batch_analysis: 0,
              compare_resumes: 0,
              selected_candidate: 0,
            });
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const validatePasswordChange = () => {
    const errors: Partial<typeof passwordData> = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      errors.newPassword =
        "New password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "New passwords do not match";
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword =
        "New password must be different from current password";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordChange()) return;

    try {
      setIsChangingPassword(true);
      await authService.updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
      setShowPasswordChange(false);
    } catch (error) {
      throw error;
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!newName.trim()) {
      setNameError("Name cannot be empty");
      return;
    }

    if (newName.trim() === (profile?.name || user?.name)) {
      setNameError("New name must be different from current name");
      return;
    }

    try {
      setIsChangingPassword(true);
      setNameError(null);

      const updatedUser = await authService.updateProfile({
        name: newName.trim(),
      });

      setProfile((prev: any) =>
        prev ? { ...prev, name: updatedUser.name } : null
      );

      setShowNameEdit(false);
      setNewName("");
    } catch (error: any) {
      setNameError(error.message || "Failed to update name");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handlePasswordInputChange = (
    field: keyof typeof passwordData,
    value: string
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="text-center">
                <div className="text-red-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Error Loading Profile
                </h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                  <Link
                    to="/dashboard"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors text-center"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="relative mb-12">
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-4xl blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5 rounded-4xl blur-2xl opacity-40"></div>
            <div className="relative bg-gradient-to-br from-slate-800/40 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-4xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <div className="p-10 md:p-14 lg:p-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="relative flex-shrink-0 group">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-40 h-40 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-slate-900/50 transform transition-transform duration-300 group-hover:scale-110">
                        <span className="text-6xl font-bold text-white drop-shadow-lg">
                          {(profile?.name || user?.name || "")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full px-4 py-2 border-2 border-green-400 shadow-xl ring-2 ring-slate-950">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse drop-shadow-lg"></div>
                        <span className="text-xs font-bold text-green-300 tracking-wide">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-8">
                      {showNameEdit ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => {
                              setNewName(e.target.value);
                              setNameError(null);
                            }}
                            className={`w-full px-5 py-3 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 text-lg font-medium ${
                              nameError
                                ? "border-red-500/50 bg-red-500/10 text-red-300"
                                : "border-white/20 text-white focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10"
                            }`}
                            placeholder="Enter your full name"
                          />
                          {nameError && (
                            <p className="text-sm text-red-400">{nameError}</p>
                          )}
                          <div className="flex gap-3">
                            <button
                              onClick={handleNameUpdate}
                              disabled={isChangingPassword}
                              className="flex-1 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-cyan-800 disabled:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer transform hover:scale-105"
                            >
                              {isChangingPassword
                                ? "Updating..."
                                : "Save Changes"}
                            </button>
                            <button
                              onClick={() => {
                                setShowNameEdit(false);
                                setNewName("");
                                setNameError(null);
                              }}
                              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h1 className="text-5xl md:text-6xl font-bold mb-3">
                            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                              {profile?.name || user?.name}
                            </span>
                          </h1>
                          <p className="text-lg text-slate-300 font-medium flex items-center justify-center lg:justify-start gap-3">
                            <svg
                              className="w-5 h-5 text-cyan-400 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {profile?.company_name ||
                              user?.company_name ||
                              "No company"}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="mb-12 flex items-center justify-center lg:justify-start gap-3 text-slate-400 bg-white/5 px-6 py-3.5 rounded-xl border border-white/10 w-fit">
                      <svg
                        className="w-5 h-5 text-cyan-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        {profile?.email || user?.email}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-2">
                      <button
                        onClick={() => {
                          setShowNameEdit(!showNameEdit);
                          if (!showNameEdit) {
                            setNewName(profile?.name || user?.name || "");
                          }
                        }}
                        className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/50 cursor-pointer flex items-center gap-2"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        {showNameEdit ? "Cancel" : "Edit Name"}
                      </button>

                      <button
                        onClick={() =>
                          setShowPasswordChange(!showPasswordChange)
                        }
                        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-blue-500/50 cursor-pointer flex items-center gap-2"
                      >
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
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                        {showPasswordChange ? "Cancel" : "Change Password"}
                      </button>

                      <Link
                        to="/dashboard"
                        className="group relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 border border-slate-500/50 hover:border-slate-400 cursor-pointer flex items-center gap-2"
                      >
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
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-16 mb-16">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-7 hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                      <svg
                        className="w-6 h-6 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${(featureUsage?.filesUploaded || 0) >= 10 ? "text-red-400 bg-red-500/20 border border-red-500/30" : (featureUsage?.filesUploaded || 0) >= 8 ? "text-orange-400 bg-orange-500/20 border border-orange-500/30" : (featureUsage?.filesUploaded || 0) >= 5 ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30" : "text-green-400 bg-green-500/20 border border-green-500/30"}`}
                    >
                      {featureUsage?.filesUploaded || 0}/10
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Resume Files
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">
                    Files uploaded to your account
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10 mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${(featureUsage?.filesUploaded || 0) >= 10 ? "bg-gradient-to-r from-red-500 to-red-600" : (featureUsage?.filesUploaded || 0) >= 8 ? "bg-gradient-to-r from-orange-500 to-orange-600" : (featureUsage?.filesUploaded || 0) >= 5 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gradient-to-r from-cyan-500 to-blue-500"}`}
                      style={{
                        width: `${Math.min(100, ((featureUsage?.filesUploaded || 0) / 10) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      {Math.max(0, 10 - (featureUsage?.filesUploaded || 0))}{" "}
                      remaining
                    </span>
                    <span className="text-cyan-400 font-semibold">
                      {Math.round(
                        ((featureUsage?.filesUploaded || 0) / 10) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-7 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                      <svg
                        className="w-6 h-6 text-purple-400"
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
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${(featureUsage?.batch_analysis || 0) >= 5 ? "text-red-400 bg-red-500/20 border border-red-500/30" : (featureUsage?.batch_analysis || 0) >= 4 ? "text-orange-400 bg-orange-500/20 border border-orange-500/30" : (featureUsage?.batch_analysis || 0) >= 2 ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30" : "text-green-400 bg-green-500/20 border border-green-500/30"}`}
                    >
                      {featureUsage?.batch_analysis || 0}/10
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Batch Analysis
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">
                    Resume analyses performed this month
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10 mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${(featureUsage?.batch_analysis || 0) >= 5 ? "bg-gradient-to-r from-red-500 to-red-600" : (featureUsage?.batch_analysis || 0) >= 4 ? "bg-gradient-to-r from-orange-500 to-orange-600" : (featureUsage?.batch_analysis || 0) >= 2 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gradient-to-r from-purple-500 to-pink-500"}`}
                      style={{
                        width: `${Math.min(100, ((featureUsage?.batch_analysis || 0) / 5) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      {Math.max(0, 10 - (featureUsage?.batch_analysis || 0))}{" "}
                      remaining
                    </span>
                    <span className="text-purple-400 font-semibold">
                      {Math.round(
                        ((featureUsage?.batch_analysis || 0) / 10) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-7 hover:border-emerald-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all">
                      <svg
                        className="w-6 h-6 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8a2 2 0 012-2h6"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${(featureUsage?.compare_resumes || 0) >= 10 ? "text-red-400 bg-red-500/20 border border-red-500/30" : (featureUsage?.compare_resumes || 0) >= 8 ? "text-orange-400 bg-orange-500/20 border border-orange-500/30" : (featureUsage?.compare_resumes || 0) >= 5 ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30" : "text-green-400 bg-green-500/20 border border-green-500/30"}`}
                    >
                      {featureUsage?.compare_resumes || 0}/10
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Resume Comparison
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">
                    Resumes compared and ranked this month
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10 mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${(featureUsage?.compare_resumes || 0) >= 10 ? "bg-gradient-to-r from-red-500 to-red-600" : (featureUsage?.compare_resumes || 0) >= 8 ? "bg-gradient-to-r from-orange-500 to-orange-600" : (featureUsage?.compare_resumes || 0) >= 5 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gradient-to-r from-emerald-500 to-teal-500"}`}
                      style={{
                        width: `${Math.min(100, ((featureUsage?.compare_resumes || 0) / 10) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      {Math.max(0, 10 - (featureUsage?.compare_resumes || 0))}{" "}
                      remaining
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {Math.round(
                        ((featureUsage?.compare_resumes || 0) / 10) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/30 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-7 hover:border-amber-500/40 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all">
                      <svg
                        className="w-6 h-6 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a6 6 0 016-6H0a6 6 0 016 6z"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${(featureUsage?.selected_candidate || 0) >= 10 ? "text-red-400 bg-red-500/20 border border-red-500/30" : (featureUsage?.selected_candidate || 0) >= 8 ? "text-orange-400 bg-orange-500/20 border border-orange-500/30" : (featureUsage?.selected_candidate || 0) >= 5 ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30" : "text-green-400 bg-green-500/20 border border-green-500/30"}`}
                    >
                      {featureUsage?.selected_candidate || 0}/10
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Candidate Selection
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">
                    Evaluations performed this month
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10 mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${(featureUsage?.selected_candidate || 0) >= 10 ? "bg-gradient-to-r from-red-500 to-red-600" : (featureUsage?.selected_candidate || 0) >= 8 ? "bg-gradient-to-r from-orange-500 to-orange-600" : (featureUsage?.selected_candidate || 0) >= 5 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gradient-to-r from-amber-500 to-orange-500"}`}
                      style={{
                        width: `${Math.min(100, ((featureUsage?.selected_candidate || 0) / 10) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>
                      {Math.max(
                        0,
                        10 - (featureUsage?.selected_candidate || 0)
                      )}{" "}
                      remaining
                    </span>
                    <span className="text-amber-400 font-semibold">
                      {Math.round(
                        ((featureUsage?.selected_candidate || 0) / 10) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/30 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-7 hover:border-indigo-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-xl group-hover:from-indigo-500/30 group-hover:to-violet-500/30 transition-all">
                      <svg
                        className="w-6 h-6 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-bold px-3 py-1 rounded-full text-indigo-400 bg-indigo-500/20 border border-indigo-500/30">
                      {(featureUsage?.filesUploaded || 0) +
                        (featureUsage?.batch_analysis || 0) +
                        (featureUsage?.compare_resumes || 0) +
                        (featureUsage?.selected_candidate || 0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Total Usage
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">
                    Overall account activity
                  </p>
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg px-3 py-2.5 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Activity Status
                      </span>
                      <span
                        className={`text-xs font-bold ${featureUsage && ((featureUsage.filesUploaded || 0) > 0 || (featureUsage.batch_analysis || 0) > 0 || (featureUsage.compare_resumes || 0) > 0 || (featureUsage.selected_candidate || 0) > 0) ? "text-green-400" : "text-slate-400"}`}
                      >
                        {featureUsage &&
                        ((featureUsage.filesUploaded || 0) > 0 ||
                          (featureUsage.batch_analysis || 0) > 0 ||
                          (featureUsage.compare_resumes || 0) > 0 ||
                          (featureUsage.selected_candidate || 0) > 0)
                          ? "●  Active"
                          : "● Idle"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Combined operations across all services
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8">
              {showPasswordChange && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-800/70 to-slate-900/60 backdrop-blur-2xl rounded-3xl border border-green-500/20 p-8 md:p-10 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>

                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-75"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                          Update Password
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                          Strengthen your account security with a new password
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">
                          Current Password
                        </label>
                        <div className="relative group">
                          <input
                            type={
                              passwordVisibility.currentPassword
                                ? "text"
                                : "password"
                            }
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              handlePasswordInputChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                            className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 font-medium ${
                              passwordErrors.currentPassword
                                ? "border-red-500/50 bg-red-500/10 text-red-300 focus:ring-red-500/20 focus:bg-red-500/15"
                                : "border-white/20 text-white focus:ring-green-500/30 focus:border-green-500/50 focus:bg-white/10 group-hover:border-white/30"
                            }`}
                            placeholder="Enter your current password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              togglePasswordVisibility("currentPassword")
                            }
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                          >
                            {passwordVisibility.currentPassword ? (
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
                        {passwordErrors.currentPassword && (
                          <p className="mt-2 text-sm text-red-400">
                            {passwordErrors.currentPassword}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            New Password
                          </label>
                          <div className="relative group">
                            <input
                              type={
                                passwordVisibility.newPassword
                                  ? "text"
                                  : "password"
                              }
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                handlePasswordInputChange(
                                  "newPassword",
                                  e.target.value
                                )
                              }
                              className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 font-medium ${
                                passwordErrors.newPassword
                                  ? "border-red-500/50 bg-red-500/10 text-red-300 focus:ring-red-500/20 focus:bg-red-500/15"
                                  : "border-white/20 text-white focus:ring-green-500/30 focus:border-green-500/50 focus:bg-white/10 group-hover:border-white/30"
                              }`}
                              placeholder="Create a strong password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                            >
                              {passwordVisibility.newPassword ? (
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
                          {passwordErrors.newPassword && (
                            <p className="mt-2 text-sm text-red-400">
                              {passwordErrors.newPassword}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Confirm Password
                          </label>
                          <div className="relative group">
                            <input
                              type={
                                passwordVisibility.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                handlePasswordInputChange(
                                  "confirmPassword",
                                  e.target.value
                                )
                              }
                              className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl focus:ring-2 focus:border-transparent transition-all placeholder-gray-500 font-medium ${
                                passwordErrors.confirmPassword
                                  ? "border-red-500/50 bg-red-500/10 text-red-300 focus:ring-red-500/20 focus:bg-red-500/15"
                                  : "border-white/20 text-white focus:ring-green-500/30 focus:border-green-500/50 focus:bg-white/10 group-hover:border-white/30"
                              }`}
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                            >
                              {passwordVisibility.confirmPassword ? (
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
                          {passwordErrors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-400">
                              {passwordErrors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <button
                          onClick={handlePasswordChange}
                          disabled={isChangingPassword}
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-green-500/50 cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isChangingPassword ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Updating...
                            </>
                          ) : (
                            <>
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Update Password
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordChange(false);
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                            setPasswordErrors({});
                          }}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20 cursor-pointer transform hover:scale-105"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 via-orange-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-800/70 to-slate-900/60 backdrop-blur-2xl rounded-3xl border border-red-500/20 p-8 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-75"></div>
                      <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
                        Account
                      </h3>
                      <p className="text-xs text-slate-400">
                        Security & preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleLogout}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50 cursor-pointer flex items-center justify-center gap-3"
                    >
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-slate-400 text-center">
                      Your account is secure with us. We recommend changing your
                      password regularly to maintain optimal security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
