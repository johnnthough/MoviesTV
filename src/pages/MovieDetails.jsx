import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = ({ API_KEY }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, videosResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        ]);
        
        setMovie(movieResponse.data);

       
        const trailer = videosResponse.data.results.find(
          (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }

      } catch (e) {
        setError("Failed to fetch movie details. Please check the movie ID.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="text-white text-center mt-10">Movie details not available.</div>;
  }

  return (
  
    <div className="bg-black p-4 max-w-6xl w-full mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-16 text-white">
      <div className="flex flex-col md:flex-row gap-20 md:gap-10 items-center md:items-start">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
          alt={movie.title}
          className="shadow-lg max-w-sm w-full md:w-auto"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && <p className="text-xl italic text-gray-400 mb-4">"{movie.tagline}"</p>}
          <p className="text-lg mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="text-lg mb-2"><strong>Rating:</strong> {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)</p>
          <p className="text-lg mb-2"><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p className="text-lg mb-2"><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Overview</h2>
          <p className="text-base leading-relaxed text-gray-300">{movie.overview}</p>
        </div>
      </div>
      {trailerKey && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <div className="relative w-full overflow-hidden shadow-lg" style={{ paddingTop: '56.25%' }}>
            <iframe
              title="movie-trailer"
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&controls=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
