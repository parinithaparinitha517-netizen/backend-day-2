
const express = require('express');
const app = express();
const Note = require('./models/notemodel');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

/*
========================================
SERVE REACT BUILD FILES
========================================
*/

app.use(
    express.static(
        path.join(__dirname, '../public/dist')
    )
);

/*
========================================
CREATE NOTE
========================================
*/

app.post('/new/notes', async (req, res) => {

    try {

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const note = await Note.create({
            title,
            description
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
========================================
GET NOTES
========================================
*/

app.get('/new/notes', async (req, res) => {

    try {

        const notes = await Note.find();

        res.status(200).json({
            message: "Notes retrieved successfully",
            notes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
========================================
DELETE NOTE
========================================
*/

app.delete('/new/notes/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const note = await Note.findByIdAndDelete(id);

        res.status(200).json({
            message: "Note deleted successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
========================================
UPDATE NOTE
========================================
*/

app.patch('/new/notes/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const note = await Note.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        res.status(200).json({
            message: "Note updated successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
========================================
REACT ROUTING
========================================
*/
app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, '../public/dist/index.html')
    );
});

module.exports = app;