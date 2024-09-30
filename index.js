const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 5000

app.use(cors({origin:'http://localhost:3000'})); // frontend URL
app.use(bodyParser.json());
app.use(express.json());

app.post('/register', (req, res) =>{
    const {name, address} = req.body;

    // Insert into User Table
    db.run(`INSERT INTO User (name) VALUES (?)`, [name], function(err){
        if(err){
            console.log("user insert error: ", err.message);
            return res.status(400).send(err.message);
        }
        const userId = this.lastID;

        // Insert into Address Table
        db.run(`INSERT INTO Address (userId, address) VALUES (?, ?)`, [userId,address], function(err){
            if(err){
                return res.status(400).send(err.message);
            }
            res.status(201).json({userId, addressId: this.lastID});
        });
    });
});

app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}/`);
})