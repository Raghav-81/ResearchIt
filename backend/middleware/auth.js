const jwt = require("jsonwebtoken");
require('dotenv').config({path: "../.env"})
const auth = (req, res, next) => {
  try {
    var token = req.header("x-auth-token");
    if (!token)
      var token = req.query.token
      if(!token)
        return res
          .status(401)
          .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;