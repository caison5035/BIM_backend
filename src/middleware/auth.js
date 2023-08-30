const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const config = require("./../config/config");

const verifyToken = (req, res, next) => {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send("A token is required for authentication");
  }
  token = token.replace(/Bearer /g, "");
  try {

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;