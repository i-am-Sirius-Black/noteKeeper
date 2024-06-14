// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="p-2 flex items-center justify-between shadow mb-4">
      <div className="text-xl font-bold">My Notes App</div>
      <div className="flex items-center space-x-4">
        <input type="text" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-gray-200 p-2 rounded-full">👤</div>
      </div>
    </header>
  );
};

export default Header;
