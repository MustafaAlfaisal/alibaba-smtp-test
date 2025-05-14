// server.js - Main application entry point
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const emailRouter = require('./routes/email');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', emailRouter);

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});
