import React, { useState, useEffect } from 'react';
import './Filter.css';

const Filter = ({ Movies, onFilter }) => {
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const handleFilterAndSort = () => {
      // Apply filtering
      const filteredMovies = Movies.filter((movie) => {
        if (filter === "") return true; // No filtering
        return movie.genre === filter; // Filter by genre
      })
      // Apply sorting
      .sort((a, b) => {
        if (sortOrder === "Rating: High to Low") return b.Rating - a.Rating;
        if (sortOrder === "Rating: Low to High") return a.Rating - b.Rating;
        if (sortOrder === "views: High to Low") return b.views - a.views;
        if (sortOrder === "views: Low to High") return a.views - b.views;
        return 0; // Default order
      });

      // Pass the filtered and sorted movies to the parent
      onFilter(filteredMovies);
    };

    handleFilterAndSort();
  }, [filter, sortOrder, Movies, onFilter]); // Dependencies

  return (
    <div className="controls">
      {/* Genre Filter */}
      <select
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Adventure">Adventure</option>
        {/* Add more genres as needed */}
      </select>

      {/* Sort Order */}
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        value={sortOrder}
      >
        <option value="">Default Order</option>
        <option value="Rating: High to Low">Rating: High to Low</option>
        <option value="Rating: Low to High">Rating: Low to High</option>
        <option value="views: High to Low">Views: High to Low</option>
        <option value="views: Low to High">Views: Low to High</option>
      </select>
    </div>
  );
};

export default Filter;
