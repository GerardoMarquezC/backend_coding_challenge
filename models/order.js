const { Schema, model } = require("mongoose");

const product = new Schema({
  name: {
    type: String,
    required: [true, "The name from product is required"],
  },
  price: {
    type: Number,
    required: [true, "The price from product is required"],
  },
  quantity: {
    type: Number,
    required: [true, "The quantity from product is required"],
  },
});

const OrderShema = Schema({
  client_name: {
    type: String,
    required: [true, "The client name is required"],
  },
  user: {
    type: String,
    required: [true, "The user is required"],
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  total_price: {
    type: Number,
    required: [true, "The total price is required"],
  },
  products: [{
    name: {
      type: String,
      required: [true, "The name from product is required"],
    },
    price: {
      type: Number,
      required: [true, "The price from product is required"],
    },
    quantity: {
      type: Number,
      required: [true, "The quantity from product is required"],
    },
  }],
});

module.exports = model("Order", OrderShema);
