import React, { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import Fetcher from './Fetcher';

function App() {
  const [Movies, setMovies] = useState([]);

  const handleMoviesFetched = (moviesData) => {
    setMovies(moviesData);
  };

  return (
    <div className="App">
      <nav>
        <div className="nav-bar">
          <div className="home">Home</div>
          <div className="Movies">Movies</div>
          <div className="tv-shows">TV Shows</div>
        </div>
        <div className="btn">Sign In</div>
      </nav>

      <main>
        {/* Fetching data */}
        <Fetcher onMoviesFetched={handleMoviesFetched} />

        {/* Displaying MovieCard components */}
        <div className="movie-list">
          {Movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              name={movie.name} 
              rating={movie.views}  // Displaying the number of views as the rating
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
