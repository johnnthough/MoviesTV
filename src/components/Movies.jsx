import React, { useState, useEffect } from "react";
import axios from "axios";

// Best practice: Store your API key in a secure environment variable
// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_KEY = "4a7b7e7e66e45bdee313439ca81dce8d"; // For demonstration only

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        // We'll take the first 20 movies to fill the grid nicely
        setMovies(response.data.results.slice(0, 20));
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-white">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="movies-container bg-black p-4 mb-2 max-w-8xl w-full mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-16 ">
      <h1 className="text-white text-3xl md:text-3xl font-bold mb-2">
        Trending Movies
      </h1>
      <p className="text-white">Here you can find a list of movies.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-3">
              <h3 className="text-black text-base font-semibold truncate">
                {movie.title}
              </h3>
              <h3 className="text-gray-700 text-base truncate">
                {/* Extract the year from the release_date string */}
                {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Movies;