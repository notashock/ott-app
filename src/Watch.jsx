import React from "react";

const Watch = ({ id, name, rating, genre, onDelete }) => {
  const defaultImage = "https://via.placeholder.com/150";
  return (
    <div className="mv-card">
      <img src={defaultImage} alt="movie" />
      <h3>{name}</h3>
      <p>Genre: {genre}</p>
      <p>Rating: {rating}</p>
      <button onClick={() => onDelete(id)}>Remove from Watchlist</button>
    </div>
  );
};

export default Watch;
