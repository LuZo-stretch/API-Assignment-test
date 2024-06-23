CREATE DATABASE hiking_trails;

USE hiking_trails;

CREATE TABLE trails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trail_name VARCHAR(50) NOT NULL,
    distance DECIMAL(5, 2) NOT NULL,
    difficulty INT NOT NULL,
    trail_location VARCHAR(50) NOT NULL,
    trail_description TEXT,
    upvotes INT DEFAULT 0
);