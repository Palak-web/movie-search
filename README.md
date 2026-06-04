# CineSearch

A modern React movie search app built with Vite, Tailwind CSS, Framer Motion and the OMDB API.

# 🎬 CineSearch

A Netflix-style movie search app built with React, Tailwind CSS, Framer Motion and the OMDB API.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)

## ✨ Features

- 🔍 Live debounced search with recent search history
- 🎥 Netflix-style animated movie poster background
- 🎭 Full movie details — plot, cast, director, runtime & rating
- ❤️ Favorites list with localStorage persistence
- 🌙 Dark / Light theme toggle
- 🌐 English and Hindi language support
- 📱 Fully responsive — desktop and mobile

## 🛠️ Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- OMDB API

## 🚀 Getting Started

```bash
git clone https://github.com/Palak-web/movie-search.git
cd movie-search
npm install
npm run dev
```

## 📁 Project Structure

src/
├── App.jsx                    # Main app logic
├── context/AppContext.jsx     # Theme, language, favorites, history
├── i18n/translations.js       # English & Hindi strings
└── Components/
├── Navbar.jsx             # Search, filters, toggles
├── MovieCard.jsx          # Movie card UI
├── MovieDetailsModal.jsx  # Full movie details
├── MovieBanner.jsx        # Animated hero background
└── Footer.jsx             # Footer

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔑 API Key

This project uses the [OMDB API](http://www.omdbapi.com/).
Get your free key at omdbapi.com and replace it in `App.jsx` and `MovieBanner.jsx`.

## 👩‍💻 Built by

**Palak Verma** — [GitHub](https://github.com/Palak-web)

## 🌐 Live Demo
https://cinesearch-palak.vercel.app