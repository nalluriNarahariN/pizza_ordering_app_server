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
    // check for validation of emil, password
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
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: 2, message: "User Already Exists" });
      } else {
        let newUser = new User({
          firstName,
          lastName,
          email,
          //   password:password,
          contactNumber,
          country,
        });

        const salt = await bcrypt.genSalt(12);
        newUser.password = await bcrypt.hash(password, salt);
        console.log(newUser);
        await newUser
          .save()
          .then((response) => {
            console.log(response);
            res.status(200).json({
              error: 0,
              data: {
                message: "User added to db",
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
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 1, message: error.message });
    }
  }
);

module.exports = router;
