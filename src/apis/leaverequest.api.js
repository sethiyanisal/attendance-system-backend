const express = require("express");
const router = express.Router();
const leaverequestController = require('../controllers/leaverequest.controller');
const requireAuth = require('./../middleware/requireAuth');

module.exports = function () {

  router.use(requireAuth);

  router.post("/requestleave", leaverequestController.createLeaveRequest);
  router.get("/leaverequestsbyid/:id", leaverequestController.getLeaveRequestsById);
  router.get("/userdetailsbyid/:id", leaverequestController.getUserDetailsById);
  router.get("/viewallleaverequest",leaverequestController.viewAllLeaveRequest);
  router.get("/viewleaverequestbyid/:id",leaverequestController.viewLeaveRequestsById);
  router.put("/editleaverequestbyid/:id",leaverequestController.editLeaveRequestsById);
  return router;
}