import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';

const notesCollection = collection(db, 'notes');

export const addNote = async (note) => {
  try {
    await addDoc(notesCollection, note);
  } catch (error) {
    console.error("Error adding note: ", error);
  }
};

export const updateNote = async (note) => {
  try {
    const noteDoc = doc(db, 'notes', note.id);
    await updateDoc(noteDoc, note);
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};

export const deleteNote = async (id) => {
  try {
    const noteDoc = doc(db, 'notes', id);
    await deleteDoc(noteDoc);
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};

export const fetchNotes = async () => {
  try {
    const snapshot = await getDocs(notesCollection);
    const notes = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return notes;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};
