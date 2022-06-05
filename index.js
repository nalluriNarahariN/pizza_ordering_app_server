const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv/config");
const user = require("./routes/user");
const cart = require("./routes/AddToCart");
const transaction = require("./routes/transaction");
const inventory = require("./routes/Items");

//----------------------------------------------
const app = express();
//----------------------------------------------

// Establishing connection with MongoDB

var options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_CONNECTION_STRING, options, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

//----------------------------------------------

app.use(express.json());
app.use(cors());
// Routes
app.use("/user", user);
app.use("/cart", cart);
app.use("/transaction", transaction);
app.use("/items", inventory);

//----------------------------------------------

//Testing
app.get("/", (req, res) => {
  res.send("Hello World !!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
