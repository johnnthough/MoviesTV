import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/searchBar';
import Movies from './components/Movies';

// Use the TMDB API base URL and query parameter for the API key.
const API_KEY = "4a7b7e7e66e45bdee313439ca81dce8d"; // Replace with your TMDB API key
const API_URL = "https://api.themoviedb.org/3/search/movie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("spiderman");

  const searchMovies = async (title) => {
    try {
      // The search parameter for TMDB is 'query', not 's'.
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${title}`);
      const data = await response.json();
      
      // The movie list is in the 'results' property, not 'Search'.
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  // This useEffect will run once on component mount to fetch initial movies
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      searchMovies(searchTerm);
    }
  }, []);

  const handleSearch = (term) => {
    // Only trigger the search if the term is not empty
    if (term.trim() !== '') {
      setSearchTerm(term);
      searchMovies(term);
    }
  };

  return (
    <div>
      <Header />
      <Movies movies={movies} /> 
    </div>
  );
};

export default App;
