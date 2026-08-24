import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 text-surface-300 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Brand */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity font-bold text-xl" aria-label="iNotebook Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 110 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1V7a1 1 0 011-1h1a2 2 0 110-4H7a1 1 0 01-1-1V7a1 1 0 011-1h1V4z" />
                </svg>
              </div>
              <span>iNotebook</span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs hidden sm:block">
              Your simple and secure space for managing your notes.
            </p>
          </div>

          {/* Center - Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Footer navigation">
            <Link to="/" className="text-sm text-surface-400 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-surface-400 hover:text-white transition-colors">About</Link>
            <Link to="/" className="text-sm text-surface-400 hover:text-white transition-colors">Notes</Link>
          </nav>

          {/* Right - Copyright */}
          <p className="text-sm text-surface-500 text-center md:text-right">
            &copy; {currentYear} iNotebook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;