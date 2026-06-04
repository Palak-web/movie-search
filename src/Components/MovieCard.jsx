import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Star, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const API_KEY = "cc446196";

export default function MovieCard({ movie, onClick }) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const [rating, setRating] = useState(null);
  const favorite = isFavorite(movie.imdbID);

  // Fetch rating for the card since search doesn't return it
  useEffect(() => {
    let mounted = true;
    const fetchRating = async () => {
      // Check cache first
      const cached = sessionStorage.getItem(`rating_${movie.imdbID}`);
      if (cached) {
        setRating(cached);
        return;
      }
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        const data = await res.json();
        if (mounted && data.imdbRating && data.imdbRating !== 'N/A') {
          setRating(data.imdbRating);
          sessionStorage.setItem(`rating_${movie.imdbID}`, data.imdbRating);
        }
      } catch (err) {
        // ignore errors for card rating fetch
      }
    };
    fetchRating();
    return () => { mounted = false; };
  }, [movie.imdbID]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(movie)}
      className="group relative bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/400x600/1e293b/94a3b8?text=No+Poster"}
          alt={movie.Title}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/400x600/1a1a2e/6366f1?text=${encodeURIComponent(movie.Title)}`
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold tracking-wider text-slate-200 border border-white/10 uppercase">
            {movie.Type}
          </div>
          {rating && (
            <div className="bg-amber-500/90 backdrop-blur-md px-2 py-1 rounded-md text-[11px] font-bold tracking-wider text-black border border-amber-400 flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-black" />
              {rating}
            </div>
          )}
        </div>

        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-colors z-10"
        >
          <Heart className={`w-4 h-4 transition-colors ${favorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        {/* Info Icon (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-indigo-500 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
            <Info className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-transparent">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {movie.Title}
        </h3>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{movie.Year}</span>
        </div>
      </div>
    </motion.div>
  );
}
