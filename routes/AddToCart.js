const express = require("express");

const AddToCart = require("../models/cart");
const router = require("express").Router();

/**
 * @method - POST
 * @param - /addToCart
 * @description - Add Items to cart
 */

router.post("/addToCart", async (req, res) => {
  const { size, pizzas, extras, email } = req.body;
  try {
    let newCartItem = new AddToCart({
      size,
      pizzas,
      extras,
      email,
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

/**
 * @method - POST
 * @param - /getCartItems
 * @description - Get cart items
 */

router.post("/getCartItems", async (req, res) => {
  const { email } = req.body;
  try {
    await AddToCart.findOne({ email }, (err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error: 1,
          data: err,
        });
      } else {
        if (doc) {
          res.status(200).json({
            error: 0,
            data: {
              message: "Cart Items",
              myOrders: [doc],
            },
          });
        } else {
          res.status(200).json({
            error: 1,
            data: {
              message: "No items in cart",
              myOrders: [],
            },
          });
        }
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 1, message: error.message });
  }
});

module.exports = router;
