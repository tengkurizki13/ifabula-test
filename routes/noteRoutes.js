const express = require("express");
const NoteController = require("../controllers/NoteController");
const router = express.Router();

router.post("/api/books/:id", NoteController.recordBookBorrowings);
router.get("/api/notes", NoteController.getNotes);

module.exports = router;
