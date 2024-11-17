import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Fetcher = ({ onMoviesFetched }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetch = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/watchlist`);
                onMoviesFetched(response.data);
            }
            catch(err) {
                setError("Error occured while fetching");
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetch();
    }, [onMoviesFetched]);
    if(loading) return <div>Loading...</div>;
    if(error) return <div>error</div>;

    return null;
}

export default Fetcher;