import React, { useEffect, useState } from 'react';

const MovieCard = ({ name, Rating, genre, watchlist, onAdd }) => {
  const [watch, setWatch] = useState(false);
  const defaultImage = "https://dummyimage.com/150x150/000/fff";

  useEffect(() => {
    try {
      const exists = watchlist.some((movie) => movie.name === name);
      if (exists) {
        setWatch(true);
      }
    } catch (error) {
      console.error("Error checking if movie exists in watchlist:", error);
    }
  }, [watchlist, name]);

  const handleClick = async () => {
    try {
      if (!watch) {
        const nextId = watchlist.length
          ? Math.max(...watchlist.map((movie) => parseInt(movie.id))) + 1
          : 1;

        const movieToAdd = {
          id: nextId.toString(),
          name: name,
          Rating: Rating,
          genre: genre || "",
        };

        const data = [...watchlist, movieToAdd];
        const response = await fetch("/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        if (response.status === 200) {
          console.log("Movie added to watchlist successfully");
          onAdd(data);
          setWatch(true);
        }
      } else {
        alert("Movie already exists in the watchlist.");
      }
    } catch (error) {
      console.error("Error adding movie to the watchlist:", error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 w-60 h-[22em] bg-[#383636] text-white p-4 rounded-md shadow-md border-transparent border-2 transition-all hover:border-accent hover:text-text hover:translate-y-[-4px] hover:shadow-lg">
      <img src={defaultImage} alt="movie" className="w-full h-[10em] object-cover rounded-md" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm">Genre: {genre || "N/A"}</p>
      <p className="text-sm">Rating: {Rating || "N/A"}</p>
      <button
        onClick={handleClick}
        className={`w-40 h-20 px-2 py-1 rounded-md text-white font-medium ${
          watch ? "bg-green-500 cursor-not-allowed" : "border-2 border-transparent hover:border-accent"
        }`}
      >
        {watch ? "Added" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard;
