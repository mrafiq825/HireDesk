import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07110D]/90 backdrop-blur-xl border-t border-white/10 text-[#AAB8AF] mt-20 relative z-10">
      <div className="h-px bg-gradient-to-r from-transparent via-[#94B69E]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <Link
              to="/"
              className="inline-flex items-center mb-6 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img
                src="/logo/logo-transparent.png"
                alt="HireDesk Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#718078] mb-6">
              Enterprise-ready AI recruitment platform transforming candidate screening, assessment, and talent decision-making with precision intelligence.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/mrafiq825/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-panel hover:border-[#94B69E]/50 hover:bg-[#94B69E]/10 text-[#AAB8AF] hover:text-[#94B69E] flex items-center justify-center transition-all duration-300 font-semibold transform hover:scale-110 cursor-pointer"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100069771234437&mibextid=wwXIfr&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-panel hover:border-[#94B69E]/50 hover:bg-[#94B69E]/10 text-[#AAB8AF] hover:text-[#94B69E] flex items-center justify-center transition-all duration-300 font-semibold transform hover:scale-110 cursor-pointer"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://x.com/mrafiq825"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-panel hover:border-[#94B69E]/50 hover:bg-[#94B69E]/10 text-[#AAB8AF] hover:text-[#94B69E] flex items-center justify-center transition-all duration-300 font-semibold transform hover:scale-110 cursor-pointer"
                title="Twitter"
              >
                X
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F3F7F4] mb-4 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#94B69E] shadow-[0_0_8px_#94B69E]" />
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@hiredesk.com"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F3F7F4] mb-4 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#94B69E] shadow-[0_0_8px_#94B69E]" />
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hiredesk-analyze"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>Smart Review</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/batch-analyze"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>Batch Screening</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/compare-resumes"
                  className="text-sm text-[#718078] hover:text-[#94B69E] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#94B69E]">
                    →
                  </span>
                  <span>Find Best Fit</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#718078] text-center md:text-left">
            &copy; {currentYear} HireDesk. All rights reserved. Intelligent Glassmorphism AI Recruitment Platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
