const { Book } = require("../models");

class UserController {
  static async getBooks(req, res, next) {
    try {
      let books = await Book.findAll();
      res.status(200).json([
        {
          message: "Profile has been found",
          data: books,
        },
      ]);
    } catch (error) {
      console.log(error,"insafsad");
      next(error);
    }
  }
}

module.exports = UserController;
