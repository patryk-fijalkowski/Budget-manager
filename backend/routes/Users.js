const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid/v4");

const fs = require("fs");
process.env.SECRET_KEY = "secret";

const checkIsUserRegister = (users, userEmail) => {
  let isRegister = false;
  for (const user in users) {
    if (users.hasOwnProperty(user)) {
      if (users[user].email === userEmail) isRegister = true;
    }
  }
  return isRegister;
};

users.post("/register", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./_dbMock/users.json").toString());

  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };

  const isRegister = checkIsUserRegister(users, userData.email);

  if (!isRegister) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      userData.password = hash;
      users[uuidv4()] = userData;
      fs.writeFileSync("./_dbMock/users.json", JSON.stringify(users));
      res.send({
        status: "success",
        message: `User ${userData.first_name} registered!`,
      });
    });
  } else {
    res.send({
      status: "error",
      message: "User already exists!",
    });
  }

  console.log("wbito na register");
});

module.exports = users;
