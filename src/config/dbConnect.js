const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:nerfnerf2@cluster0.cujofjz.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
