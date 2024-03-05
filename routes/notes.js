const express = require("express");
const router = express.Router();
const { createNote, getNotes } = require("../controllers/notes");

router.get("/notes", getNotes);
router.post("/createNote", createNote);

module.exports = router;
