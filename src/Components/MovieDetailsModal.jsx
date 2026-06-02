import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, Clock, Film, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../i18n/translations';

const API_KEY = "cc446196";

export default function MovieDetailsModal({ movie, onClose }) {
  const { language, toggleFavorite, isFavorite } = useAppContext();
  const t = translations[language];
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const favorite = isFavorite(movie.imdbID);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${API_KEY}`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDetails();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [movie.imdbID]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Poster */}
          <div className="w-full md:w-2/5 shrink-0 relative bg-slate-100 dark:bg-slate-800 min-h-[300px] md:min-h-full">
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/400x600/1e293b/94a3b8?text=No+Poster"}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            {loading ? (
              <div className="h-full flex flex-col gap-4 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-white/5 rounded w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-200 dark:bg-white/5 rounded w-16"></div>
                  <div className="h-6 bg-slate-200 dark:bg-white/5 rounded w-20"></div>
                </div>
                <div className="h-32 bg-slate-200 dark:bg-white/5 rounded w-full mt-4"></div>
              </div>
            ) : details ? (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{details.Title}</h2>
                  <button 
                    onClick={() => toggleFavorite(movie)}
                    className="shrink-0 p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Heart className={`w-6 h-6 transition-colors ${favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {details.Year}</div>
                  {details.Runtime !== 'N/A' && <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> {details.Runtime}</div>}
                  <div className="flex items-center gap-1"><Film className="w-4 h-4"/> {details.Genre}</div>
                </div>

                {details.imdbRating !== 'N/A' && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex flex-col items-center p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xl">
                        <Star className="w-5 h-5 fill-amber-500" />
                        {details.imdbRating}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">IMDb</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2 uppercase tracking-wider">{t.plot}</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {details.Plot !== 'N/A' ? details.Plot : 'No plot available.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {details.Director !== 'N/A' && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 uppercase tracking-wider">{t.director}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{details.Director}</p>
                      </div>
                    )}
                    {details.Actors !== 'N/A' && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 uppercase tracking-wider">{t.actors}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{details.Actors}</p>
                      </div>
                    )}
                    {details.Language !== 'N/A' && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 uppercase tracking-wider">{t.language}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{details.Language}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center text-rose-500">Failed to load details.</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
