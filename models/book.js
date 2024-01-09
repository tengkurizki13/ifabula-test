'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Note, { foreignKey: "bookId" });
    }
  }
  Book.init({
    title:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title Is Required",
        },
        notEmpty: {
          msg: "Title Is Required",
        },
      },
    },
    author:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Writer Is Required",
        },
        notEmpty: {
          msg: "Writer Is Required",
        },
      },
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Published Is Required",
        },
        notEmpty: {
          msg: "Published Is Required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};