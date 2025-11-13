import React from "react";
import NoteCard from "./NoteCard";

const NoteGrid = ({ notes, onNoteClick, onPinClick }) => {
  if (notes.length === 0) {
    return (
      <div className="w-full mt-12 mb-12">
        <div className="flex justify-center">
          <div className="text-center text-gray-500 py-12">
            <i className="ri-sticky-note-line text-6xl mb-4 text-gray-300"></i>
            <p className="text-xl font-medium">No notes yet</p>
            <p className="text-sm mt-2">Create your first note to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 mb-8 px-4">
      <div className="flex justify-center">
        <div className="note-grid grid w-full max-w-7xl fontRoboto justify-items-center">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.body}
              color={note.color}
              tagline={note.tagline}
              pinned={note.pinned}
              onClick={() => onNoteClick(note)}
              onPinClick={() => onPinClick(note.id, note.pinned)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteGrid;
