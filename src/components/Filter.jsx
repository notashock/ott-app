import React, { useState, useEffect } from "react";

const Filter = ({ Movies, search, onFilter }) => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const filteredMovies = Movies.filter((movie) => {
      const matchesGenre = filter === "" || movie.genre.toLowerCase() === filter.toLowerCase();
      const matchesSearch = search === "" || movie.name.toLowerCase().includes(search.toLowerCase());
      return matchesGenre && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === "Rating: High to Low") return b.Rating - a.Rating;
      if (sortOrder === "Rating: Low to High") return a.Rating - b.Rating;
      if (sortOrder === "Alphabet: A to Z") return (a.name || "").localeCompare(b.name || "");
      if (sortOrder === "Alphabet: Z to A") return (b.name || "").localeCompare(a.name || "");
      return 0;
    });
    onFilter(filteredMovies);
  }, [filter, sortOrder, search, Movies, onFilter]);

  return (
    <div className="flex gap-6 flex-wrap justify-center items-center">
      <select
        className="px-3 py-1 rounded-full bg-transparent border-2 border-accent text-white font-medium cursor-pointer hover:bg-[#ff7050]"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Adventure">Adventure</option>
      </select>

      <select
        className=" px-3 py-1 rounded-full bg-transparent border-2 border-accent text-white font-medium cursor-pointer hover:bg-[#ff7050]"
        onChange={(e) => setSortOrder(e.target.value)}
        value={sortOrder}
      >
        <option value="">Default</option>
        <option value="Alphabet: A to Z">Alphabet: A to Z</option>
        <option value="Alphabet: Z to A">Alphabet: Z to A</option>
        <option value="Rating: High to Low">Rating: High to Low</option>
        <option value="Rating: Low to High">Rating: Low to High</option>
      </select>
    </div>
  );
};

export default Filter;
