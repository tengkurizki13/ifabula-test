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
      validate: {
        notNull: {
          msg: "Password Is Required",
        },
        notEmpty: {
          msg: "Password Is Required",
        },
        len: {
          args: 8,
          msg: "Minimum password length is 8 word",
        },
        isAlphanumeric: {
          msg: 'Passwords may only consist of alphanumeric characters.',
        },
        hasUpperCase(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password harus mengandung setidaknya 1 huruf kapital.');
          }
        },
        hasNoSpecialChars(value) {
          if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            throw new Error('Password tidak boleh mengandung karakter khusus.');
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

  User.afterCreate((user, option) => {
    // user.password = hashPassword(user.password);
    delete user.password
    console.log(user.password,"after");
  });
  return User;
};