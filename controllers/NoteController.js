const { Note,User,Book } = require("../models");
const { Op } = require('sequelize');
const moment = require('moment');

class NoteController {
  static async getNotes(req, res, next) {
    try {

      // condotional
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


      // query select all notes
      let notes = await Note.findAll(option);
      res.status(200).json([
        {
          message: "Notes has been found",
          data: notes,
        },
      ]);
    } catch (error) {

      // log error
      next(error);
    }
  }


  static async changeStatus(req, res, next) {
    try {

      // get req params
      const {id} =  req.params

      // get req.body
      const {status} =  req.body


      // conditional
      let option = {
       where: {id}
      };


      // query update status note
      await Note.update({
        status
      },option);


      // conditonal
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

      // get detail status has been updated and query by id
    let detail = await Note.findByPk(id, optionFind);


    // response
      res.status(200).json([
        {
          message: "Status has been updated",
          data: detail,
        },
      ]);
    } catch (error) {

      // log error
      next(error);
    }
  }

  static async checkReturnDates() {
    try {

      // get date by local with library
      const currentDate = moment(); 

      // query all data with dateof return less that date
      const overdueBooks = await Note.findAll({
        where: {
          DateOfReturn: {
            [Op.lt]: currentDate, // Mengambil buku dengan returnDate yang sudah lewat
          },
          status: 'Dipinjam', // Hanya mengambil buku yang masih dalam status Dipinjam
        },
      });

      // Mengubah status buku yang melebihi tanggal pengembalian

      // check data note
      if (overdueBooks.length !== 0 ) {
        for (const book of overdueBooks) {

          // change status
          book.status = 'Telat';

          // save data
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
