import React, { useEffect, useState } from 'react';

const MovieCard = ({ name, Rating, genre, watchlist, onAdd}) => {
  const [watch, setWatch] = useState(false); 
  const defaultImage = "https://dummyimage.com/150x150/000/fff";
    
  useEffect(() => {
    try{
      const movie = watchlist;
      const exists = movie.some((movie) => movie.name === name);
      if(exists){
        setWatch(true);
      }
    }
    catch (error) {
      console.error("Error checking if movie exists in watchlist:", error);
    }
  },[watchlist, name]);
  const handleClick = async () => {
    try {
      if (!watch) {
        const nextId = watchlist.length ? Math.max(...watchlist.map((movie) => parseInt(movie.id))) + 1 : 1;

        const movieToAdd = {
          id: nextId.toString(),
          name: name,
          Rating: Rating,
          genre: genre || "", 
        };
        const data = [...watchlist, movieToAdd];
        await fetch("/data",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data })
        }).then((reponse)=> {
          if(reponse.status === 200){
            console.log("Movie added to watchlist successfully");
            onAdd(data);
            setWatch(true);
          }
        });
        
      } else {
        alert("Movie already exists in the watchlist.");
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
      <p>Rating: {Rating}</p>
      <button onClick={handleClick}>
        {watch ? "Added to Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard;
