const express = require("express");
const BookController = require("../controllers/BookController");
const router = express.Router();

router.get("/api/books", BookController.getBooks);
module.exports = router;
