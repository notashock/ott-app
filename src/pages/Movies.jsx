import React, { useCallback } from "react";
import MovieCard from "../components/MovieCard";

const Movies = ({ filteredMovies, watchlist, setWatchlist }) => {
  const handleDelete = useCallback(
    (id) => {
      setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== id));
    },
    [setWatchlist]
  );

  return (
    <div className="w-full px-6 overflow-y-scroll scrollbar-hide ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ">
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
          <div className="text-center text-gray-400 col-span-full">
            No movies available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
