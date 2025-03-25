import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Fetcher from "../components/Fetcher";
import Filter from "../components/Filter";
import Watch from "../components/Watch";
import Movies from "./Movies";
import Home from "./Home";
import Navbar from "../components/Navbar";
import { useTheme } from "../components/ThemeProvider";

function App() {
  const { accentColor } = useTheme();
  const [allMovies, setAllMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
  }, [accentColor]);

  const handleMoviesFetched = useCallback((data, watch) => {
    setAllMovies(data);
    setWatchlist(watch);
  }, []);

  const handleFilter = useCallback((filteredData) => {
    setFilteredMovies(filteredData);
  }, []);

  return (
    <div
      className="pt-4 md:pt-2 min-h-screen   bg-mainBg text-text flex flex-col items-center gap-6 transition-colors duration-500"
    >
      <Navbar />

      <main className="w-full h-full max-h-screen max-w-screen-xl p-6 flex flex-col gap-8 bg-primary rounded-3xl shadow-md">
        <Filter
          Movies={allMovies}
          search={inputValue}
          onFilter={handleFilter}
        />

        <Fetcher watch={watchlist} onMoviesFetched={handleMoviesFetched} />

        <Routes>
          <Route path="/" element={<Home allMovies={allMovies} watchlist={watchlist} setWatchlist={setWatchlist} />} />
          <Route path="/movies" element={<Movies filteredMovies={filteredMovies} watchlist={watchlist} setWatchlist={setWatchlist} />} />
          <Route path="/watchlist" element={<Watch watchlist={watchlist} setWatchlist={setWatchlist} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
