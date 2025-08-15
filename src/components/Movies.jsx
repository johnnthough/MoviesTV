import React from 'react';
import { Link } from 'react-router-dom';

const Movies = ({ movies, showHeader = true }) => {

  return (
    <div className="movies-container bg-black p-4 max-w-8xl w-full mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-16">
      {/* Conditional Header - only show if showHeader is true */}
      {showHeader && (
        <>
          <h1 className="text-white text-3xl md:text-3xl font-bold mb-2">
            {movies.length > 0 ? "Trending Movies" : "Trending Movies"}
          </h1>
          <p className="text-white">Here you can find a list of movies.</p>
        </>
      )}

      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${showHeader ? 'mt-12' : 'mt-0'}`}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="block">
              <div
                className="bg-white shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer "
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
                  alt={movie.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-black text-base font-semibold truncate">
                    {movie.title}
                  </h3>
                  <h3 className="text-gray-400 text-base truncate">
                    {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white text-center col-span-full mt-8">No movies found. Please try a different search.</div>
        )}
      </div>
    </div>
  );
};

export default Movies;