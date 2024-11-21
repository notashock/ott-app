import React, { useState, useEffect } from "react";
import axios from "axios";

const Fetcher = ({ onMoviesFetched, endpoint }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${endpoint}`);
        onMoviesFetched(response.data); // Use the correct prop name here
      } catch (err) {
        setError("Error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [onMoviesFetched, endpoint]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return null;
};

export default Fetcher;
