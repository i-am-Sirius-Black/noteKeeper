import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between px-5">
        <p className="text-white text-sm">&copy; 2024 NoteKeeper.</p>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/javed-khan-514601171/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            <i className="ri-linkedin-box-fill text-white text-3xl"></i>
          </a>
          <a
            href="https://github.com/i-am-Sirius-Black"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            <i className="ri-github-fill text-white text-3xl"></i>
          </a>
          {/* Add more social icons or links as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
