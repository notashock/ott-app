import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

const MovieCard = ({ name, rating, genre}) => {
  const [watch, setWatch] = useState(false); 
  const defaultImage = "https://dummyimage.com/150x150/000/fff";
    // try{
    //   const response = await axios.get("http://localhost:3000/watchlist");
    //   const watchlist = response.data;

    //   // Check if the movie already exists in the watchlist
    //   const exists = watchlist.some((movie) => movie.name === name);
    //   if(exists){
    //     setWatch(true);
    //   }
    // }
    // catch(error){

    // }
  // Function to handle button click and add the movie to the watchlist
  const handleClick = async () => {
    try {
      // Get current watchlist
      const response = await axios.get("http://localhost:3000/watchlist");
      const watchlist = response.data;

      // Check if the movie already exists in the watchlist
      const exists = watchlist.some((movie) => movie.name === name);

      if (!exists) {
        // Find the next ID by incrementing the highest ID in the current watchlist
        const nextId = watchlist.length
          ? Math.max(...watchlist.map((movie) => parseInt(movie.id))) + 1
          : 1;

        // Prepare the movie object to add to the watchlist
        const movieToAdd = {
          id: nextId.toString(),
          name: name,
          Rating: rating,
          genre: genre || "", // Ensure genre is not undefined
        };

        // Post the new movie to the watchlist
        await axios.post("http://localhost:3000/watchlist", movieToAdd);

        // Set the watch state to indicate the movie has been added
        setWatch(true);
      } else {
        alert("Movie already exists in the watchlist.");
        setWatch(true);
      }
    } catch (error) {
      console.error("Error adding movie to the watchlist:", error);
    }
  };

  return (
    <div className="mv-card">
      <img src={defaultImage} alt="movie" />
      <h3>{name}</h3>
      <p>Genre: {genre}</p>
      <p>Rating: {rating}</p>
      <button onClick={handleClick}>
        {watch ? "Added to Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard;
