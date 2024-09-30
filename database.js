const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./userDetails.db', (error) =>{
    if(error){
        console.log(error.message);
    }
    console.log('Connected to the userDetails database')
});

db.serialize(() =>{
    db.run(`CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db .run(`CREATE TABLE IF NOT EXISTS Address (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        address TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id)
    )`);
});

module.exports = db;