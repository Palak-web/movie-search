import { Film } from "lucide-react";
import { translations } from "../i18n/translations";
import { useAppContext } from "../context/AppContext";

export default function Footer() {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <footer className="relative z-10 w-full bg-[#1a1a1a] text-slate-300 py-12 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">

        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer mb-2">
          <Film className="w-8 h-8 text-[#00b4d8]" />
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-[#00b4d8]">Cine</span><span className="text-white">Search</span>
            </h2>
            <span className="text-xs text-slate-400 tracking-widest text-right -mt-1">find it. watch it.</span>
          </div>
        </div>

        {/* Main Nav Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-medium text-lg text-white">
          <a href="#" className="hover:text-[#00b4d8] transition-colors">Movies</a>
          <a href="#" className="text-[#00b4d8]">TV Shows</a>
          <a href="#" className="hover:text-[#00b4d8] transition-colors">Streaming</a>
          <a href="#" className="hover:text-[#00b4d8] transition-colors">Showtimes</a>
          <a href="#" className="hover:text-[#00b4d8] transition-colors">What to Watch</a>
          <a href="#" className="hover:text-[#00b4d8] transition-colors">Videos</a>
          <a href="#" className="hover:text-[#00b4d8] transition-colors">News</a>
        </div>

        {/* Secondary Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium border-t border-white/10 w-full pt-8 pb-4">
          <a href="#" className="hover:text-white transition-colors text-white">About</a>
          <a href="#" className="hover:text-white transition-colors text-white">Contact Us</a>
          <a href="#" className="hover:text-white transition-colors text-white">Sitemap</a>
          <a href="#" className="hover:text-white transition-colors text-white">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors text-white">Privacy Policy</a>
        </div>

        {/* Developer Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-slate-300 font-medium pt-4">
          <a href="https://github.com/Palak-web" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 hover:text-white transition-colors">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/palakvermadev/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b4d8] transition-colors">LinkedIn
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 hover:text-[#0077b5] transition-colors">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-2 text-sm text-slate-500 text-center">
          © 2026 CineSearch — Built by Palak Verma
        </div>

      </div>
    </footer>
  );
}
