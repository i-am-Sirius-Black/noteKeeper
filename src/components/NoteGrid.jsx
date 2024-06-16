import React from "react";
import NoteCard from "./NoteCard";

const NoteGrid = ({ notes, onNoteClick, onPinClick   }) => {
  return (
    <div className="w-full mt-8">
      <div className="flex justify-center">
      <div className="note-grid grid grid-cols-3 gap-10 p-4 fontRoboto">
        {/* <div className="flex justify-between gap-5 fontRoboto"> */}
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.body}
            color={note.color}
            tagline={note.tagline}
            pinned={note.pinned}
            onClick={() => onNoteClick(note)}
            onPinClick={() => onPinClick(note.id, note.pinned)} // Pass note id and pinned status
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default NoteGrid;
