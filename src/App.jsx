import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Film, Calendar, AlertCircle } from "lucide-react";
import './index.css';
import MovieBanner from "./Components/MovieBanner";

const API_KEY = "cc446196";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchMovies(query);
      } else {
        setMovies([]);
        setHasSearched(false);
        setError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const searchMovies = async (searchQuery) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 relative overflow-hidden">
      {/* Background Banner */}
      <MovieBanner />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 px-6 py-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <Film className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
              CineSearch
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, series..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-400 shadow-inner"
            />
          </motion.div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 min-h-[80vh] flex flex-col relative z-10">

        {/* Initial Hero State */}
        <AnimatePresence mode="wait">
          {!hasSearched && !loading && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col items-center justify-center text-center mt-20"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 rounded-full"></div>
                <div className="relative bg-white/5 p-6 rounded-3xl border border-white/10 shadow-2xl">
                  <Film className="w-16 h-16 text-indigo-400" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Great Cinema</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-md">
                Search through millions of movies and TV shows instantly. Just start typing above.
              </p>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8"
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-2xl aspect-[2/3] w-full"></div>
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  <div className="h-3 bg-white/5 rounded w-1/2"></div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Error State */}
          {!loading && error && hasSearched && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center mt-32 text-center"
            >
              <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-200 mb-2">No Results Found</h3>
              <p className="text-slate-400">{error}</p>
            </motion.div>
          )}

          {/* Results Grid */}
          {!loading && !error && movies.length > 0 && (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8"
            >
              {movies.map((movie) => (
                <motion.div
                  key={movie.imdbID}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/400x600/1e293b/94a3b8?text=No+Poster"}
                      alt={movie.Title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold tracking-wider text-slate-200 border border-white/10 uppercase">
                      {movie.Type}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {movie.Title}
                    </h3>
                    <div className="flex items-center text-xs text-slate-400 gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{movie.Year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}