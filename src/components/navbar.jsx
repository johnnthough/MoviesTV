import React from 'react';

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50 bg-black text-white font-bold text-2xl'>
      <div className='flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 lg:px-16'>
        <h2 className='text-xl sm:text-2xl whitespace-nowrap'>MoviesTV</h2>
        <input
          type="text"
          placeholder='Search Movies Here'
          className='w-48 sm:w-56 md:w-80 p-2 text-xs font-medium bg-white text-black'
        />
      </div>
    </div>
  );
};

export default Navbar;