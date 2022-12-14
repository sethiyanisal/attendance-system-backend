const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = function () {
  router.post("/register", userController.createUser);
  router.post("/", userController.loginUser);
  
  return router;
}