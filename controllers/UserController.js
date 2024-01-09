const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");

class AuthController {
  static async register(req, res, next) {
    try {
      // req.body
      const { username, email, password } = req.body;

      // create new User
      let newUser = await User.create({
        username,
        email,
        password,
      });

      // contional get
      let option = {
        attributes: {
          exclude: ["password"],
        },
    };
      // get user has been created
      let user = await User.findByPk(newUser.id, option);

      // response
      res.status(201).json([
        {
          message: "User has been created successfully",
          data: user,
        },
      ]);
    } catch (error) {
      // log error to index
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // req.body
      const { email, password } = req.body;

      // validation for empty email or password
      if (!email || !password  ) throw { name: "Bad Request" };

      // query findone to db
      let user = await User.findOne({
        where: { email },
      });

      // check authentication
      if (!user) throw { name: "authentication" };

      // compore password hash
      let isvalidPass = await comparePassword(password, user.password);


      // check authentication
      if (!isvalidPass) throw { name: "authentication" };

      // make paylod for token
      let payload = {
        id: user.id,
      };

      //  make token
      payload = encodedJson(payload);

      // response
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

      // log error to index
      next(error);
    }
  }
}

module.exports = AuthController;
