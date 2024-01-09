'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignKey: "userId" });
      Note.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  Note.init({
    borrowingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "borrowingDate Is Required",
        },
        notNull: {
          msg: "borrowingDate Is Required",
        },
      },
    },
    DateOfReturn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "DateOfReturn Is Required",
        },
        notNull: {
          msg: "DateOfReturn Is Required",
        },
      },
    },
    status:  {
      type: DataTypes.ENUM('Dipinjam', 'Telat', 'Dikembalikan'),
      allowNull: false,
      defaultValue: 'Dipinjam', 
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId Is Required",
          },
          notNull: {
            msg: "UserId Is Required",
          },
        },
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "BookId Is Required",
          },
          notNull: {
            msg: "BookId Is Required",
          },
        },
        references: {
          model: {
            tableName: "Books",
          },
          key: "id",
        },
      },
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};