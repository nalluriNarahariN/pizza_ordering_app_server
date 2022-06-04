const express = require("express");

const Items = require("../models/items");
const router = require("express").Router();

/**
 * @method - POST
 * @param - /addItems
 * @description - Add Items to Inventory
 */

router.post("/addToInventory", async (req, res) => {
  const { veg, nonVeg, extras } = req.body;
  try {
    let newItem = new Items({
      veg,
      nonVeg,
      extras,
    });
    await newItem
      .save()
      .then((response) => {
        res.status(200).json({
          error: 0,
          data: {
            message: "Item Added To Inventory",
            inventory: response,
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
 * @method - GET
 * @param - /getInventoryItems
 * @description - Get inventory items
 */

router.get("/getInventoryItems", async (req, res) => {
  try {
    await Items.find({}, (err, doc) => {
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
              message: "Inventory Items",
              myOrders: doc,
            },
          });
        } else {
          res.status(200).json({
            error: 1,
            data: {
              message: "No items in inventory",
              myOrders: doc,
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
