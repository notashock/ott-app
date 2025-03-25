import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Watch from '../components/Watch';
import { useTheme } from '../components/ThemeProvider';

const Home = ({ allMovies, watchlist, setWatchlist }) => {
  const { accentColor } = useTheme();
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies(allMovies); // Home now always shows all movies
  }, [allMovies]);

  const handleDelete = (id) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <main 
      className="w-full max-w-screen-xl p-6 flex flex-col gap-8 bg-primary rounded-3xl shadow-md transition-all duration-500"
      style={{ borderColor: accentColor }}
    >
      <div className="relative w-full overflow-x-auto scrollbar-hide rounded-lg">
        <div className="flex gap-4 p-2">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                name={movie.name}
                Rating={movie.Rating}
                genre={movie.genre}
                watchlist={watchlist}
                onAdd={(data) => setWatchlist(data)}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 w-full">
              No movies available.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
