import React from "react";

const Watch = ({ id, name, rating, genre, onDelete }) => {
  const defaultImage = "https://dummyimage.com/150x150/000/fff";
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
