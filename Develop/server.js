const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 3001;

const app = express();

// middleware
app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.get("/notes", (req, res) => {
    // res.send("hi!")

    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// app.get("/assets/css/styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"))
// })

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.post("/api/notes", (req, res) => {

    const newNote = req.body;

    console.log(newNote);

    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        console.log(data)

        const notes = JSON.parse(data)

        notes.push(newNote);

        console.log(notes)

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), function (err) {
            if (err) {
                console.log(err);
                return;
            }


            res.send("Successful!")
        })

    })


})



app.listen(PORT, () => {
    console.log("Server is now running!")
})



