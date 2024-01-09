const express = require("express");
const router = express.Router();
const noteRoutes = require("./noteRoutes");
const userRoutes = require("./userRoutes");
const bookRoute = require("./bookRoute");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use(userRoutes);
router.use(authentication);
router.use(noteRoutes);
router.use(bookRoute);

const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message
      break;
    case "Bad Request":
      status = 400;
      message = "email / password is required";
      break;
    case "authentication":
      console.log("masuk codoe");
      status = 401;
      message = "you are not authentication";
      break;
    case "authorization":
      console.log("masuk codoe");
      status = 403;
      message = "forbidden";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "forbidden":
      status = 403;
      message = "forbidden";
      break;
    case "notFound":
      status = 404;
      message = "data is not found";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
};
router.use(errorHandler);

module.exports = router;
