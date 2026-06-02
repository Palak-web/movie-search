import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, AlertCircle, TrendingUp, Heart } from "lucide-react";
import Navbar from "./Components/Navbar";
import MovieCard from "./Components/MovieCard";
import MovieDetailsModal from "./Components/MovieDetailsModal";
import MovieBanner from "./Components/MovieBanner";
import Footer from "./Components/Footer";
import { useAppContext } from "./context/AppContext";
import { translations } from "./i18n/translations";

const API_KEY = "cc446196";

export default function App() {
  const { language, favorites } = useAppContext();
  const t = translations[language];

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Views: 'home', 'search', 'favorites'
  const [currentView, setCurrentView] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Filters
  const [filterYear, setFilterYear] = useState("");
  const [filterType, setFilterType] = useState("");

  const [scrollDarkness, setScrollDarkness] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (currentView !== 'home') {
        setScrollDarkness(0);
        return;
      }
      const trendingEl = document.getElementById("trending-section");
      let darkness = 0;
      if (trendingEl) {
        const rect = trendingEl.getBoundingClientRect();
        const offset = window.innerHeight - rect.top;
        if (offset > 0) {
          darkness = Math.min(1, offset / 400); 
        }
        if (rect.top <= window.innerHeight / 2) {
          darkness = 1;
        }
      }
      setScrollDarkness(darkness);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Fetch Trending on mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const queries = ['avengers', 'batman', 'inception', 'spider'];
        let results = [];
        for (const q of queries) {
          const res = await fetch(`https://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`);
          const data = await res.json();
          if (data.Response === "True") {
            results = [...results, ...data.Search];
          }
        }
        const unique = Array.from(new Map(results.map(m => [m.imdbID, m])).values());
        setTrending(unique.slice(0, 24));
      } catch (err) {
        console.error("Trending fetch error:", err);
      }
    };
    fetchTrending();
  }, []);

  const searchMovies = async (searchQuery, year = filterYear, type = filterType) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    setCurrentView('search');

    try {
      let url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`;
      if (year) url += `&y=${year}`;
      if (type) url += `&type=${type}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(t.noResults);
      }
    } catch (err) {
      setError(t.errorMsg);
    }
    setLoading(false);
  };

  // Re-search when filters change if we are in search view
  useEffect(() => {
    if (currentView === 'search' && query) {
      searchMovies(query, filterYear, filterType);
    }
  }, [filterYear, filterType]);

  const handleSearch = (q) => {
    searchMovies(q);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-200 relative overflow-hidden transition-colors duration-300">
      <MovieBanner />
      
      {currentView === 'home' && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-200 bg-black"
          style={{ opacity: scrollDarkness * 0.95 }} 
        />
      )}

      <Navbar 
        query={query} 
        setQuery={setQuery} 
        onSearch={handleSearch} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh] flex flex-col relative z-10">
        
        {/* Filters - Only show in Search View */}
        <AnimatePresence>
          {currentView === 'search' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 flex flex-wrap gap-4 items-center bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">{t.year}:</label>
                <input 
                  type="number" 
                  placeholder="2023"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-24 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">{t.type}:</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">{t.all}</option>
                  <option value="movie">{t.movie}</option>
                  <option value="series">{t.series}</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          
          {/* Home View */}
          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-12">
              
              {/* Hero Section */}
              <div className="flex flex-col items-center justify-center text-center mt-10 md:mt-20">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 rounded-full"></div>
                  <div className="relative bg-white dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl">
                    <Film className="w-16 h-16 text-indigo-500 dark:text-indigo-400" strokeWidth={1.5} />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  {t.discoverHeading.split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">{t.discoverHeading.split(' ').slice(-1)}</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
                  {t.discoverSub}
                </p>
              </div>

              {/* Trending Section */}
              {trending.length > 0 && (
                <div className="mt-8 relative z-10 pb-16" id="trending-section">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-indigo-500" />
                    <h3 className="text-2xl font-bold">{t.trending}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {trending.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Search View */}
          {currentView === 'search' && (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="animate-pulse flex flex-col gap-3">
                      <div className="bg-slate-200 dark:bg-white/5 rounded-2xl aspect-[2/3] w-full"></div>
                      <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && error && (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                  <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{error}</h3>
                </div>
              )}

              {!loading && !error && movies.length > 0 && (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Favorites View */}
          {currentView === 'favorites' && (
            <motion.div key="favorites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-8">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <h2 className="text-3xl font-bold">{t.favorites}</h2>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center mt-20 text-slate-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No favorites added yet.</p>
                </div>
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {favorites.map((movie) => (
                    <MovieCard key={`fav-${movie.imdbID}`} movie={movie} onClick={setSelectedMovie} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      
      <Footer />
    </div>
  );
}