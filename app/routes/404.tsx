import { Link } from "react-router";
import Navbar from "@layout/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#07110D] relative overflow-hidden text-[#F3F7F4]">
      <Navbar />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#94B69E]/10 blur-[150px] pointer-events-none" />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center space-y-8">
        <div className="glass-panel p-10 sm:p-14 space-y-6">
          <span className="glass-badge glass-badge-danger text-sm py-1.5 px-4">404 NOT FOUND</span>
          <h1 className="text-6xl sm:text-8xl font-bold text-[#F3F7F4]">
            40<span className="text-[#94B69E]">4</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F7F4]">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-[#AAB8AF] max-w-lg mx-auto leading-relaxed">
            The page you are trying to access does not exist or has been relocated.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary px-8 py-3.5 text-sm font-semibold rounded-xl">
              Return Home
            </Link>
            <Link to="/dashboard" className="btn-secondary px-8 py-3.5 text-sm font-semibold rounded-xl">
              Open Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
