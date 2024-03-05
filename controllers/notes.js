const models = require("../models/notes");

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.session.user.user_id;
  const note = await models.Note.create({
    title,
    content,
    user_id,
  });
  res.json({ note });
};

const getNotes = async (req, res) => {
  const user_id = req.session.user.user_id;
  const notes = await models.Note.findAll({
    where: { user_id },
  });
  res.json({ notes });
};

module.exports = {
  createNote,
  getNotes,
};
