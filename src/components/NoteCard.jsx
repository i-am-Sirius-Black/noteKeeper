import React from 'react';

const NoteCard = ({ title, content, color, tagline }) => {
  return (
    <div
      className={`p-4 rounded-xl w-72 bg-white rounded-xl duration-500 shadow shadow-zinc-400 hover:shadow hover:shadow-black`}
      style={{
        backgroundColor: color,
        height: '250px', // Fixed height
        minHeight: '150px', // Minimum height to keep a good appearance
      }}
    >
      <div className='pb-2'>
      <h3 className="font-semibold mb-2 capitalize">{title}</h3>
      <p className="italic text-sm mb-2 capitalize">{tagline}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default NoteCard;
