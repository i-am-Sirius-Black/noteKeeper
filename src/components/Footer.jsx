import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <p className="text-white text-sm">&copy; 2024 NoteKeeper.</p>
        {/* <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/javed-khan-514601171/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            <Linkedin className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/i-am-Sirius-Black"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            <Github className="w-8 h-8" />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
