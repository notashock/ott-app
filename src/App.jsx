import React, { useState } from 'react';
import './App.css';
import { FaSearch } from "react-icons/fa";
import MovieCard from './MovieCard';
import Fetcher from './Fetcher';

function App() {
  const [view, setView] = useState("movies"); // Track current view: "movies" or "watchlist"
  const [Movies, setMovies] = useState([]);

  const handleMoviesFetched = (moviesData) => {
    setMovies(moviesData);
  };

  const handleNavClick = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <nav>
        <div className="nav-bar">
          <div 
            className="Movies" 
            onClick={() => handleNavClick("movies")}
          >
            Movies
          </div>
          <div 
            className="Watchlist" 
            onClick={() => handleNavClick("watchlist")}
          >
            Watchlist
          </div>
        </div>
        <div className="search-btn">
          <div className="search-bar">
            <input type="text" name="search" id="search" placeholder="Search..."></input>
            {/* <FaSearch /> */}
          </div>
          <div className="btn">Sign In</div>
        </div>
      </nav>
      <main>
        {/* Fetcher handles fetching based on the selected view */}
        <Fetcher 
          onMoviesFetched={handleMoviesFetched} 
          endpoint={view === "movies" ? "movie" : "watchlist"}
        />
        <div className="movie-list">
          {Movies.length > 0 ? (
            Movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                name={movie.name} 
                rating={movie.views}  
              />
            ))
          ) : (
            <div className="no-data">No data available</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
