const express = require("express");
const router = express.Router();
const leaverequestController = require('../controllers/leaverequest.controller');
const requireAuth = require('./../middleware/requireAuth');

module.exports = function () {

  router.use(requireAuth);

  router.post("/requestleave", leaverequestController.createLeaveRequest);
  router.get("/leaverequestsbyid/:id", leaverequestController.getLeaveRequestsById);
  router.get("/viewallleaverequest",leaverequestController.viewAllLeaveRequest);
  return router;
}