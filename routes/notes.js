const express = require("express");
const router = express.Router();
const { createNote, getNotes } = require("../controllers/notes");

router.post("/create", createNote);
router.get("/", getNotes);

module.exports = router;
