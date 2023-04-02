const ACCESS_TOKEN_SECRET =
  "f0af6707d89c8e3bac7661ca428df7313afa63467ddbc4f42c13ba87de5ba0591265d4662f60c3de016f26c54691b6bed44ffa2274918b1f28c4c6ebf10dba5c";

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const loginHeader = req.headers["authorization"];
  if (!loginHeader) return res.sendStatus(401);

  const token = loginHeader.split(" ")[1];
  //console.log(token);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      //console.log(err);
      return res.sendStatus(403);
    } //token invalid
    req.user = decoded.email;
    next();
  });
};

module.exports = verifyJWT;
