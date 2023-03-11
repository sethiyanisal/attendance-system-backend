const EmpTypeLeaves = require("../models/employeeleavetypes.model");
const User = require("./../models/user.model");
const mongoose = require("mongoose");
const LeaveAllocation = require('../models/leaveallocation.model');

//Function to Create Default Employee Type Leave Allocation
const createEmpLeaveType = async (req, res) => {
    try {
          const newempleavetype = await new EmpTypeLeaves({...req.body}).save();
          res.status(201).send({ message: "LeaveType added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  };
//Function to get All Default Employee Type and Leave Allocations
const viewEmpLeaveTypes = async (req , res) => {
    try{
        const empleavetypes = await EmpTypeLeaves.find()
       
    if(empleavetypes){ 
        res.json(empleavetypes);
    }else{
        res.status(201).send({ message: "No Employee Leave types are added" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};
//Function to get  Default Employee Type and Leave Allocations By type
const getEmpTypeLeavesById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such employee type'})
    }

  const empleavetypes = await EmpTypeLeaves.findOne({_id:id})

  if (!empleavetypes) {
    return res.status(404).json({error: 'No such employee types'})
  }
  
  res.status(200).send({data:empleavetypes})
  };

const leaveAllocation = async (req, res) => {
    try {
          const newleavesallocation = await new LeaveAllocation({...req.body,postedBy:req.user}).save();
          res.status(201).send({ message: "Leave allocation added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  };

module.exports = {
    createEmpLeaveType,
    viewEmpLeaveTypes,
    leaveAllocation,
    getEmpTypeLeavesById
  }