import React from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

const ColorPaletteModal = ({ handleColorChange }) => {
  const colors = [
    "#FFFFFF",
    "#FE9B72",
    "#FEC971",
    "#A7E6FF",
    "#DDDDDD",
    "#D8EFD3",
  ];

  return (
    <Popover>
      <PopoverTrigger>
        <i className="ri-palette-line text-xl font-bold cursor-pointer text-zinc-500" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <div className="grid grid-cols-6">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => handleColorChange(color)}
                className="w-5 h-5 rounded-full cursor-pointer border border-zinc-400 hover:border-zinc-600 hover:shadow-inner"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPaletteModal;
