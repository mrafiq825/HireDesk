import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@contexts/AuthContext";
import TipsModal from "@ui/TipsModal";
import type { NavbarProps } from "@app-types/components";

const Navbar = ({ onOpenTips }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated]);

  const uploadLimit = 10;
  const filesUploaded = user?.filesUploaded || 0;
  const remainingUploads = Math.max(0, uploadLimit - filesUploaded);
  const uploadPercentage = Math.min(100, (filesUploaded / uploadLimit) * 100);

  const getStatusColor = () => {
    if (uploadPercentage >= 100) return "text-[#EF4444]";
    if (uploadPercentage >= 80) return "text-[#F59E0B]";
    return "text-[#D4AF37]";
  };

  const getProgressBarColor = () => {
    if (uploadPercentage >= 100) return "bg-[#EF4444]";
    if (uploadPercentage >= 80) return "bg-[#F59E0B]";
    return "bg-[#D4AF37]";
  };

  const getProgressBarWidthClass = (): string => {
    const percentage = Math.round(uploadPercentage / 10) * 10;
    const widthMap: { [key: number]: string } = {
      0: "w-0",
      10: "w-1/12",
      20: "w-1/6",
      30: "w-3/12",
      40: "w-2/5",
      50: "w-1/2",
      60: "w-3/5",
      70: "w-7/12",
      80: "w-4/5",
      90: "w-11/12",
      100: "w-full",
    };
    return widthMap[percentage] || "w-full";
  };

  const handleRefreshStats = async () => {
    setIsRefreshing(true);
    await refreshProfile();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#171717] border-b border-[rgba(107,114,128,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center hover:opacity-90 transition-opacity duration-180"
            >
              <img
                src="/logo/logo.svg"
                alt="HireDesk Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <Link
                to="/hiredesk-chat"
                className="text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 font-medium text-sm flex items-center gap-2 relative group py-2"
              >
                <span>HireDesk Chat</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-180"></span>
              </Link>
            )}
            <Link
              to="/about"
              className="text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 font-medium text-sm flex items-center gap-2 relative group py-2"
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-180"></span>
            </Link>
            <Link
              to="/contact"
              className="text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 font-medium text-sm flex items-center gap-2 relative group py-2"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-180"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 text-[#F5E6C8] hover:text-[#D4AF37] transition-colors duration-180 bg-[#1B1B1B] hover:border-[rgba(107,114,128,0.4)] border border-[rgba(107,114,128,0.2)] px-3.5 py-1.5 rounded-[6px] cursor-pointer"
                >
                  <div className="w-7 h-7 bg-[#D4AF37] text-[#171717] font-bold rounded-[4px] flex items-center justify-center">
                    <span className="text-xs">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{user?.name}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-180 text-[#6B7280] ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px] py-2 z-50">
                    <div className="px-4 py-3 border-b border-[rgba(107,114,128,0.2)]">
                      <p className="text-xs text-[#6B7280] uppercase font-semibold tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm text-[#F5E6C8] font-medium truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onOpenTips();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2.5 text-sm text-[#6B7280] hover:bg-[#171717] hover:text-[#F5E6C8] transition-colors cursor-pointer"
                    >
                      Hiring Tips
                    </button>
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-[#6B7280] hover:bg-[#171717] hover:text-[#F5E6C8] transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#171717] transition-colors cursor-pointer border-t border-[rgba(107,114,128,0.2)] mt-1"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary px-5 py-2 text-sm font-semibold rounded-[6px]"
              >
                <span>Get Started</span>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 p-2 rounded-[6px] border border-[rgba(107,114,128,0.2)] bg-[#1B1B1B]"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2">
            <div className="p-3 space-y-2 bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] rounded-[6px]">
              {isAuthenticated && (
                <Link
                  to="/hiredesk-chat"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-[#6B7280] hover:text-[#F5E6C8] hover:bg-[#171717] rounded-[6px] transition-colors duration-180 font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>HireDesk Chat</span>
                </Link>
              )}
              <Link
                to="/about"
                className="flex items-center gap-3 px-3.5 py-2.5 text-[#6B7280] hover:text-[#F5E6C8] hover:bg-[#171717] rounded-[6px] transition-colors duration-180 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-3 px-3.5 py-2.5 text-[#6B7280] hover:text-[#F5E6C8] hover:bg-[#171717] rounded-[6px] transition-colors duration-180 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Contact Us</span>
              </Link>
              <div className="border-t border-[rgba(107,114,128,0.2)] pt-3 mt-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-3.5 py-3 border-b border-[rgba(107,114,128,0.2)] mb-2">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-[#D4AF37] text-[#171717] font-bold rounded-[4px] flex items-center justify-center shrink-0">
                          <span className="text-xs">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#F5E6C8] truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-[#6B7280] truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 bg-[#171717] p-2.5 rounded-[6px] border border-[rgba(107,114,128,0.2)]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs text-[#6B7280]">
                              Upload Status:
                            </p>
                            <button
                              onClick={handleRefreshStats}
                              className="text-[#6B7280] hover:text-[#D4AF37] transition-colors"
                              title="Refresh upload statistics"
                            >
                              <svg
                                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            </button>
                          </div>
                          <span
                            className={`text-xs font-semibold ${getStatusColor()}`}
                          >
                            {filesUploaded}/{uploadLimit}
                          </span>
                        </div>
                        <div className="relative w-full h-1.5 bg-[#1B1B1B] rounded-full overflow-hidden">
                          <div
                            className={`${getProgressBarWidthClass()} h-full ${getProgressBarColor()} transition-all duration-300`}
                          />
                        </div>
                        <p
                          className={`text-xs ${remainingUploads === 0 ? "text-[#EF4444] font-semibold" : "text-[#6B7280]"}`}
                        >
                          {remainingUploads === 0
                            ? "Upload limit reached"
                            : `${remainingUploads} remaining`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onOpenTips();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3.5 py-2.5 text-[#6B7280] hover:text-[#F5E6C8] hover:bg-[#171717] rounded-[6px] transition-colors duration-180 font-medium text-sm"
                    >
                      Hiring Tips
                    </button>
                    <Link
                      to="/profile"
                      className="block px-3.5 py-2.5 text-[#6B7280] hover:text-[#F5E6C8] hover:bg-[#171717] rounded-[6px] transition-colors duration-180 font-medium text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3.5 py-2.5 text-[#EF4444] hover:bg-[#171717] rounded-[6px] transition-colors duration-180 font-medium text-sm border-t border-[rgba(107,114,128,0.2)] mt-2 pt-3"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="btn-primary w-full py-2.5 text-sm font-semibold rounded-[6px] text-center flex items-center justify-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Sign In / Register</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavbarWithModal = () => {
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenTips={() => setIsTipsModalOpen(true)} />
      <TipsModal
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
      />
    </>
  );
};

export default NavbarWithModal;
