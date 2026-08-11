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
      <div className="min-h-screen bg-[#07110D]">
        <Navbar />
        <div className="pt-32 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#94B69E] border-t-transparent shadow-[0_0_15px_#94B69E]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
      <Navbar />

      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#94B69E]/10 blur-[130px] pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
        {/* Profile Card Header */}
        <div className="glass-panel p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="w-24 h-24 rounded-2xl bg-[#94B69E] text-[#07110D] flex items-center justify-center font-bold text-4xl shadow-[0_0_20px_rgba(148,182,158,0.3)]">
            {(profile?.name || user?.name || "U").charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl font-bold text-[#F3F7F4]">{profile?.name || user?.name}</h1>
              <span className="glass-badge glass-badge-primary self-center md:self-auto">ENTERPRISE USER</span>
            </div>
            <p className="text-sm text-[#AAB8AF]">{profile?.email || user?.email}</p>
            <p className="text-xs text-[#718078]">Company: {profile?.company_name || user?.company_name || "HireDesk Specialist"}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleLogout} className="btn-secondary px-5 py-2.5 text-xs text-[#E58B8B] hover:bg-red-500/10">
              Sign Out
            </button>
          </div>
        </div>

        {/* Feature Usage Overview */}
        <div className="glass-panel p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#F3F7F4]">Platform Usage Analytics</h2>
            <p className="text-xs text-[#718078]">Real-time AI consumption stats across your recruitment suite</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-5">
              <p className="text-2xl font-bold text-[#94B69E]">{profile?.filesUploaded || 0}/10</p>
              <p className="text-xs text-[#718078] font-semibold mt-1">Smart Reviews</p>
            </div>
            <div className="glass-card p-5">
              <p className="text-2xl font-bold text-[#94B69E]">{featureUsage?.batch_analysis || 0}</p>
              <p className="text-xs text-[#718078] font-semibold mt-1">Batch Screenings</p>
            </div>
            <div className="glass-card p-5">
              <p className="text-2xl font-bold text-[#94B69E]">{featureUsage?.compare_resumes || 0}</p>
              <p className="text-xs text-[#718078] font-semibold mt-1">Finalist Comparisons</p>
            </div>
            <div className="glass-card p-5">
              <p className="text-2xl font-bold text-[#94B69E]">{featureUsage?.selected_candidate || 0}</p>
              <p className="text-xs text-[#718078] font-semibold mt-1">Quick Screens</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
