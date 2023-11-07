const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();
const dbData = require("./db/db.json");
const fs = require("fs");
const uuid = require('./helpers/uuid')

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(dbData));

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add notes`);
  

  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    };

  
    dbData.push(newNote);
    console.log(dbData)
    dbString = JSON.stringify(dbData)

    fs.writeFile("./db/db.json", dbString, (err) =>
      err ? console.error(err) : console.log("Note saved!")
    );

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in saving note!");
  }
});

app.listen(PORT, () =>
  console.log(`App currently listening at http://localhost:${PORT}`)
);
