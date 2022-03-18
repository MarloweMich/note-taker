const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db/db.json')
// const id = require('../helpers/id');
const uuid = require('../helpers/uuid');

router.get('/api/notes', (req, res) => {
    console.log(db)
    res.send(db)
    // res.status(200).json(`${req.method} request received to get notes`);
    // console.log(`${req.method} request received`)
    
});

router.post('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request received to get notes`);
    console.info(`${req.method} request received to a add a note`);
   
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
    
    fs.readFile('../Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {

            console.log('READ db.json')

            const parsedNotes = JSON.parse(data);
            
            parsedNotes.push(newNote);

            fs.writeFile('../Develop/db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) => 
            writeErr
            ?console.error(writeErr)
            :console.info('Succesffuly updated notes!')
            );
        }
    });

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    // res.status(201).json(response);
    } else {
        res.status(500).json('Error in updating notes')
    }
});

module.exports = router;