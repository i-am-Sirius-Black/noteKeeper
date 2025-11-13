// src/App.js
import React, { useEffect, useState } from "react";
import { NoteProvider } from "./contexts/NoteContext";
import Header from "./components/Header";
import NoteGrid from "./components/NoteGrid";
import NoteModal from "./components/NoteModal";
import Pagination from "./components/Pagination";
import "./App.css";
import CreateNote from "./components/CreateNote";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { useToast } from "@chakra-ui/react";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toast = useToast();

  const notesPerPage = 6;
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const notesCollectionRef = collection(db, "notes");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getDocs(notesCollectionRef);
        const fetchedNotes = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        // Sort by pinned status first, then by timestamp
        fetchedNotes.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return b.timestamp.toDate() - a.timestamp.toDate(); // Sort by timestamp if pinned status is the same
          }
          return b.pinned - a.pinned; // Sort by pinned status
        });
        setNotes(fetchedNotes);
      } catch (error) {
        toast({
          title: 'Error fetching notes.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchNotes();
  }, []);


  const handleAddNote = async (note) => {
    try {
      const docRef = await addDoc(notesCollectionRef, note);

      setNotes((prevNotes) => {
        const newNotes = [...prevNotes, { ...note, id: docRef.id }];

        // Sort by pinned status first, then by timestamp
        newNotes.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return b.timestamp - a.timestamp; // Sort by timestamp if pinned status is the same
          }
          return b.pinned - a.pinned; // Sort by pinned status
        });

        const newTotalPages = Math.ceil(newNotes.length / notesPerPage);

        // Only change the current page if the new note creates a new page
        if (
          newNotes.length % notesPerPage === 1 &&
          newNotes.length > prevNotes.length
        ) {
          setCurrentPage(newTotalPages);
        }

        return newNotes;
      });
    } catch (error) {
      toast({
        title: 'Error adding note.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };


  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleUpdateNote = async (updatedNote) => {
    const noteDoc = doc(db, "notes", updatedNote.id);
    try {
      await updateDoc(noteDoc, updatedNote);
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        );
        updatedNotes.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return b.timestamp - a.timestamp;
          }
          return b.pinned - a.pinned;
        });

        return updatedNotes;
      });

      toast({
        title: 'Note updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating note.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //updates card pinned status on pin click
  const handlePinnedStatus = async (id, currentPinnedStatus) => {
    const noteDoc = doc(db, "notes", id);
    try {
      await updateDoc(noteDoc, {
        pinned: !currentPinnedStatus,
      });

      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note.id === id ? { ...note, pinned: !currentPinnedStatus } : note
        );

        updatedNotes.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return b.timestamp - a.timestamp;
          }
          return b.pinned - a.pinned;
        });

        return updatedNotes;
      });
    } catch (error) {
      toast({
        title: 'Error updating note pin status.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    try {
      await deleteDoc(noteDoc);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      toast({
        title: 'Note deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting note.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Filter notes based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedFilteredNotes = filteredNotes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  return (
    <NoteProvider>
      <div className="app">
        <Header onSearch={handleSearch} />
        <div className="main-content">
          <CreateNote onAddNote={handleAddNote} />
          <NoteGrid
            notes={paginatedFilteredNotes}
            onNoteClick={handleNoteClick}
            onPinClick={handlePinnedStatus}
          />
          {filteredNotes.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredNotes.length / notesPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <NoteModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          note={selectedNote}
          onSave={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
        <Footer />
      </div>
    </NoteProvider>
  );
};

export default App;
