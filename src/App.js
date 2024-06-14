// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { NoteProvider, NoteContext } from './contexts/NoteContext';
import { ModalProvider, ModalContext } from './contexts/ModalContext';
import Header from './components/Header';
import NoteGrid from './components/NoteGrid';
import NoteModal from './components/NoteModal';
import Pagination from './components/Pagination';
import Toast from './components/Toast';
import './App.css';
import CreateNote from './components/CreateNote';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from "./firebase";


const App = () => {

  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  const notesPerPage = 6;
  const totalPages = Math.ceil(notes.length / notesPerPage);


  const notesCollectionRef = collection(db, "notes");

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      // setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const fetchedNotes = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(fetchedNotes.reverse()); // Reverse the notes order
    };
    fetchNotes();
  }, []);


  const handleAddNote = async (note) => {
    try {
      const docRef = await addDoc(notesCollectionRef, note);
      // setNotes((prevNotes) => [...prevNotes, { ...note, id: docRef.id }]);
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes, { ...note, id: docRef.id }];
        const newTotalPages = Math.ceil(newNotes.length / notesPerPage);

        // Only change the current page if the new note creates a new page
        if ((newNotes.length) % notesPerPage === 1 && newNotes.length > prevNotes.length) {
          setCurrentPage(newTotalPages);
        }

        return newNotes;
      });

      setToastMessage('Note added successfully');
      // if ((notes.length + 1) % notesPerPage === 0) {
      //   setCurrentPage(totalPages + 1);
      // }
    } catch (error) {
      console.error("Error adding note: ", error);
      alert("Error adding note: ", error)
      setToastMessage('An error occurred while adding the note. Please try again.');
    }
  };

  const paginatedNotes = notes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  // const { notes, addNote, updateNote } = useContext(NoteContext);
  // const { isModalOpen, currentNote, openModal, closeModal } = useContext(ModalContext);
  
  // const [toastMessage, setToastMessage] = useState('');

  // const notesPerPage = 6;
  // const totalPages = Math.ceil(notes.length / notesPerPage);
  // const paginatedNotes = notes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  // const handleSaveNote = async (note) => {
  //   if (note.id) {
  //     await updateNote(note);
  //     setToastMessage('Note updated successfully');
  //   } else {
  //     await addNote(note);
  //     setToastMessage('Note added successfully');
  //   }
  // };

  return (
    <NoteProvider>
      {/* <ModalProvider> */}
        <div className="app">
          <Header/>
          <CreateNote onAddNote={handleAddNote} />
          <NoteGrid notes={paginatedNotes}/>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          {/* <NoteGrid notes={paginatedNotes} onNoteClick={openModal} /> */}
          {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          {isModalOpen && <NoteModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveNote} note={currentNote} />}
          {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />} */}
        </div>
      {/* </ModalProvider> */}
    </NoteProvider>
  );
};

export default App;

