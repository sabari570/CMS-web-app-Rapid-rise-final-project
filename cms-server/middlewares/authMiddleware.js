const jwt = require("jsonwebtoken");
const TokenBlackList = require("../models/tokenBlacklistModel.js");
require("dotenv").config();

const JWT_ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  let accessToken = "Bearer " + req.cookies.accessToken;
  accessToken = accessToken.split(" ")[1];

  //   verifying token using jwt
  if (!accessToken || accessToken === "undefined")
    return res
      .status(401)
      .json({ errors: { message: "You are not authenticated" } });

  const isBlackListed = await TokenBlackList.exists({ token: accessToken });
  if (isBlackListed)
    return res
      .status(401)
      .json({ errors: { message: "You are not authenticated" } });

  jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {
    if (err)
      return res
        .status(403)
        .json({ errors: { message: "Token is not valid" } });
    req.userId = decodedToken.id;
    next();
  });
};

module.exports = authMiddleware;
