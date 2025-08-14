import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import MovieDetails from './pages/MovieDetails';


const API_KEY = "4a7b7e7e66e45bdee313439ca81dce8d"; 
const API_URL = "https://api.themoviedb.org/3/search/movie";
const TRENDING_URL = "https://api.themoviedb.org/3/movie/popular";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      if (title.trim() === '') {
        const response = await axios.get(`${TRENDING_URL}?api_key=${API_KEY}`);
        setMovies(response.data.results || []);
      } else {
        const response = await axios.get(`${API_URL}?api_key=${API_KEY}&query=${title}`);
        setMovies(response.data.results || []);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term) => {
    if (term.trim() !== searchTerm) {
      setSearchTerm(term);
    }
  };

  return (
    <div className="bg-black min-h-screen"> 
      <BrowserRouter>
        <Navbar handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Movies movies={movies} />} />
          <Route path="/movies/:id" element={<MovieDetails API_KEY={API_KEY} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
