const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET =
  "f0af6707d89c8e3bac7661ca428df7313afa63467ddbc4f42c13ba87de5ba0591265d4662f60c3de016f26c54691b6bed44ffa2274918b1f28c4c6ebf10dba5c";
const REFRESH_TOKEN_SECRET =
  "62525de2d4ab48dd52fe903e611319e1813fc71ba71c414aa913570cb5cd22d3351a50e9f428e46ae7e06e294aaddbea3070e637ca34e5241c34b773243757cb";

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  console.log(req);
  if (!cookies?.jwt) {
    //daca avem cookie-uri verificam daca au proprietatea jwt
    console.log(cookies);
    return res.sendStatus(401);
  }

  //console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  if (!foundUser) {
    console.log("ceva");
    return res.sendStatus(401); //Neautorizat
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { email: decoded.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "45s" }
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefresh };
