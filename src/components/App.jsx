import React, { useState, useCallback } from "react";
import "../App.css";
import MovieCard from "../components/MovieCard";
import Fetcher from "../components/Fetcher";
import Filter from "../components/Filter";
import Watch from "../components/Watch";
import axios from "axios";

function App({ name }) {
  const [view, setView] = useState("movies");
  const [allMovies, setAllMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleMoviesFetched = useCallback(
    (data, watch) => {
      setAllMovies(data);
      setWatchlist(watch);
    },[]
  );
  const handleFilter = useCallback((filteredData) => {
    setFilteredMovies(filteredData);
  }, []);
  const handleDelete = useCallback((id)=>{
    const updatedWatchlist = watchlist.filter((movie) => {return movie.id !== id ? movie : ""});
    setWatchlist(updatedWatchlist);
  })

  return (
    <div className="App">
      <nav>
        <div className="title">
          <h1>Hey {name}</h1>
        </div>
        <div className="nav-bar">
          <div
            className={`Movies${view === "movies" ? "_active" : ""}`}
            onClick={() => {setView("movies");}}
          >
            Movies
          </div>
          <div
            className={`Watchlist${view === "watchlist" ? "_active" : ""}`}
            onClick={() => {setView("watchlist");}}
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
              onChange={(e)=>{setInputValue(e.target.value);}}
              placeholder="Search..."
            />
          </div>
          <div className="btn">Sign In</div>
        </div>
      </nav>

      <main>
        <div className="filter">
          <Filter Movies={view==="movies"? allMovies : watchlist} search={inputValue} onFilter={handleFilter} />
        </div>
        <Fetcher watch={watchlist} onMoviesFetched={handleMoviesFetched} />
        <div className="movie-list">
          {filteredMovies.length > 0 || filteredMovies.id !== "null" ? 
            (filteredMovies.map((movie) =>
              view === "movies" ? (
                <MovieCard
                  key={movie.id}
                  name={movie.name}
                  Rating={movie.Rating}
                  genre={movie.genre}
                  watchlist={watchlist}
                  onAdd={(data)=> setWatchlist(data)}
                />
              ) : (
                <Watch
                  key={movie.id}
                  id={movie.id}
                  name={movie.name}
                  Rating={movie.Rating}
                  genre={movie.genre}
                  onDelete={handleDelete}
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
