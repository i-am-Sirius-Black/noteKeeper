import React, { useState, useEffect, useRef } from "react";
import { X, Trash2, AlertCircle } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import ColorPaletteModal from "./ColorPaletteModal";
import useClickOutside from "../hooks/useClickOutside";

function NoteModal({ isOpen, onClose, note, onSave, onDelete }) {
  const [title, setTitle] = useState(note?.title || "");
  const [tagline, setTagline] = useState(note?.tagline || "");
  const [body, setBody] = useState(note?.body || "");
  const [color, setColor] = useState(note?.color || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteModalRef = useRef(null);

  useClickOutside(deleteModalRef, () => setShowDeleteConfirm(false));

  useEffect(() => {
    setTitle(note?.title || "");
    setTagline(note?.tagline || "");
    setBody(note?.body || "");
    setColor(note?.color || "");
  }, [note, isOpen]);

  const handleSave = () => {
    const updatedNote = { ...note, title, tagline, body, color, timestamp: new Date() };
    onSave(updatedNote);
    onClose();
  };

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative w-full max-w-2xl rounded-lg shadow-xl"
          style={{ backgroundColor: color }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200 border-opacity-30">
            <div className="flex-1">
              <TextareaAutosize
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                maxRows={3}
                style={{ backgroundColor: color }}
                className="w-full outline-none text-2xl font-bold placeholder-gray-400 resize-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 hover:bg-opacity-50 rounded transition-colors ml-4 flex-shrink-0"
              title="Close"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Tagline"
              style={{ backgroundColor: color }}
              className="w-full outline-none text-sm placeholder-gray-400 italic mb-4"
            />
            <TextareaAutosize
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Take a note..."
              minRows={8}
              maxRows={12}
              style={{ backgroundColor: color }}
              className="w-full outline-none text-md fontRoboto placeholder-gray-400 resize-none leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center p-6 border-t border-gray-200 border-opacity-30">
            <ColorPaletteModal handleColorChange={handleColorChange} />

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded transition-colors font-medium text-sm"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-teal-500 text-teal-600 hover:bg-teal-50 rounded transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            </div>

            {/* Delete Button */}
            <div className="relative" ref={deleteModalRef}>
              <button
                onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                title="Delete note"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              {/* Delete Confirmation Dropdown */}
              {showDeleteConfirm && (
                <div className="absolute bottom-full mb-2 -right-32 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64 z-50">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900">Delete Note</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Are you sure you want to delete this note? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteModal;
