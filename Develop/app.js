const express = require('express');
const path = require('path');
const database = require("./db/database");

const app = express();
const port = process.env.PORT || 3000; // You can choose any port

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route to serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(database.getAllNotes());
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    database.addNote(note);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    database.deleteNote(id);
    res.json();
})

// Example route to check server status
app.get('/status', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
