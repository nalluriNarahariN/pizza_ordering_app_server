const mongoose = require("mongoose");

const Items = mongoose.Schema({
  veg: {
    type: Array,
    required: true,
  },
  nonVeg: {
    type: Array,
    required: true,
  },
  extras: {
    type: Array,
    unique: true,
    required: true,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("items", Items);
