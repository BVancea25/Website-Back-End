const User = require("../schemas/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const ACCESS_TOKEN_SECRET =
  "f0af6707d89c8e3bac7661ca428df7313afa63467ddbc4f42c13ba87de5ba0591265d4662f60c3de016f26c54691b6bed44ffa2274918b1f28c4c6ebf10dba5c";
const REFRESH_TOKEN_SECRET =
  "62525de2d4ab48dd52fe903e611319e1813fc71ba71c414aa913570cb5cd22d3351a50e9f428e46ae7e06e294aaddbea3070e637ca34e5241c34b773243757cb";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "")
    return res.status(400).json({ message: "email and password are required" });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) {
    return res.sendStatus(401); //Neautorizat
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { email: foundUser.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;

    await foundUser.save();

    const role = foundUser.role;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const loginData = { accessToken, role };

    res.json(loginData);
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
