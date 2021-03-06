const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const logger = require("../helpers/winston");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({ msg: "there is no token in the request" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      logger.error("User is not registered in the database");
      return res.status(401).json({
        msg: "User is not registered in the database",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ msg: "invalid token" });
  }
};

module.exports = { validateJWT };
