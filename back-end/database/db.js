const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/bancoDeDadosTarefaUm.db');

db.serialize(() => {
    // Carros
    db.run(`
        CREATE TABLE IF NOT EXISTS carros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            trade TEXT,
            model TEXT,
            year INTEGER,
            price REAL,
            thumb TEXT,
            specifications TEXT
        )
    `);

    // Usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age TEXT UNIQUE
        )
    `);
});

module.exports = db;
