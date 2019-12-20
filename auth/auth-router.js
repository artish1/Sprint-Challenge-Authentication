const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/user-model");

router.post("/register", (req, res) => {
  const body = req.body;
  if (!body.username || !body.password) {
    res
      .status(400)
      .json({ message: "username and password fields are required" });
  } else {
    const hashedPass = bcrypt.hashSync(body.password, 8);

    Users.add({ username: body.username, password: hashedPass })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(err => {
        console.log("There was an error", err);
        res.status(500).json({ message: "There was an error saving the user" });
      });
  }
  // implement registration
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
