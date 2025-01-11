import React, { useState, useEffect } from 'react';

function Fetcher({ view, endpoint, onMoviesFetched }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api`);

        if (!response.ok) {
          const message = `An error occurred: ${response.status} ${response.statusText}`;
          console.error("Full Response:", response);
          throw new Error(message);
        }

        const data = await response.json();
        if(view === "movies"){
          onMoviesFetched(data.movie);
        }
        else if(view === "watchlist"){
          onMoviesFetched(data.watchlist);
        }
        else{
          throw new Error("Invalid view type: " + view);
        } // Ensure the correct data is passed
      } catch (err) {
        setError("Error occurred while fetching data: " + err.message);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, onMoviesFetched]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return null;
}

export default Fetcher;