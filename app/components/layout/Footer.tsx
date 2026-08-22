import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171717] border-t border-[rgba(107,114,128,0.2)] text-[#6B7280] mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <Link
              to="/"
              className="inline-flex items-center mb-6 hover:opacity-90 transition-opacity duration-180 cursor-pointer"
            >
              <img
                src="/logo/logo-transparent.png"
                alt="HireDesk Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#6B7280] mb-6">
              AI recruitment platform designed for candidate screening,
              assessment, and talent decision-making with precision
              intelligence.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/mrafiq825/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 text-xs font-semibold cursor-pointer"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100069771234437&mibextid=wwXIfr&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 text-xs font-semibold cursor-pointer"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://x.com/mrafiq825"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 text-xs font-semibold cursor-pointer"
                title="Twitter"
              >
                X
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F5E6C8] mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@hiredesk.com"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F5E6C8] mb-4 uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hiredesk-analyze"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>Smart Review</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/batch-analyze"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>Batch Screening</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/compare-resumes"
                  className="text-sm text-[#6B7280] hover:text-[#F5E6C8] transition-colors duration-180 flex items-center gap-2 cursor-pointer"
                >
                  <span>→</span>
                  <span>Find Best Fit</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(107,114,128,0.2)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B7280] text-center md:text-left">
            &copy; {currentYear} HireDesk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
