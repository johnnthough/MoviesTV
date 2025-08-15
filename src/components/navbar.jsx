import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchBar';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
    
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-white text-2xl font-bold cursor-pointer " 
            onClick={() => navigate('/')}
          >
            MoviesTV
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
        
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;