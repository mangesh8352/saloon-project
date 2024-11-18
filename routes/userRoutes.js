const express = require('express');
const db = require('../db/db');
const router = express.Router();

// Route to handle form submission
router.post('/submit', async (req, res) => {
    const { username, email } = req.body;

    // Basic validation
    if (!username || !email) {
        return res.status(400).json({ error: 'Name and Email are required.' });
    }

    const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.query(sql, [username, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Data inserted successfully!' });
    });
});