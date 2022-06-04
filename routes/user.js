const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");
const router = require("express").Router();

/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */

router.post(
  "/register",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //check for validation of emil, password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 2, errors: errors.array() });
    }
    const { firstName, lastName, email, password, contactNumber, country } =
      req.body;

    try {
      // check if user exists in db
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res
          .status(400)
          .json({ error: 2, message: "User Already Exists" });
      }

      user = new User({
        firstName,
        lastName,
        email,
        hashPassword,
        contactNumber,
        country,
      });
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);

      await user
        .save()
        .then((response) => {
          console.log(response);
          res.status(200).json({
            error: 0,
            data: {
              message: "User added db",
              userData: response,
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
    } catch (error) {}
  }
);

module.exports = router;
