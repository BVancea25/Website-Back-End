const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  fname: {
    type: String,
  },

  phone_number: {
    type: String,
    required: true,
  },

  role: {
    type: String,
  },

  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
