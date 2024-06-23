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

