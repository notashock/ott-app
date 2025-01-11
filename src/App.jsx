import React, { useState, useCallback } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import Fetcher from "./Fetcher";
import Filter from "./Filter";
import Watch from "./Watch";
import axios from "axios";

function App( {name} ) {
  const [view, setView] = useState("movies");
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

  // Memoized filter functions to avoid unnecessary re-renders
  const handleFilter = useCallback((filteredData) => {
    setFilteredMovies(filteredData);
  }, []);

  const handleNavClick = (newView) => {
    setView(newView);
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleDeleteFromWatchlist = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/watchlist/${id}`);
      setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie from watchlist:", error);
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="title">
          <h1>Hey {name}</h1>
        </div>
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
              value={inputValue}
              onChange={handleInput}
              placeholder="Search..."
            />
          </div>
          <div className="btn">Sign In</div>
        </div>
      </nav>

      <main>
      <div className="filter">
            <Filter Movies={allMovies} search={inputValue} onFilter={handleFilter} />
          </div>
        {/* {view === "movies" ? (
          <div className="filter">
            <Filter Movies={allMovies} search={inputValue} onFilter={handleFilter} />
          </div>
        ) : (
          <div className="filter">
            <Filter Movies={watchlist} search={inputValue} onFilter={handleFilter} />
          </div>
        )} */}

        <Fetcher
          onMoviesFetched={handleMoviesFetched}
          endpoint={view === "movies" ? "movie" : "watchlist"}
        />

        <div className="movie-list">
          {(view === "movies" ? filteredMovies : watchlist).length > 0 ? (
            (view === "movies" ? filteredMovies : watchlist).map((movie) =>
              view === "movies" ? (
                <MovieCard
                  key={movie.id}
                  name={movie.name}
                  rating={movie.Rating}
                  genre={movie.genre}
                />
              ) : (
                <Watch
                  key={movie.id}
                  id={movie.id}
                  name={movie.name}
                  rating={movie.Rating}
                  genre={movie.genre}
                  onDelete={handleDeleteFromWatchlist}
                />
              )
            )
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
