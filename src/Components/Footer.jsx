import { Film, Settings, Rss } from "lucide-react";
import { translations } from "../i18n/translations";
import { useAppContext } from "../context/AppContext";

export default function Footer() {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <footer className="w-full bg-[#2a2a2a] text-slate-300 py-12 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer mb-2">
          <Film className="w-8 h-8 text-[#00b4d8]" />
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-[#00b4d8]">movie</span><span className="text-white">fone</span>
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

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-slate-400">
          <a href="#" className="hover:text-[#3b5998] transition-colors"><div className="w-6 h-6 rounded-md bg-[#3b5998] flex items-center justify-center text-white font-bold text-sm">f</div></a>
          <a href="#" className="hover:text-white transition-colors"><span className="text-2xl font-bold">X</span></a>
          <a href="#" className="hover:text-[#c13584] transition-colors"><div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white font-bold text-[10px]">Ig</div></a>
          <a href="#" className="hover:text-[#ff0000] transition-colors"><div className="w-7 h-5 rounded-md bg-[#ff0000] flex items-center justify-center text-white font-bold text-[10px]">YT</div></a>
          <a href="#" className="hover:text-[#0077b5] transition-colors"><div className="w-6 h-6 rounded bg-[#0077b5] flex items-center justify-center text-white font-bold text-xs">in</div></a>
          <a href="#" className="hover:text-[#ff4500] transition-colors"><div className="w-6 h-6 rounded-full bg-[#ff4500] flex items-center justify-center text-white font-bold text-xs">R</div></a>
          <a href="#" className="hover:text-[#69c9d0] transition-colors"><div className="w-6 h-6 bg-[#ff0050] text-black font-bold flex items-center justify-center text-xs">t</div></a>
          <a href="#" className="hover:text-white transition-colors"><Rss className="w-6 h-6 text-slate-400" /></a>
          <a href="#" className="hover:text-[#00b4d8] transition-colors"><Settings className="w-6 h-6 text-[#00b4d8] fill-current" /></a>
        </div>

        {/* Google News Badge */}
        <div className="mt-4 bg-black px-4 py-2 rounded-xl flex items-center gap-3 border border-white/10 cursor-pointer hover:bg-black/80 transition-colors">
          <div className="flex shrink-0">
            <span className="text-xl font-bold text-[#4285F4]">G</span>
          </div>
          <div className="text-left leading-tight">
            <div className="text-xs text-white">Add as a preferred</div>
            <div className="text-sm font-semibold text-white">source on Google</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
