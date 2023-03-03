const EmpTypeLeaves = require("../models/employeeleavetypes.model");
const mongoose = require("mongoose");

const createEmpLeaveType = async (req, res) => {
    try {
          const newempleavetype = await new EmpTypeLeaves({...req.body}).save();
          res.status(201).send({ message: "LeaveType added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  };

const viewEmpLeaveTypes = async (req , res) => {
    try{
        const empleavetypes = await EmpTypeLeaves.find()
       
    if(empleavetypes){ 
        res.json(empleavetypes);
    }else{
        res.status(201).send({ message: "No Leave requests are added" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};

module.exports = {
    createEmpLeaveType,
    viewEmpLeaveTypes,
   
  }