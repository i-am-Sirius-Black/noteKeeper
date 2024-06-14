import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const colors = [
  "#FFFFFF",
  "#FE9B72",
  "#FEC971",
  "#00D4FE",
  "#DDDDDD",
  "#D8EFD3",
];

function CreateNote({ onAddNote }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [pinned, setPinnned] = useState(false);

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

  const handleClose = () => {
    setExpanded(false);
    setPinnned(false); 
    setColor("#FFFFFF");
  };

  const handlePinnedStatus = () => {
    
    if (pinned) {
      setPinnned(false);
    } else {
      setPinnned(true);
    }
  };

  return (
    <div className="flex justify-center p-2">
      <div
        className="relative flex flex-col gap-3 p-4 border rounded-md w-[40%] bg-white shadow fontOpenSans placeholder-zinc-500 appearance-none border text-gray-500 focus:outline-none focus:shadow-outline"
        style={{ backgroundColor: color }}
      >
        {expanded && (
          <>
            <i
              onClick={() => handlePinnedStatus()}
              className={`${pinned ? "ri-pushpin-2-fill" : "ri-pushpin-2-line"} absolute top-2 right-2 text-xl text-gray-400 cursor-pointer hover:shadow-2xl`}
            ></i>

            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ backgroundColor: color }}
              className="outline-none font-semibold text-lg placeholder-gray-500 capitalize"
            />
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              placeholder="@Tagline"
              name="tagline"
              style={{ backgroundColor: color }}
              className="outline-none text-sm"
            />
          </>
        )}

        <TextareaAutosize
          name="body"
          placeholder="Take a note..."
          rows="2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ backgroundColor: color }}
          className={
            expanded
              ? "outline-none fontsemibold text-md fontRoboto my-3 placeholder-gray-500 resize-none"
              : "outline-none fontsemibold placeholder-gray-700 font-semibold resize-none"
          }
          onClick={() => setExpanded(true)}
        />

        {expanded && (
          <div className="flex justify-between ">
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-2xl font-bold hover:text-black"
            >
              <i class="ri-add-line"></i>
            </button>

            <div className="grid grid-cols-8 gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-5 h-5 rounded-full cursor-pointer border border-zinc-400 hover:border-zinc-600 hover:shadow-inner"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 "
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
