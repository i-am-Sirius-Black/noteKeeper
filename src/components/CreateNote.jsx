import React, { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Plus, Pin, X } from "lucide-react";
import ColorPaletteModal from "./ColorPaletteModal";
import useClickOutside from "../hooks/useClickOutside";

function CreateNote({ onAddNote }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [pinned, setPinnned] = useState(false);

  const noteRef = useRef(null);

  const handleClose = () => {
    setExpanded(false);
    setPinnned(false);
    setColor("#FFFFFF");
  };

  useClickOutside(noteRef, handleClose);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) {
      alert("Please write something in the note body.");
      return;
    }

    const note = { title, tagline, body, color, pinned, timestamp: new Date() };
    onAddNote(note);
    setTitle("");
    setTagline("");
    setBody("");
    setColor("#FFFFFF");
    setExpanded(false);
  };

  const handleColorChange = (color) => {
    setColor(color);
    console.log(color);
  };

  const handlePinnedStatus = () => {
    
    if (pinned) {
      setPinnned(false);
    } else {
      setPinnned(true);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div
        ref={noteRef}
        className="relative flex flex-col gap-3 p-4 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 w-full max-w-2xl"
        style={{ backgroundColor: color }}
      >
        {expanded && (
          <>
            <button
              onClick={() => handlePinnedStatus()}
              className={`absolute top-3 right-3 transition-colors ${
                pinned ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
              }`}
              title={pinned ? 'Unpin note' : 'Pin note'}
            >
              <Pin className="w-6 h-6" fill={pinned ? 'currentColor' : 'none'} />
            </button>

            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ backgroundColor: color }}
              className="outline-none font-semibold text-lg placeholder-gray-400 capitalize pt-2"
            />
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="@Tagline"
              name="tagline"
              style={{ backgroundColor: color }}
              className="outline-none text-sm placeholder-gray-400 italic"
            />
          </>
        )}

        <TextareaAutosize
          name="body"
          placeholder={expanded ? "Take a note..." : "Take a note..."}
          minRows={expanded ? 3 : 1}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ backgroundColor: color }}
          className={
            expanded
              ? "outline-none text-sm font-normal my-2 placeholder-gray-400 resize-none leading-relaxed"
              : "outline-none text-sm placeholder-gray-500 font-normal resize-none cursor-text w-full"
          }
          onClick={() => setExpanded(true)}
        />

        {expanded && (
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
              title="Add Note"
            >
              <Plus className="w-6 h-6" />
            </button>

            <ColorPaletteModal handleColorChange={handleColorChange} />
            <button
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors px-3 py-1 rounded hover:bg-gray-100"
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateNote;
