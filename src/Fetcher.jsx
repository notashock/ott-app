import React, { useState, useEffect } from 'react';

function Fetcher({ view, onMoviesFetched }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      await fetch(`/data`)
      .then(response => response.json())
      .then((data) => {
        onMoviesFetched(data.movie, data.watchlist); 
      }).catch(err => {
        setError(`Error fetching data: ${err.message}`);
      }).finally(() => {
        setLoading(false);
      });
    };
    fetchMovies();
  }, [ onMoviesFetched ]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
}
export default Fetcher;