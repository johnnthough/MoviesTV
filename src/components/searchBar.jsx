// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleKeyDown = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === 'Enter') {
      onSearch(searchTerm); // Trigger the search function in the parent component
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown} // Add the key down event handler here
      className="w-48 sm:w-56 md:w-80 p-2 text-xs font-medium bg-white text-black"
    />
  );
};

export default SearchBar;