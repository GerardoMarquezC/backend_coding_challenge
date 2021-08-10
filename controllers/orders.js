const { response, request } = require("express");

const Order = require("../models/order");

const postOrders = async (req = request, res = response) => {
  const user = req.user.email;
  const { client_name, products, total_price } = req.body;
  const order = new Order({ client_name, user, products, total_price });
  await order.save();
  res.json({ msg: "data was saved successfully" });
};

module.exports = {
  postOrders
};