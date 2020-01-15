const config = require("config");
const jwt = require("jsonwebtoken");
const Response = require("../helpers");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return Response(res, { message: "No token, authorization denied." }, 401);
  try {
    const decoded = jwt.verify(token, config.get("JwtSecret"));
    req.user = decoded;
    next();
  } catch (err) {
    Response(res, { message: "Token is not valid." }, 400);
  }
}

module.exports = auth;
