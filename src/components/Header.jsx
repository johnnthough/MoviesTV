import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "4a7b7e7e66e45bdee313439ca81dce8d"; // ⚠️ Replace with your actual API key
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data.results); // Assuming 'results' is the key with movie data
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Effect for the automatic slider
  useEffect(() => {
    if (movies.length > 0) {
      const sliderInterval = setInterval(() => {
        setCurrentMovieIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
      }, 9000);
      return () => clearInterval(sliderInterval);
    }
  }, [currentMovieIndex, movies]);

  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  const currentMovie = movies[currentMovieIndex];
  // Construct the full image URL from the API response
  const imageUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  return (
    <>
      <Navbar />
      <div
        className="relative flex min-h-screen items-center text-white transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative flex flex-col w-full max-w-8xl mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {currentMovie.title || currentMovie.name}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-sm font-semibold text-gray-300">
            <span className="bg-black px-4 py-3 text-white">
              {currentMovie.release_date
                ? new Date(currentMovie.release_date).getFullYear()
                : "N/A"}
            </span>
            <span className="text-white">|</span>
            <span className="bg-black px-4 py-3 text-white">
              {/* Note: Genres are often returned as IDs, you may need a separate API call to map them to names */}
              {currentMovie.genre_ids && currentMovie.genre_ids.length > 0
                ? "GENRE"
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-row gap-10 items-center mt-6">
            <button className="bg-white text-black font-semibold px-8 py-3 w-fit">
              Read More
            </button>
            <div className="flex items-end gap-8">
              <img
                src="/arrow-back.png"
                className="h-9 rounded-lg shadow-lg cursor-pointer"
                onClick={prevMovie}
                alt="Previous movie"
              />
              <img
                src="/arrow-forward.png"
                className="h-9 rounded-lg shadow-lg cursor-pointer"
                onClick={nextMovie}
                alt="Next movie"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;