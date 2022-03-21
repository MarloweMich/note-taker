const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');
const {
    readFromFile,
    writeToFile,
  } = require('../helpers/fsUtils');

router.get('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('db/db.json'))
    console.log(db)
    res.json(db)
});

router.post('/api/notes', (req, res) => {
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
    res.status(201).json(response);
    } else {
        res.status(500).json('Error in updating notes')
    }
});

router.delete('/api/notes/:id', (req, res) => {
     const noteId = req.params.id;
     readFromFile('../Develop/db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('../Develop/db/db.json', result);
            res.json(`Note ${noteId} has been deleted`);
        })
})


module.exports = router;