const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fristName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
