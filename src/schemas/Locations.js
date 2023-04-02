const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  latitude: {
    type: String,
    required: true,
  },

  longitude: {
    type: String,
    required: true,
  },

  addres: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
