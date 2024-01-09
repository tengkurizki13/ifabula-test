'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Note, { foreignKey: "userId" });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email Must Be Unique",
      },
      validate: {
        notEmpty: {
          msg: "Email Is Required",
        },
        notNull: {
          msg: "Email Is Required",
        },
        isEmail: {
          msg: "Format Email Is Wrong",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username Is Required",
        },
        notEmpty: {
          msg: "Username Is Required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true,
      validate: {
        notNull: {
          msg: "Password Is Required",
        },
        notEmpty: {
          msg: "Password Is Required",
        },
        len: {
          args: 8,
          msg: "The password minimum character password is 8 characters",
        },
        isAlphanumeric: {
          msg: 'The password must contain only letters and numbers.',
        },
        combinationChar(value) {
          if (!/[a-z]/.test(value) || !/[0-9]/.test(value)) {
            throw new Error('The password must be a combination of numbers and letters');
          }
        },
        hasUpperCase(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error('The password must contain at least 1 capital letter.');
          }
        },
        hasNoSpecialChars(value) {
          if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            throw new Error('The password must not contain special characters.');
          }
        },
      
      },
    },
    role:  {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user', 
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });

  return User;
};