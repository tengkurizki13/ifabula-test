const { decodedJson } = require("../helpers/webToken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.access_token) throw { name: "authentication" };
    let decoded = decodedJson(req.headers.access_token);
    console.log(decoded);
    let user = await User.findByPk(decoded.id);
    console.log(user);
    if (!user) throw { name: "authentication" };
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
