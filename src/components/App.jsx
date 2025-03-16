import React, { useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import Fetcher from "../components/Fetcher";
import Filter from "../components/Filter";
import Watch from "../components/Watch";
import ThemeSwitcher from "./ThemeSwitcher";

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
    }, []
  );

  const handleFilter = useCallback((filteredData) => {
    setFilteredMovies(filteredData);
  }, []);

  const handleDelete = useCallback((id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
  });

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white flex flex-col items-center gap-6">
      <nav className="flex justify-evenly items-center bg-[#2C2C2C] text-white p-6 rounded-lg shadow-md w-full max-w-screen-xl">
        <h1 className="text-3xl font-bold">Hey {name}</h1>

        <div className="flex gap-8">
          <div
            className={`cursor-pointer px-4 py-2 rounded-lg ${view === "movies" ? "bg-[#FF8566] text-black" : "hover:bg-gray-700"}`}
            onClick={() => setView("movies")}
          >
            Movies
          </div>
          <div
            className={`cursor-pointer px-4 py-2 rounded-lg ${view === "watchlist" ? "bg-[#FF8566] text-black" : "hover:bg-gray-700"}`}
            onClick={() => setView("watchlist")}
          >
            Watchlist
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search..."
            className="bg-[#FF8566] text-white rounded-lg px-4 py-2 outline-none"
          />
          <button className="bg-[#FF8566] text-white px-6 py-2 rounded-lg hover:bg-[#FF7050]">
            Sign In
          </button>
        </div>
        <div className="">
          <ThemeSwitcher />
        </div>
      </nav>

      <main className="w-full max-w-screen-xl p-6 flex flex-col gap-8 bg-[#2C2C2C] rounded-lg shadow-md">
        <Filter 
          Movies={view === "movies" ? allMovies : watchlist}
          search={inputValue}
          onFilter={handleFilter}
        />

        <Fetcher watch={watchlist} onMoviesFetched={handleMoviesFetched} />

        <div className="flex flex-wrap gap-4 justify-center">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) =>
              view === "movies" ? (
                <MovieCard
                  key={movie.id}
                  name={movie.name}
                  Rating={movie.Rating}
                  genre={movie.genre}
                  watchlist={watchlist}
                  onAdd={(data) => setWatchlist(data)}
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
            <div className="text-center text-gray-400">
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
