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
                src="/logo/logo.svg"
                alt="HireDesk Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#6B7280] mb-6">
              AI recruitment platform designed for candidate screening,
              assessment, and talent decision-making with precision
              intelligence.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://www.linkedin.com/in/mrafiqdot825/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 cursor-pointer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100069771234437&mibextid=wwXIfr&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 cursor-pointer"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>
              <a
                href="https://x.com/mrafiqdot825"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 cursor-pointer"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mrafiqdot825/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 cursor-pointer"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mrafiqdot825"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[6px] bg-[#1B1B1B] border border-[rgba(107,114,128,0.2)] text-[#6B7280] hover:text-[#D4AF37] hover:border-[rgba(212,175,55,0.4)] flex items-center justify-center transition-colors duration-180 cursor-pointer"
                title="TikTok"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.89 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.35 0 .69.07 1 .19v-3.5a6.37 6.37 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.28 8.28 0 0 0 4.77 1.49V7.09a4.85 4.85 0 0 1-1-.4z" />
                </svg>
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
