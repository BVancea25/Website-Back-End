const User = require("../schemas/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, name, fname, phone, password, refreshToken } =
    req.body.formData;

  if (email === "" || password === "")
    return res.status(400).json({ message: "email and password are required" });

  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    //parola hash+salt

    const hashedPassword = await bcrypt.hash(password, 10);

    //store user
    const result = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
      fname: fname,
      phone_number: phone,
      role: "user",
      refreshToken: refreshToken,
    });

    console.log(result);

    res.status(201).json({ succes: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleNewUser };
