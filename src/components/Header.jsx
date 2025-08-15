import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import Navbar from "./navbar";

const Header = () => { 
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "4a7b7e7e66e45bdee313439ca81dce8d";
        
        // Fetch genres list
        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const genresData = await genresResponse.json();
        
        // Create a mapping object for quick lookup
        const genresMap = {};
        genresData.genres.forEach(genre => {
          genresMap[genre.id] = genre.name;
        });
        setGenres(genresMap);

        // Fetch trending movies
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        const moviesData = await moviesResponse.json();
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
  const imageUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  // Get the first genre name or fallback to "N/A"
  const getGenreName = () => {
    if (currentMovie.genre_ids && currentMovie.genre_ids.length > 0) {
      const firstGenreId = currentMovie.genre_ids[0];
      return genres[firstGenreId] || "N/A";
    }
    return "N/A";
  };

  return (
    <>
      <div
        className="relative flex min-h-screen items-center text-white transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 ">
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
              {getGenreName()}
            </span>
          </div>
          <div className="flex flex-row gap-10 items-center mt-6">
            <Link
              to={`/movies/${currentMovie.id}`}
              className="bg-white text-black font-semibold px-8 py-3 w-fit"
            >
              Read More
            </Link>
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

export default Header;