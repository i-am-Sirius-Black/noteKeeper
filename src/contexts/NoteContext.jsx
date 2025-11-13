import React, { createContext, useState, useEffect } from 'react';
import { fetchNotes, addNote, updateNote, deleteNote } from '../services/noteServices';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const notesData = await fetchNotes();
      setNotes(notesData);
    };

    loadNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
