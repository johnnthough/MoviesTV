import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Navbar from './components/navbar';
import Movies from './components/Movies';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';

const API_KEY = "4a7b7e7e66e45bdee313439ca81dce8d";
const TRENDING_URL = "https://api.themoviedb.org/3/movie/popular";

const App = () => {
    const [movies, setMovies] = useState([]);

    // Fetch trending movies for home page
    const fetchTrendingMovies = async () => {
        try {
            const response = await axios.get(`${TRENDING_URL}?api_key=${API_KEY}`);
            setMovies(response.data.results || []);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
            setMovies([]);
        }
    };

    useEffect(() => {
        fetchTrendingMovies();
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <BrowserRouter>
                <Navbar /> 
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <Header />
                                <Movies movies={movies} showHeader={true} />
                            </>
                        } 
                    />
                    <Route 
                        path="/search" 
                        element={
                            <SearchResults API_KEY={API_KEY} />
                        } 
                    />
                    <Route 
                        path="/movies/:id" 
                        element={
                            <MovieDetails API_KEY={API_KEY} />
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;