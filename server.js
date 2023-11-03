const express = require("express");
const path = require("path");
const PORT = 3001;
const app = express();
const dbData = require('./db/db.json')

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "notes.html")))

app.get('/api/notes', (req, res)=> res.json(dbData))

app.post('/api/notes', (req,res)=>{})

app.listen(PORT, () =>
  console.log(`App currently listening at http://localhost:${PORT}`)
);

