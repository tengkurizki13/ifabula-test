const { Note,User,Book } = require("../models");
const { Op } = require('sequelize');
const moment = require('moment');

class NoteController {
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
          message: "Notes has been found",
          data: notes,
        },
      ]);
    } catch (error) {
      console.log(error,"insafsad");
      next(error);
    }
  }


  static async changeStatus(req, res, next) {
    try {
      const {id} =  req.params
      const {status} =  req.body
      let option = {
       where: {id}
      };
      await Note.update({
        status
      },option);

      let optionFind = {
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

    let detail = await Note.findByPk(id, optionFind);

      res.status(200).json([
        {
          message: "Status has been updated",
          data: detail,
        },
      ]);
    } catch (error) {
      console.log(error,"insafsad");
      next(error);
    }
  }

  static async checkReturnDates() {
    try {

      const currentDate = moment(); 
      const overdueBooks = await Note.findAll({
        where: {
          DateOfReturn: {
            [Op.lt]: currentDate, // Mengambil buku dengan returnDate yang sudah lewat
          },
          status: 'Dipinjam', // Hanya mengambil buku yang masih dalam status Dipinjam
        },
      });

      // Mengubah status buku yang melebihi tanggal pengembalian

      if (overdueBooks.length !== 0 ) {
        for (const book of overdueBooks) {
          book.status = 'Telat';
          await book.save();
        }
        console.log('Status buku diperbarui');
      }
    } catch (error) {
      console.error('Gagal memeriksa tanggal pengembalian:', error);
    }
  }
  
}

module.exports = NoteController;
