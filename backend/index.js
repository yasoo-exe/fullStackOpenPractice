require("dotenv").config();
const Note = require("./models/note");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist")); //middle ware to show a static page

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

/*mongoose and mongodb course */

/*end */

//getallnotes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//get one note
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => response.json(note))
    .catch(response.status(404).end());
});

//delete one note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.filter((x) => x.id !== id);
  res.status(204).end();
});

//add new note

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running, port ${PORT}`);
});
