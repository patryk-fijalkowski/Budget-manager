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
  let registerUserData = {};
  users.map((user) => {
    if (user.email === userEmail) {
      isRegister = true;
      registerUserData = user;
    }
  });
  return { isRegister, registerUserData };
};
const usersAccounts = JSON.parse(
  fs.readFileSync("./_dbMock/users.json").toString()
);

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };

  const { isRegister } = checkIsUserRegister(usersAccounts, req.body.email);

  if (!isRegister) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      userData.password = hash;
      userData.id = uuidv4();
      usersAccounts.push(userData);
      fs.writeFileSync("./_dbMock/users.json", JSON.stringify(usersAccounts));
      res.send({
        message: `User ${userData.first_name} registered!`,
      });
    });
  } else {
    res.send({
      message: "User already exists!",
    });
  }
});

users.post("/login", (req, res) => {
  const { isRegister, registerUserData: user } = checkIsUserRegister(
    usersAccounts,
    req.body.email
  );
  if (isRegister) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 1440,
      });
      res.send(token);
    } else {
      res.send({
        message: "User does not exist",
      });
    }
  }
});

module.exports = users;
