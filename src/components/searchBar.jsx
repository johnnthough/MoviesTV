import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleKeyDown = (e) => {
   
    if (e.key === 'Enter') {
      onSearch(searchTerm); 
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown} 
      className="w-48 sm:w-56 md:w-80 p-2 text-xs font-medium bg-white text-black"
    />
  );
};

export default SearchBar;