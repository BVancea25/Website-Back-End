const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
