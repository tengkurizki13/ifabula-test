const authorization = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") throw { name: "authorization" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
