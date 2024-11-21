import React from 'react';

const MovieCard = ({ name, rating, view }) => {
  // Default image for movies without a specific image URL
  const defaultImage = "https://via.placeholder.com/150"; 

  return (
    <div className="mv-card">
      <img src={defaultImage} alt="movie" />
      <h2>{name}</h2>
      <h3>Rating: {rating}</h3>
      <button onClick="#">{view}</button>
    </div>
  );
}

export default MovieCard;
