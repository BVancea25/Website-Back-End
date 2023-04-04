const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  latitude: {
    type: Schema.Types.Number,
    required: true,
  },

  longitude: {
    type: Schema.Types.Number,
    required: true,
  },

  addres: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
