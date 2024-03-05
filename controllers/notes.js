const Note = require("../models/notes");

const createNote = async (req, res) => {
    console.log(req.session.user)
  Note.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user.user_id,
  })
    .then((note) => {
      res.json({
        message: "New note is created",
        note: note,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getNotes = async (req, res) => {
  Note.findAll({
    where: {
      userId: req.session.user.user_id,
    },
  })
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createNote,
  getNotes,
};
