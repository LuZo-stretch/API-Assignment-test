require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to our API!');
});

// Creating MySQL connection pool

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hiking_trails',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});

// CREATE A TRAIL
app.post('/create-trail', (req, res) => {
    const { trail_name, distance, difficulty, trail_location, trail_description, upvotes } = req.body;
    const sql = 'INSERT INTO trails (trail_name, distance, difficulty, trail_location, trail_description, upvotes) VALUES (?, ?, ?, ?, ?, ?)';
    pool.query(sql, [trail_name, distance, difficulty, trail_location, trail_description, upvote], (err, result) => {
        if (err) {
            console.error('Error inserting trail route:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ id:result.insertId, message: `Trail route ${trail_name} created successfully` });
    });
});
