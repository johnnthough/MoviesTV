import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Movies from '../components/Movies';

const API_URL = "https://api.themoviedb.org/3/search/movie";

const SearchResults = ({ API_KEY }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchTerm = searchParams.get('q');
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm);
        } else {
            navigate('/'); 
        }
    }, [searchTerm, navigate]);

    const searchMovies = async (query) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${query}`);
            setMovies(response.data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to fetch movies. Please try again.");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen">
            {/* Header Section - Similar to your Header component style */}
            <div className="text-white py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                Search Results
                            </h1>
                            <p className="text-gray-300 text-lg">
                                Results for "{searchTerm}"
                            </p>
                        </div>
                    
                    </div>
                    
                    {!loading && !error && movies.length > 0 && (
                        <p className="text-gray-400">
                            Found {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
                        </p>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p className="text-white text-lg">Searching for movies...</p>
                    </div>
                </div>
            )}
            
            {/* Error State */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-8 text-center">
                        <p className="text-red-300 text-lg mb-4">{error}</p>
                        <button 
                            onClick={() => searchMovies(searchTerm)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
            
            {/* No Results State */}
            {!loading && !error && movies.length === 0 && (
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center text-white">
                        <div className="text-8xl mb-6">🎬</div>
                        <h3 className="text-2xl font-semibold mb-4">No movies found</h3>
                        <p className="text-gray-400 text-lg mb-6">
                            We couldn't find any movies matching "{searchTerm}"
                        </p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Browse Popular Movies
                        </button>
                    </div>
                </div>
            )}
            
            {/* Movies Results - Reusing existing Movies component */}
            {!loading && movies.length > 0 && (
                <Movies movies={movies} showHeader={false} />
            )}
        </div>
    );
};

export default SearchResults;