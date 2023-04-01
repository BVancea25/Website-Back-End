const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  adresa: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
