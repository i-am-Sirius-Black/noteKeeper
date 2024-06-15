import React, { useState } from "react";

const NoteCard = ({
  title,
  content,
  color,
  tagline,
  pinned,
  onClick,
  onPinClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pinnedStatus, setPinnedStatus] = useState(pinned);

  const maxLengthBody = 150;
  const maxLengthTitle = 28;
  const maxLengthTag = 25;
  const truncate = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    }
    return str;
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    onPinClick();
    setPinnedStatus(!pinnedStatus);
  };

  return (
    <div
      className={`relative grid p-4 rounded-xl w-72 bg-white rounded-xl duration-500 shadow shadow-zinc-400 hover:shadow-lg hover:shadow-zinc-800 cursor-default`}
      style={{
        backgroundColor: color,
        height: "250px",
        minHeight: "150px",
        gridTemplateRows: "1fr 2fr 1fr",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
 
      {isHovered ? (
        <i
          className={`${
            pinnedStatus ? "ri-pushpin-fill" : "ri-pushpin-line"
          } absolute top-1 right-1 text-xl cursor-pointer`}
          onClick={handlePinClick}
        />
      ) : (<i
        className={`${
          pinnedStatus && "ri-pushpin-fill"
        } absolute top-1 right-1 text-xl cursor-pointer`}
      />)}

      <div className="pb-2">
        <h3 className="font-semibold mb-2">
          {truncate(title, maxLengthTitle)}
        </h3>
        <p className="italic text-sm mb-2">{truncate(tagline, maxLengthTag)}</p>
      </div>
      <div className="body-content row-span-2">
        <p>{truncate(content, maxLengthBody)}</p>
      </div>

      {/* {isHovered && (
        <div className='flex justify-end'>
          <p></p>
        </div>
      )} */}
    </div>
  );
};

export default NoteCard;
