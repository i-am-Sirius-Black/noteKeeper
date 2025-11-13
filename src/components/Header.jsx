import React from 'react';
import logo from '../assets/images/logo.png';

const Header = ({ onSearch }) => {
  return (
    <header className="header p-3 flex items-center justify-between shadow-md bg-[#1f2937] sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0">
        <a href="/">
          <img 
            src={logo} 
            alt="NoteKeeper Logo" 
            className="logo w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 object-contain" 
          />
        </a>
      </div>

      <div className="search-bar-div flex items-center flex-grow max-w-md mx-4 bg-white rounded-lg overflow-hidden">
        <i className="ri-search-line text-xl pl-3 pr-1 text-zinc-400"></i>
        <input 
          name='searchBar' 
          type="text" 
          placeholder="Search notes..." 
          onChange={(e) => onSearch(e.target.value)} 
          className="search-bar w-full px-2 py-2 outline-none bg-white text-gray-700"
        />
      </div>
  
      <div className="social-icons flex items-center space-x-3 flex-shrink-0">
        <a 
          href="https://www.linkedin.com/in/javed-khan-514601171/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <i className="ri-linkedin-box-fill text-white text-3xl"></i>
        </a>
        <a 
          href="https://github.com/i-am-Sirius-Black" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <i className="ri-github-fill text-white text-3xl"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
