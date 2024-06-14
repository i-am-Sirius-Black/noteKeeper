// NoteModal.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct

const NoteModal = () => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, tagline, body);
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        title,
        tagline,
        body,
        timestamp: new Date()
      });
      console.log('Document written with ID: ', docRef.id);
      // Clear form fields after submission
      setTitle('');
      setTagline('');
      setBody('');
      alert('Note added successfully!');
    } catch (error) {
      console.error('Error adding note: ', error);
      alert('An error occurred while adding the note. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        placeholder="Tagline"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteModal;
