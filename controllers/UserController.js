const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
      });
      let option = {
        attributes: {
          exclude: ["password"],
        },
    };
      let user = await User.findByPk(newUser.id, option);
      res.status(201).json([
        {
          message: "User has been created successfully",
          data: user,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password  ) throw { name: "Bad Request" };
      let user = await User.findOne({
        where: { email },
      });
      if (!user) throw { name: "authentication" };
      let isvalidPass = await comparePassword(password, user.password);
      if (!isvalidPass) throw { name: "authentication" };
      let payload = {
        id: user.id,
      };
      payload = encodedJson(payload);
      res.status(200).json([
        {
          message: "User has been logged in",
          data : {
            access_token: payload,
            id: user.id,
            email: user.email,
            role: user.role,
          }
        },
      ]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
