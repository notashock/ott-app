import React from "react";

const Watch = ({ id, name, Rating, genre, onDelete }) => {
  const defaultImage = "https://dummyimage.com/150x150/000/fff";
  const handleDelete = (id) => async () => {
    try {
       fetch("/data", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      onDelete(id)
    } catch (error) {
      console.error("Error deleting movie from watchlist:", error);
    }
  };
  return (
    <div className="mv-card">
      <img src={defaultImage} alt="movie" />
      <h3>{name}</h3>
      <p>Genre: {genre}</p>
      <p>Rating: {Rating}</p>
      <button onClick={handleDelete(id)}>Remove from Watchlist</button>
    </div>
  );
};

export default Watch;
