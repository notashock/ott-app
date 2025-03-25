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
      onDelete(id);
    } catch (error) {
      console.error("Error deleting movie from watchlist:", error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 w-[15em] h-[22em] bg-[#2C2C2C] text-white p-4 rounded-md shadow-md transition-all hover:bg-[#FF8566] hover:text-black hover:translate-y-[-4px] hover:shadow-lg">
      <img src={defaultImage} alt="movie" className="w-full h-[10em] object-cover rounded-md" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm">Genre: {genre || "N/A"}</p>
      <p className="text-sm">Rating: {Rating || "N/A"}</p>
      <button
        onClick={handleDelete(id)}
        className="w-40 h-20 px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default Watch;
