import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, Sun, Moon, Menu, X, Globe, Heart, History, Home, Settings2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../i18n/translations';

export default function Navbar({ query, setQuery, onSearch, currentView, setCurrentView }) {
  const { theme, toggleTheme, language, setLanguage, searchHistory, addSearchToHistory, clearHistory } = useAppContext();
  const t = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  const categories = [
    { name: 'Action', query: 'Action' },
    { name: 'Comedy', query: 'Comedy' },
    { name: 'Drama', query: 'Drama' },
    { name: 'Sci-Fi', query: 'Sci-Fi' },
    { name: 'Horror', query: 'Horror' },
    { name: 'Romance', query: 'Romance' },
    { name: 'Thriller', query: 'Thriller' },
    { name: 'Animation', query: 'Animation' }
  ];

  // Close history on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchHistory(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addSearchToHistory(query);
      onSearch(query);
      setShowSearchHistory(false);
      setCurrentView('search');
    }
  };

  const handleHistoryClick = (q) => {
    setQuery(q);
    addSearchToHistory(q);
    onSearch(q);
    setShowSearchHistory(false);
    setCurrentView('search');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-slate-200/50 dark:border-white/10 shadow-sm dark:shadow-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => setCurrentView('home')}
          >
            <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl border border-indigo-500/20 dark:border-indigo-500/30">
              <Film className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight hidden sm:block">
              {t.title}
            </h1>
          </motion.div>

          {/* Desktop Search Bar & Categories */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex flex-1 max-w-2xl px-4 relative items-center gap-3"
          >
            {/* Category Hamburger Menu */}
            <div className="relative" ref={categoryRef}>
              <button 
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center shadow-inner"
              >
                <Menu className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showCategoryMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-3 w-48 left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 py-2"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Categories</div>
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setQuery(cat.query);
                          addSearchToHistory(cat.query);
                          onSearch(cat.query);
                          setShowCategoryMenu(false);
                          setCurrentView('search');
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300 flex items-center gap-3 text-sm"
                      >
                        <Film className="w-4 h-4 text-slate-400" />
                        {cat.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-full" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSearchHistory(true)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-800 dark:text-slate-200 shadow-inner"
              />
              <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-indigo-500 text-slate-400 transition-colors">
                <span className="sr-only">Search</span>
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Search History Dropdown */}
            <AnimatePresence>
              {showSearchHistory && searchHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 w-full left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.recentSearches}</span>
                    <button onClick={clearHistory} className="text-xs text-rose-500 hover:text-rose-600">{t.clearHistory}</button>
                  </div>
                  <ul>
                    {searchHistory.map((q, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleHistoryClick(q)}
                          className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300"
                        >
                          <History className="w-4 h-4 text-slate-400" />
                          {q}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Nav Links */}
            <button onClick={() => setCurrentView('home')} className={`p-2 rounded-xl flex items-center gap-2 transition-colors ${currentView === 'home' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
              <Home className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentView('favorites')} className={`p-2 rounded-xl flex items-center gap-2 transition-colors ${currentView === 'favorites' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
              <Heart className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>

            {/* Language Selector */}
            <div className="relative group">
              <button className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2 transition-colors">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-1 w-24">
                  <button onClick={() => setLanguage('en')} className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${language === 'en' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>EN</button>
                  <button onClick={() => setLanguage('hi')} className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${language === 'hi' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>HI</button>
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-900"
          >
            <div className="p-4 flex flex-col gap-4">
               <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileMenuOpen(false); }} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-800 dark:text-slate-200"
                />
              </form>

              <div className="flex flex-col gap-2">
                <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === 'home' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  <Home className="w-5 h-5" /> {t.home}
                </button>
                <button onClick={() => { setCurrentView('favorites'); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === 'favorites' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  <Heart className="w-5 h-5" /> {t.favorites}
                </button>
                
                <div className="h-px w-full bg-slate-200 dark:bg-white/10 my-2"></div>
                
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-3"><Globe className="w-5 h-5" /> {t.language}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-lg text-sm ${language === 'en' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}>EN</button>
                    <button onClick={() => setLanguage('hi')} className={`px-3 py-1 rounded-lg text-sm ${language === 'hi' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}>HI</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
