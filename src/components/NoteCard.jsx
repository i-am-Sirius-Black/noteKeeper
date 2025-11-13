import React, { useState } from "react";
import { Pin } from "lucide-react";

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
      className={`note-card relative grid p-4 rounded-xl bg-white duration-300 shadow shadow-zinc-400 hover:shadow-lg hover:shadow-zinc-600 cursor-pointer transition-all`}
      style={{
        backgroundColor: color,
        height: "280px",
        width: "100%",
        gridTemplateRows: "auto auto 1fr",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
 
      {isHovered ? (
        <button
          onClick={handlePinClick}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors p-1"
          title={pinnedStatus ? 'Unpin note' : 'Pin note'}
        >
          <Pin className="w-5 h-5" fill={pinnedStatus ? 'currentColor' : 'none'} />
        </button>
      ) : (
        pinnedStatus && (
          <div className="absolute top-2 right-2 text-gray-600 p-1">
            <Pin className="w-5 h-5" fill="currentColor" />
          </div>
        )
      )}

      <div className="pb-2">
        {title && (
          <h3 className="font-semibold mb-1 text-gray-800 leading-tight">
            {truncate(title, maxLengthTitle)}
          </h3>
        )}
        {tagline && (
          <p className="italic text-sm text-gray-600 mb-1">
            {truncate(tagline, maxLengthTag)}
          </p>
        )}
      </div>
      <div className="body-content overflow-hidden">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
          {truncate(content, maxLengthBody)}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
