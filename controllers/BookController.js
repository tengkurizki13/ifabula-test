const { Book,Note,User } = require("../models");
const { Op } = require('sequelize');

class UserController {
  static async getBooks(req, res, next) {
    try {
      // query select all data books
      let books = await Book.findAll();

      // response
      res.status(200).json([
        {
          message: "Books has been found",
          data: books,
        },
      ]);
    } catch (error) {

      // log error to index
      next(error);
    }
  }

  static async recordBookBorrowings(req, res, next) {
    try {
      const {id} = req.params
      const {borrowingDate,dateOfReturn,status = "Dipinjam"} = req.body

      // cek user udh pernah minjam atau belum

      let notes = await Note.findOne({
        where: {
          userId: req.user.id,
          [Op.or]: [
            { status: 'Dipinjam' },
            { status: 'Telat' },
          ],
        },
      });

      if (notes !== null) {
        return res.status(400).json(
          {
            message: "You have borrowed a book and have not returned it"
          },
        );
      } 

      let note = await Note.create(
        {
          borrowingDate,
          dateOfReturn,
          status,
          userId : req.user.id,
          bookId : Number(id),
        }
      );

        let option = {
          include: [
            {
              model: User,
              attributes: {
                exclude: ["password"],
              },
            },
            {
              model: Book,
            }
          ]
        };

      let detail = await Note.findByPk(note.id, option);

      res.status(201).json([
        {
          message: "the book was successfully borrowed",
          data : detail
        },
      ]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
