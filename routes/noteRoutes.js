const express = require("express");
const NoteController = require("../controllers/NoteController");
const authorization = require("../middleware/authorization");
const router = express.Router();


router.get("/api/notes",authorization, NoteController.getNotes);
router.patch("/api/notes/:id",authorization,NoteController.changeStatus);

module.exports = router;
