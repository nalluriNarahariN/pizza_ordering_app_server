const mongoose = require("mongoose");

const AddCartSchema = mongoose.Schema({
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
});

// export model user with Cart Items Schema
module.exports = mongoose.model("cartItems", AddCartSchema);
