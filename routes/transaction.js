const express = require("express");

const MyOrders = require("../models/orders");
const router = require("express").Router();
const Cart = require("../models/cart");

/**
 * @method - POST
 * @param - /Buy Items
 * @description - buy Items from cart
 */

router.post("/buyItems", async (req, res) => {
  const { size, pizzas, extras, total, id, email } = req.body;
  try {
    let newItem = new MyOrders({
      size,
      pizzas,
      extras,
      total,
      email,
    });
    await newItem
      .save()
      .then(async (response) => {
        //Delete Item from cart after bought
        await Cart.findOneAndDelete({ _id: id }, (err, doc) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              error: 1,
              data: err,
            });
          } else {
            res.status(200).json({
              error: 0,
              data: {
                message: "Item Bought",
                cartData: response,
              },
            });
          }
        })
          .clone()
          .catch(function (err) {
            console.log(err);
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
 * @param - /myOrders
 * @description - my previous orders
 */

router.post("/myOrders", async (req, res) => {
  const { email } = req.body;
  try {
    await MyOrders.find({ email }, (err, doc) => {
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
              message: "Previous orders",
              myOrders: [doc],
            },
          });
        } else {
          res.status(200).json({
            error: 1,
            data: {
              message: "No Previous orders found",
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
