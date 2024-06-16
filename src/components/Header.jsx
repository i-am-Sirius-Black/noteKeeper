import React from 'react';
import logo from '../assets/images/logo.png';

const Header = ({ onSearch }) => {
  return (
    <header className="header p-2 flex items-center justify-between shadow mb-4 bg-[#1f2937]">
        <div className="flex items-center">
        <a href="/"><img src={logo} alt="Logo" className="logo mx-4 w-16 md:w-20 lg:w-22 mx-4" /></a>
      </div>

      <div className="search-bar-div flex items-center w-1/4 mx-2 bg-white rounded-lg">
        <i className="ri-search-line text-xl pl-3 text-zinc-400 cursor-pointer"></i>
        <input 
          name='searchBar' 
          type="text" 
          placeholder="Search notes..." 
          onChange={(e) => onSearch(e.target.value)} 
          className="search-bar px-3 py-2 outline-none rounded-lg bg-white"
        />
      </div>
  
      <div className="social-icons flex items-center space-x-4 mx-4">
      <a href="https://www.linkedin.com/in/javed-khan-514601171/" target="_blank" rel="noopener"><i className="ri-linkedin-box-fill text-white text-3xl"></i></a>
      <a href="https://github.com/i-am-Sirius-Black" target="_blank" rel="noopener"><i className="ri-github-fill text-white text-3xl"></i></a>
      </div>
    </header>
  );
};

export default Header;
