const { Note,User,Book } = require("../models");
const { Op } = require('sequelize');

class NoteController {
  static async recordBookBorrowings(req, res, next) {
    try {
      const {id} = req.params
      const {borrowingDate,DateOfReturn,status = "Dipinjam"} = req.body

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
          DateOfReturn,
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

  static async getNotes(req, res, next) {
    try {
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
      let notes = await Note.findAll(option);
      res.status(200).json([
        {
          message: "Profile has been found",
          data: notes,
        },
      ]);
    } catch (error) {
      console.log(error,"insafsad");
      next(error);
    }
  }

  static async checkReturnDates() {
    try {
      const overdueBooks = await Note.findAll({
        where: {
          DateOfReturn: {
            [Op.lt]: new Date(), // Mengambil buku dengan returnDate yang sudah lewat
          },
          status: 'Dipinjam', // Hanya mengambil buku yang masih dalam status Dipinjam
        },
      });

      // Mengubah status buku yang melebihi tanggal pengembalian
      for (const book of overdueBooks) {
        book.status = 'Telat';
        await book.save();
      }

      console.log('Status buku diperbarui');
    } catch (error) {
      console.error('Gagal memeriksa tanggal pengembalian:', error);
    }
  }
  
}

module.exports = NoteController;
