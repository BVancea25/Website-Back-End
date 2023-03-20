const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produsSchema = new Schema({
  nume: {
    type: String,
    required: true,
  },

  descriere: {
    type: String,
  },

  gramaj: {
    type: String,
  },

  pret: {
    type: String,
  },

  poza: {
    type: String,
  },
});

module.exports = mongoose.model("Product", produsSchema);
