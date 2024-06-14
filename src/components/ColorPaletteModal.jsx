import React from 'react';

const ColorPaletteModal = ({ show, onClose, onColorSelect }) => {
  if (!show) return null;

  const colors = [
    '#F28B82', '#F7BD02', '#FBF476', 
    '#CCFF90', '#A7FEEB', '#CBF0F8', '#AECBFA',
  ];

  return (
    <div className="absolute top-[35%] flex justify-center items-center">
      <div className="p-4 rounded shadow-lg">
        <div className="grid grid-cols-8 gap-2">
          {colors.map((color) => (
            <div 
              key={color} 
              onClick={() => onColorSelect(color)}
              className="w-5 h-5 rounded-full cursor-pointer border hover:border-black"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        {/* <button onClick={onClose} className="rounded"><i class="ri-close-line"></i></button> */}
      </div>
    </div>
  );
};

export default ColorPaletteModal;
