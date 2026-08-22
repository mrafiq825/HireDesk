import { Link } from "react-router";
import Navbar from "@layout/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#171717] relative text-[#F5E6C8]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center space-y-8">
        <div className="glass-panel p-8 sm:p-12 space-y-4">
          <span className="glass-badge glass-badge-danger text-xs py-1 px-3 rounded-[4px]">
            404 NOT FOUND
          </span>
          <h1 className="text-5xl sm:text-7xl font-bold text-[#F5E6C8]">
            40<span className="text-[#D4AF37]">4</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F5E6C8]">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
            The page you are trying to access does not exist or has been
            relocated.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
            >
              Return Home
            </Link>
            <Link
              to="/dashboard"
              className="btn-secondary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-[6px]"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
