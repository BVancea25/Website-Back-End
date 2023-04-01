const mongoose = require("mongoose");
const { DATA_BASE_URL } = require("../../Variables");

const connectDB = async () => {
  try {
    await mongoose.connect(DATA_BASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
