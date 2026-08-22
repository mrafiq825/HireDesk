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
        "View your HireDesk profile, track feature usage across Smart Review, Smart Screening, Find Best Fit, and Quick Screen, and manage your account details.",
    },
    { name: "robots", content: "noindex, nofollow" },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://hiredesk.vercel.app/profile",
    },
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profileData = await authService.getProfile();
        setProfile(profileData);

        if (profileData.email) {
          try {
            const usage = await authService.getFeatureUsage(profileData.email);
            setFeatureUsage(usage);
          } catch (usageError: any) {
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

  const handleNameUpdate = async () => {
    if (!newName.trim()) {
      setNameError("Name cannot be empty");
      return;
    }

    try {
      setIsChangingPassword(true);
      await authService.updateProfile({ name: newName.trim() });
      setProfile((prev: any) => ({ ...prev, name: newName.trim() }));
      setShowNameEdit(false);
    } catch (err: any) {
      setNameError(err.message || "Failed to update name");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#171717]">
        <Navbar />
        <div className="pt-32 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D4AF37] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-6">
        {/* Profile Card Header */}
        <div className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-[4px] bg-[#D4AF37] text-[#171717] flex items-center justify-center font-bold text-2xl">
            {(profile?.name || user?.name || "U").charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
                {profile?.name || user?.name}
              </h1>
              <span className="glass-badge glass-badge-primary rounded-[4px] text-[10px] self-center md:self-auto">
                ENTERPRISE USER
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              {profile?.email || user?.email}
            </p>
            <p className="text-[11px] text-[#6B7280]">
              Company:{" "}
              {profile?.company_name ||
                user?.company_name ||
                "HireDesk Specialist"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="btn-secondary px-4 py-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 rounded-[6px]"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Feature Usage Overview */}
        <div className="glass-panel p-6 sm:p-8 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-[#F5E6C8]">
              Platform Usage Analytics
            </h2>
            <p className="text-xs text-[#6B7280]">
              Real-time AI consumption stats across your recruitment suite
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-card p-4">
              <p className="text-xl font-bold text-[#D4AF37]">
                {profile?.filesUploaded || 0}/10
              </p>
              <p className="text-xs text-[#6B7280] font-semibold mt-1">
                Smart Reviews
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xl font-bold text-[#D4AF37]">
                {featureUsage?.batch_analysis || 0}
              </p>
              <p className="text-xs text-[#6B7280] font-semibold mt-1">
                Batch Screenings
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xl font-bold text-[#D4AF37]">
                {featureUsage?.compare_resumes || 0}
              </p>
              <p className="text-xs text-[#6B7280] font-semibold mt-1">
                Finalist Comparisons
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xl font-bold text-[#D4AF37]">
                {featureUsage?.selected_candidate || 0}
              </p>
              <p className="text-xs text-[#6B7280] font-semibold mt-1">
                Quick Screens
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
