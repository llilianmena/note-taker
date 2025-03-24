const fs = require('fs');
const path = require('path');
const notesFilePath = path.join(__dirname, 'db.json'); // Path to the db.json file
const { v4: uuidv4 } = require('uuid');

// Load the notes from db.json file
const loadNotes = () => {
    const data = fs.readFileSync(notesFilePath, 'utf-8');
    return JSON.parse(data);
};

// Save notes back to db.json
const saveNotes = (notes) => {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2), 'utf-8');
};

// Get all notes
const getAllNotes = () => {
    return loadNotes();
};

// Find a note by its ID or other property
const deleteNote = (id) => {
    const notes = loadNotes();
    const updatedDatabase = notes.filter(note => note.id !== id); // Assuming each note has an 'id' field
    saveNotes(updatedDatabase);
};

// Example of adding a new note
const addNote = (newNote) => {
    newNote.id = uuidv4();
    const notes = loadNotes();
    notes.push(newNote);
    saveNotes(notes);
};

module.exports = {
    getAllNotes,
    deleteNote,
    addNote,
    saveNotes
};
