const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();
const dbData = require("./db/db.json");
const fs = require("fs");

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./notes.html"))
);

app.get("/api/notes", (req, res) => res.json(dbData));

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to retrieve notes`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
    };

    dbData.push(newNote);

    fs.writeFile("./db/db.json", dbData, (err) =>
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
