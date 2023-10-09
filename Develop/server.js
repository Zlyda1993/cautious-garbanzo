const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const PORT = 3001;

const app = express();


app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while reading the database." });
            return;
        }

        const notes = JSON.parse(data);
        res.json(notes);
    });
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    newNote.id = uuidv4();

    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while reading the database." });
            return;
        }

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "An error occurred while writing to the database." });
                return;
            }

            res.json(newNote);
        });
    });
})

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while reading the database." });
            return;
        }

        const notes = JSON.parse(data);

        const index = notes.findIndex(note => note.id === noteId);

        if (index === -1) {

            res.status(404).json({ error: "Note not found." });
        } else {

            notes.splice(index, 1);

            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), err => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "An error occurred while writing to the database." });
                } else {
                    res.json({ message: "Note deleted successfully." });
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log("Server is now running!")
})