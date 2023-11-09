const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const dbData = require("./db/db.json");
const fs = require("fs");
const uuid = require("./helpers/uuid");

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
      id: uuid(),
    };

    dbData.push(newNote);
    console.log(dbData);
    const dbString = JSON.stringify(dbData);

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

app.delete("/api/notes/:id", (req, res) => {
  console.info(`${req.method} request received to delete note`);
  const postData = dbData.filter((item) => item.id !== req.params.id);
  console.log(postData);
  const dbString = JSON.stringify(postData);
  
  fs.writeFile("./db/db.json", dbString, (err) =>
    err ? console.error(err) : console.log("Note deleted!")
  );
});

app.listen(PORT, () =>
  console.log(`App currently listening at http://localhost:${PORT}`)
);
