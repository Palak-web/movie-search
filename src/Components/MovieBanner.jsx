import { useEffect, useRef, useState, useMemo, memo } from "react"

const API_KEY = "cc446196"

const searches = ["Marvel", "Batman", "Star Wars", "Harry Potter", 
                  "Fast", "Spider", "Mission", "James Bond", "Avatar", "Jurassic", 
                  "Matrix", "Lord of the Rings", "Pirates", "Transformers", "X-Men",
                  "Avengers", "Superman", "Justice League", "Godzilla", "King Kong"]

const FALLBACK_POSTERS = [
  "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1RKA0PdtOwiKlM.jpg", 
  "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", 
  "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9Bucx0jFatW.jpg", 
  "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", 
  "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", 
  "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg", 
  "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", 
  "https://image.tmdb.org/t/p/w500/9gk7adZA2GLOVY6TX5Uq210dZgd.jpg", 
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Interstellar
  "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // The Dark Knight
  "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPbOYKQcbJ5.jpg", // Pulp Fiction
  "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", // Fight Club
  "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", // Forrest Gump
  "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GvwJwBGeoE2k.jpg", // The Matrix
  "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", // Goodfellas
  "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", // Shawshank Redemption
  "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // The Godfather
  "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvq6.jpg", // Gladiator
  "https://image.tmdb.org/t/p/w500/udDclJoHjfpt8c1IVU0EE12OE0q.jpg", // Joker
  "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", // Dune
  "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg", // Avatar
  "https://image.tmdb.org/t/p/w500/ryZ0Bebg2gSIti8q40XnE03dEQ8.jpg"  // Star Wars
]

export default memo(function MovieBanner() {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const picks = searches.sort(() => Math.random() - 0.5).slice(0, 6)
        
        const promises = picks.map(term => 
          fetch(`https://www.omdbapi.com/?s=${term}&type=movie&apikey=${API_KEY}`)
            .then(res => {
              if (!res.ok) throw new Error("API Limit Reached")
              return res.json()
            })
            .catch(() => null)
        )
        
        const responses = await Promise.all(promises)
        const results = []
        
        responses.forEach(data => {
          if (data && data.Response === "True") {
            data.Search.forEach(m => {
              if (m.Poster && m.Poster !== "N/A" && !results.some(r => r.imdbID === m.imdbID)) {
                results.push({ imdbID: m.imdbID, Poster: m.Poster })
              }
            })
          }
        })
        
        if (results.length === 0) {
          console.warn("OMDB API failed or returned 401. Using fallback stunning posters.")
          FALLBACK_POSTERS.forEach((posterUrl, index) => {
            results.push({ imdbID: `fallback-${index}`, Poster: posterUrl })
          })
        }
        
        setPosters(results.sort(() => Math.random() - 0.5))
      } catch (err) {
        console.error("Failed to fetch background movies:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  const rows = useMemo(() => {
    if (posters.length === 0) return null;
    return {
      row1: [...posters].sort(() => Math.random() - 0.5),
      row2: [...posters].sort(() => Math.random() - 0.5),
      row3: [...posters].sort(() => Math.random() - 0.5),
      row4: [...posters].sort(() => Math.random() - 0.5),
      row5: [...posters].sort(() => Math.random() - 0.5),
    };
  }, [posters]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (posters.length === 0 || !rows) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#050505] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 via-black/40 to-black z-10" />
      
      <div className="absolute inset-0 flex flex-col gap-4 opacity-100 justify-center h-[140vh] -top-[20vh] transform -rotate-12 scale-125">
        <ScrollRow posters={rows.row1} speed={30} direction={-1} />
        <ScrollRow posters={rows.row2} speed={45} direction={-1} />
        <ScrollRow posters={rows.row3} speed={25} direction={-1} />
        <ScrollRow posters={rows.row4} speed={40} direction={-1} />
        <ScrollRow posters={rows.row5} speed={35} direction={-1} />
      </div>
    </div>
  )
})

function ScrollRow({ posters: initialPosters, speed, direction }) {
  const ref = useRef(null)
  const [posters, setPosters] = useState(initialPosters)
  const xRef = useRef(0)

  useEffect(() => {
    setPosters(initialPosters)
  }, [initialPosters])

  const all = [...posters, ...posters, ...posters, ...posters]

  useEffect(() => {
    const el = ref.current
    if (!el || posters.length === 0) return
    let last = performance.now()
    let raf

    const loop = (now) => {
      const dt = now - last; last = now
      xRef.current += direction * speed * dt / 1000
      
      const singleW = posters.length * 176 
      if (Math.abs(xRef.current) >= singleW) {
        xRef.current -= direction * singleW
      }
      el.style.transform = `translateX(${xRef.current}px)`
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [posters.length, speed, direction])

  const handleImageError = (id) => {
    setPosters(prev => prev.filter(p => p.imdbID !== id));
  }

  return (
    <div ref={ref} className="flex gap-4 w-max">
      {all.map((movie, i) => (
        <div key={`${movie.imdbID}-${i}`} className="w-40 h-60 rounded-xl flex-shrink-0 overflow-hidden shadow-2xl bg-slate-900 border border-white/10">
          <img
            src={movie.Poster}
            alt=""
            onError={() => handleImageError(movie.imdbID)}
            className="w-full h-full object-cover transition-all"
          />
        </div>
      ))}
    </div>
  )
}