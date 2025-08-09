import React, { useState } from "react";
import Navbar from "./navbar";

// Sample movie data to use in the slider
const movies = [
  {
    title: "Movie Title 1",
    description:
      "Description for Movie 1. This is a longer description to show how it would look in the slider. It should be engaging and give a good overview of the film.",
    year: "2024",
    genre: "ACTION",
    image: "/AI-Literacy.jpg",
  },
  {
    title: "Movie Title 2",
    description:
      "Description for Movie 2. This movie is a must-watch for fans of the genre. Full of suspense and thrilling moments from start to finish.",
    year: "2023",
    genre: "COMEDY",
    image: "/brands-people-Ax8IA8GAjVg-unsplash.jpg",
  },
  {
    title: "Movie Title 3",
    description:
      "A heartfelt and emotional journey that will leave you thinking long after the credits roll. A truly cinematic experience.",
    year: "2022",
    genre: "DRAMA",
    image: "/img.webp",
  },
  {
    title: "Movie Title 4",
    description:
      "A heartfelt and emotional journey that will leave you thinking long after the credits roll. A truly cinematic experience.",
    year: "2022",
    genre: "DRAMA",
    image: "/cytonn-photography-n95VMLxqM2I-unsplash.jpg",
  },
];

const HeroSlider = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

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

  // Conditional rendering: If the movies array is empty, show a loading message
  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  // Access the current movie only after confirming the array is not empty
  const currentMovie = movies[currentMovieIndex];

  return (
    <>
      <Navbar />
      <div
        className="relative flex min-h-screen items-center px-4 text-white transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url("${currentMovie.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative flex flex-col w-full max-w-6xl mx-auto py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {currentMovie.title}
          </h1>
          <p className="text-lg lg:text-lg sm:text-base md:text-base max-w-xl mb-4">
            {currentMovie.description}
          </p>
          <div className="flex items-center gap-3 mt-4 text-sm font-semibold text-gray-300">
            <span className="bg-black px-4 py-3 text-white">
              {currentMovie.year}
            </span>
            <span className="text-white">|</span>
            <span className="bg-black px-4 py-3 text-white">
              {currentMovie.genre}
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
