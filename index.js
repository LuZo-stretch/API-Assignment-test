require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const Joi = require('joi');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

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

// Checking the setup is correct

pool.getConnection((err, connection) => {
    if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
    }
    console.log('Database connected!');
    connection.release();
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to our API!');
});

// Joi schema for trail validation
const trailSchema = Joi.object({
    trail_name: Joi.string().required(),
    distance: Joi.number().required(),
    difficulty: Joi.number().required(),
    trail_location: Joi.string().required(),
    trail_description: Joi.string().optional(),
    upvotes: Joi.number().integer().optional()
});

// CREATE A TRAIL
app.post('/create-trail', (req, res) => {
    const { error } = trailSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { trail_name, distance, difficulty, trail_location, trail_description, upvotes } = req.body;
    const sql = 'INSERT INTO trails (trail_name, distance, difficulty, trail_location, trail_description, upvotes) VALUES (?, ?, ?, ?, ?, ?)';
    pool.query(sql, [trail_name, distance, difficulty, trail_location, trail_description, upvotes], (err, result) => {
        if (err) {
            console.error('Error inserting trail route:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ id:result.insertId, message: `Trail route ${trail_name} created successfully` });
    });
});

// GET ALL TRAILS
app.get('/trails', (req, res) => {
    const sql = 'SELECT * FROM trails';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    })
})

// UPDATE TRAILS
app.put('/trails/:id', (req, res) => {
    const { error } = trailSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const id = req.params.id;
    const { trail_name, distance, difficulty, trail_location, trail_description, upvotes } = req.body;
    const sql = 'UPDATE trails SET trail_name = ?, distance = ?, difficulty = ?, trail_location = ?, trail_description = ?, upvotes = ? WHERE id = ?';
    pool.query(sql, [trail_name, distance, difficulty, trail_location, trail_description, upvotes, id], (err, results) => {
        if (err) {
            console.error('Error updating trail', err.message);
            return res.status(500).json({ error: 'Database error'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: `Trail not found` });
        }
        res.status(200).json({ message: `Trail with ID ${id} updated successfully`});
    });
});

// DELETE TRAILS

app.delete('/trails/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM trails WHERE id = ?';
    pool.query(sql, [trail_name, distance, difficulty, trail_location, trail_description, upvotes, id], (err, results) => {
        if (err) {
            console.error('Error deleting trail', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Trail not found'});
        }

        res.status(200).json({ message: 'Trail deleted successfully' });
    });
});

// ADDITIONAL ENDPOINT: Upvote a trail
app.post('/trails/:id/upvote', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE trails SET upvotes = upvotes + 1 WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error upvoting trail:', err.message);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Trail not found' });
        }
        res.status(200).json({ message: `Trail with ID ${id} upvoted successfully` });
    });
});