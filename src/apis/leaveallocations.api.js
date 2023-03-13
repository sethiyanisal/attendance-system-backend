const express = require("express");
const router = express.Router();
const leaveAllocationController = require('../controllers/leaveallocation.controller');
const requireAuth = require('./../middleware/requireAuth');

module.exports = function () {
 
  router.use(requireAuth);
  
  router.post("/leavesallocation", leaveAllocationController.leaveAllocation);
  router.get("/viewallleavesallocation", leaveAllocationController.viewAllEmpLeaveAllocations);
  router.get("/viewleaveallocationbyid/:id", leaveAllocationController.viewLeaveAllocationsById);
  router.put("/editleaveallocationbyid/:id",leaveAllocationController.editLeaveAllocationById);


 
  return router;
}