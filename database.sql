Create database groupomania;

use groupomania;

CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    statut VARCHAR(5) NOT NULL DEFAULT 'user',

    avatar VARCHAR(200),
    description LONGTEXT,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    lastRefreshDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    userId INTEGER NOT NULL,

    text LONGTEXT,
    imageURL VARCHAR(200),

    likes INTEGER DEFAULT 0,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Likes (
    id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    postId INTEGER NOT NULL UNIQUE,
    userId INTEGER NOT NULL UNIQUE,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Commentaires (
    id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,

    text LONGTEXT,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

show tables;