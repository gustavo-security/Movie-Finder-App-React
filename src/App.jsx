import { useState } from "react";
import "./App.css";
import SearchIcon from "./assets/search-icon.png";
import MovieCard from "./MovieCard";
import Logo from "./assets/logo1.png";

// API TMDB
const API_KEY = "2de4d1f48adc133c9ca81f605982ab45";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetApp = () => {
    setSearchTerm("");
    setMovies([]);
    setHasSearched(false);
    setIsLoading(false);
  };

  const searchMovies = async (title) => {
    if (title.trim().length < 2) return;

    setHasSearched(true);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${title}`
      );
      const data = await response.json();

      setMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="app">
        <div className="header">
          <h1 onClick={resetApp}>Movie Finder</h1>
          <img
            src={Logo}
            alt="Movie Finder Logo"
            className="logo"
            onClick={resetApp}
          />
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Busque aqui..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies(searchTerm);
              }
            }}
            onFocus={() => setSearchTerm("")}
          />
          <img
            src={SearchIcon}
            alt="Search Icon"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {isLoading ? (
          <div className="spinner"></div>
        ) : movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="empty">
            <h2>Nenhum resultado encontrado, tente outra grafia</h2>
          </div>
        ) : (
          <div className="empty">
            <h2>Busque pelo seu filme ou série favoritos</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
