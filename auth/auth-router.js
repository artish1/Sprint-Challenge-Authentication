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
  const body = req.body;
  if (!body.username || !body.password) {
    res
      .status(400)
      .json({ message: "username and password fields are required" });
  } else {
    Users.getUserByUsername(body.username)
      .then(dbUser => {
        if (dbUser && bcrypt.compareSync(body.password, dbUser.password)) {
          const token = generateToken(dbUser);
          res
            .status(200)
            .json({ message: "Welcome, here's your token", token });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "There was an error in the server getting user by username"
        });
      });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "5h"
  };
  return jwt.sign(payload, "my fancy shmancy secret", options);
}

module.exports = router;
