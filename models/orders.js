const mongoose = require("mongoose");

const MyOrders = mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  pizzas: {
    type: Array,
    required: true,
  },
  extras: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// export model user with My orders Schema
module.exports = mongoose.model("myOrders", MyOrders);
