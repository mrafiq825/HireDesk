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
    if (uploadPercentage >= 100) return "text-red-400";
    if (uploadPercentage >= 80) return "text-orange-400";
    if (uploadPercentage >= 50) return "text-yellow-400";
    return "text-green-400";
  };

  const getProgressBarColor = () => {
    if (uploadPercentage >= 100) return "bg-red-500";
    if (uploadPercentage >= 80) return "bg-orange-500";
    if (uploadPercentage >= 50) return "bg-yellow-500";
    return "bg-green-500";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src="/logo/logo.png"
                alt="HireDesk Logo"
                className="h-9 w-auto object-contain filter brightness-0 invert"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <Link
                to="/hiredesk-chat"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 font-medium flex items-center gap-2 relative group"
              >
                <span>HireDesk Chat</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            <Link
              to="/about"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium flex items-center gap-2 relative group"
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium flex items-center gap-2 relative group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 bg-gray-800/50 px-3 py-2 rounded-lg cursor-pointer"
                >
                  <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{user?.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
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
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm text-gray-300 font-medium">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onOpenTips();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Hiring Tips
                    </button>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors cursor-pointer border-t border-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/90 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {isAuthenticated && (
                <Link
                  to="/hiredesk-chat"
                  className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-base">💬</span>
                  HireDesk Chat
                </Link>
              )}
              <Link
                to="/about"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-base">ℹ️</span>
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-emerald-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-base">✉️</span>
                Contact Us
              </Link>
              <div className="border-t border-gray-600 pt-4">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-3 border-b border-gray-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-white text-sm font-medium">
                            {user?.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 bg-gray-900/50 p-2 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs text-gray-400">
                              Upload Status:
                            </p>
                            <button
                              onClick={handleRefreshStats}
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                              title="Refresh upload statistics"
                            >
                              <svg
                                className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
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
                        <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`${getProgressBarWidthClass()} h-full ${getProgressBarColor()} transition-all duration-500`}
                          />
                        </div>
                        <p
                          className={`text-xs ${remainingUploads === 0 ? "text-red-400 font-semibold" : "text-gray-500"}`}
                        >
                          {remainingUploads === 0
                            ? " Upload limit reached"
                            : `${remainingUploads} remaining`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onOpenTips();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                    >
                      Hiring Tips
                    </button>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium border-t border-gray-700 mt-2 pt-3"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block mx-3 mt-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
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
