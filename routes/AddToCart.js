const express = require("express");

const AddToCart = require("../models/cart");
const router = require("./user");

/**
 * @method - POST
 * @param - /addToCart
 * @description - Add Items to cart
 */

router.post("/addToCart", async (req, res) => {
  const { size, pizzas, extras } = req.body;
  try {
    let newCartItem = new AddToCart({
      size,
      pizzas,
      extras,
    });
    await newCartItem
      .save()
      .then((response) => {
        res.status(200).json({
          error: 0,
          data: {
            message: "Item Added To Cart",
            cartData: response,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: 1,
          data: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 1, message: error.message });
  }
});

module.exports = router;
