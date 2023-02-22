const express = require("express");
const router = express.Router();
const TimepunchController = require('../controllers/timepunch.controller');
const requireAuth = require('./../middleware/requireAuth');

module.exports = function () {

  router.use(requireAuth);

  router.post("/addtimecard", TimepunchController.createTimeCard);
  router.put("/edittimecard/:id", TimepunchController.getPunchedInTimeCardById);
 
  
  return router;
}