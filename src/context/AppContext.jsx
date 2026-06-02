import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  // Language
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  
  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Search History
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Theme Effect
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Language Effect
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Favorites Effect
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Search History Effect
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  
  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.imdbID === movie.imdbID);
      if (isFav) {
        return prev.filter(f => f.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isFavorite = (imdbID) => favorites.some(f => f.imdbID === imdbID);

  const addSearchToHistory = (query) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5); // Keep last 5 searches
    });
  };

  const clearHistory = () => setSearchHistory([]);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      language, setLanguage,
      favorites, toggleFavorite, isFavorite,
      searchHistory, addSearchToHistory, clearHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
