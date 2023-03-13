const express = require("express");
const router = express.Router();
const employeeleavetypesController = require('../controllers/employeeleavetypes.controller');
const requireAuth = require('./../middleware/requireAuth');

module.exports = function () {
  router.get("/viewemployeeleavetypes", employeeleavetypesController.viewEmpLeaveTypes);
  router.get("/getemployeetypeleaves/:id", employeeleavetypesController.getEmpTypeLeavesById);
  router.use(requireAuth); 
  router.post("/addemployeeleavetypes", employeeleavetypesController.createEmpLeaveType);

 
  return router;
}