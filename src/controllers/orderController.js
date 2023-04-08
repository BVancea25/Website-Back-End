const Orders = require("../schemas/Orders");
const Produs = require("../schemas/Produse");

const handlePostOrder = async (req, res) => {
  const order = req.body;
  console.log(order.items);

  let hasError = false;

  if (order.items.length === 0) {
    res.status(400).json({ message: "Order needs products!!!" });
    return;
  }
  order.items.forEach((item) => {
    if (hasError === true) {
      return;
    } else if (item.productId === "") {
      hasError = true;
      res.status(400).json({ message: "Incomplete data !!!" });
      return;
    } else if (item.quantity <= 0) {
      hasError = true;
      res.status(400).json({ message: "Product needs quantity !!!" });
      return;
    } else if (item.productName === "") {
      hasError = true;
      res.status(400).json({ message: "Needs product name !!!" });
      return;
    }
  });

  if (!hasError) {
    try {
      await Orders.create(order);

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      console.log(err);
    }
  }
};

const handleGetOrders = async (req, res) => {
  try {
    const orders = await Orders.find().populate("userID");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { handlePostOrder, handleGetOrders };
