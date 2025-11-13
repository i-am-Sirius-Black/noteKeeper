import React, { useState, useRef } from "react";
import { Palette, X } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";

const ColorPaletteModal = ({ handleColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const colors = [
    "#FFFFFF",
    "#FE9B72",
    "#FEC971",
    "#A7E6FF",
    "#DDDDDD",
    "#D8EFD3",
  ];

  useClickOutside(modalRef, () => setIsOpen(false));

  const handleColorClick = (color) => {
    handleColorChange(color);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={modalRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-200 rounded transition-colors"
        title="Choose color"
      >
        <Palette className="w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 -right-12 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50 w-max">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Colors</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-gray-600 hover:shadow-md transition-all cursor-pointer"
                style={{ backgroundColor: color }}
                title={`Color: ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteModal;
