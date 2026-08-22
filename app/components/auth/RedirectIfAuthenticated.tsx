import { Navigate } from "react-router";
import { useAuth } from "@contexts/AuthContext";
import type { RedirectIfAuthenticatedProps } from "@app-types/components";

const RedirectIfAuthenticated = ({
  children,
  redirectTo = "/",
}: RedirectIfAuthenticatedProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D4AF37] border-t-transparent mx-auto mb-4"></div>
          <p className="text-xs text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RedirectIfAuthenticated;
