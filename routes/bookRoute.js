const express = require("express");
const BookController = require("../controllers/BookController");
const router = express.Router();

router.post("/api/books/:id", BookController.recordBookBorrowings);
router.get("/api/books", BookController.getBooks);
module.exports = router;
