import React from "react";

const movies = [
  {
    id: 1,
    title: "Movie 1",
    image: "https://via.placeholder.com/250x150",
  },
  {
    id: 2,
    title: "Movie 2",
    image: "https://via.placeholder.com/250x150",
  },
  {
    id: 3,
    title: "Movie 3",
    image: "https://via.placeholder.com/250x150",
  },
  {
    id: 4,
    title: "Movie 4",
    image: "https://via.placeholder.com/250x150",
  },
  {
    id: 5,
    title: "Movie 5",
    image: "https://via.placeholder.com/250x150",
  },
  {
    id: 6,
    title: "Movie 6",
    image: "https://via.placeholder.com/250x150",
  },
  {
    id: 7,
    title: "Movie 7",
    image: "https://via.placeholder.com/250x150",
  },
];

const Movies = () => {
  return (
    <div className="movies-container bg-black p-4 mb-2 max-w-8xl w-full mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-16 ">
      <h1 className="text-white text-3xl md:text-3xl font-bold mb-2">
        {" "}
        Trending Movies
      </h1>
      <p className="text-white">Here you can find a list of movies.</p>
      <div className="flex overflow-x-scroll no-scrollbar space-x-4 p-2 mt-12">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-48 bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white text-lg font-semibold truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex overflow-x-scroll no-scrollbar space-x-4 p-2 mt-12">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-48 bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white text-lg font-semibold truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex overflow-x-scroll no-scrollbar space-x-4 p-2 mt-12">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-48 bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white text-lg font-semibold truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex overflow-x-scroll no-scrollbar space-x-4 p-2 mt-12">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-48 bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-3">
              <h3 className="text-white text-lg font-semibold truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 justify-center flex items-center">
      <button className="bg-white text-black font-semibold px-8 py-3 w-fit  ">
        Load More
      </button>
      
      </div>
      
    </div>
  );
};

export default Movies;
