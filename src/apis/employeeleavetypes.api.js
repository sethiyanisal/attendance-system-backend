const express = require("express");
const router = express.Router();
const employeeleavetypesController = require('../controllers/employeeleavetypes.controller');
const requireAuth = require('./../middleware/requireAuth');

module.exports = function () {

  router.use(requireAuth);
  router.post("/addemployeeleavetypes", employeeleavetypesController.createEmpLeaveType);
  router.get("/viewemployeeleavetypes", employeeleavetypesController.viewEmpLeaveTypes);
 
  return router;
}