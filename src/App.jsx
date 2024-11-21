import React, { useState, useCallback } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import Fetcher from "./Fetcher";
import Filter from "./Filter";

function App() {
  const [view, setView] = useState("movies");
  const [allMovies, setAllMovies] = useState([]); // Stores all fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Stores filtered and sorted movies
  const [watchlist, setWatchlist] = useState([]); // Stores watchlist movies

  // Memoize handleMoviesFetched to prevent unnecessary re-renders
  const handleMoviesFetched = useCallback(
    (moviesData) => {
      if (view === "movies") {
        setAllMovies(moviesData);
        setFilteredMovies(moviesData);
      } else if (view === "watchlist") {
        setWatchlist(moviesData);
      }
    },
    [view]
  );

  // Memoize handleFilter to prevent re-renders
  const handleFilter = useCallback((filteredData) => {
    setFilteredMovies(filteredData);
  }, []);

  const handleNavClick = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <nav>
        <div className="nav-bar">
          <div
            className={`Movies${view === "movies" ? "_active" : ""}`}
            onClick={() => handleNavClick("movies")}
          >
            Movies
          </div>
          <div
            className={`Watchlist${view === "watchlist" ? "_active" : ""}`}
            onClick={() => handleNavClick("watchlist")}
          >
            Watchlist
          </div>
        </div>
        <div className="search-btn">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
            />
          </div>
          <div className="btn">Sign In</div>
        </div>
      </nav>

      <main>
        {/* Show Filter only for movies view */}
        {view === "movies" && (
          <div className="filter">
            <Filter Movies={allMovies} onFilter={handleFilter} />
          </div>
        )}

        {/* Fetcher dynamically fetches data for movies or watchlist */}
        <Fetcher
          onMoviesFetched={handleMoviesFetched}
          endpoint={view === "movies" ? "movie" : "watchlist"}
        />

        {/* Movie List */}
        <div className="movie-list">
          {(view === "movies" ? filteredMovies : watchlist).length > 0 ? (
            (view === "movies" ? filteredMovies : watchlist).map((movie) => (
              <MovieCard
                key={movie.id}
                name={movie.name}
                rating={movie.Rating}
                view={view === "movies" ? "Add to Watchlist" : "Remove"}
              />
            ))
          ) : (
            <div className="no-data">
              {view === "movies"
                ? "No movies available."
                : "No watchlist items available."}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
