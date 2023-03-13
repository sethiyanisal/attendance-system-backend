const User = require("./../models/user.model");
const mongoose = require("mongoose");
const LeaveAllocation = require('../models/leaveallocation.model');

//Function to Create Default Employee Type Leave Allocation


  //Allocate leaves when registering
const leaveAllocation = async (req, res) => {
    try {
          const newleavesallocation = await new LeaveAllocation({...req.body,postedBy:req.user}).save();
          res.status(201).send({ message: "Leave allocation added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  };
const viewAllEmpLeaveAllocations = async (req , res) => {
    try{
        const allallocations = await LeaveAllocation.find().populate("postedBy");
       
    if(allallocations){ 
        res.json(allallocations);
    }else{
        res.status(201).send({ message: "No Leave Allocations are added" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};
const viewLeaveAllocationsById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such leave allocation'})
    }

  const leaveallocation = await LeaveAllocation.findOne({_id:id}).populate("postedBy");

  if (!leaveallocation) {
    return res.status(404).json({error: 'No such leave'})
  }
  
  res.status(200).send({data:leaveallocation})
  };

  const editLeaveAllocationById = async (req, res) => {
    const { id } = req.params
    const {annualleaves,casualleaves,bdayleaves,pdleaves} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such leave'})
    }
    
    LeaveAllocation.updateOne({_id:id}, 
      {annualleaves:annualleaves,casualleaves:casualleaves,bdayleaves:bdayleaves,pdleaves:pdleaves}, function (err) {
      if (err){
        res.status(500).send({ message: "Internal Server Error" });
      }
      else{
        res.status(201).send({ message: "Leave Allocation updated successfully" });
      }
  });
  };
module.exports = {
   
    leaveAllocation,
    viewAllEmpLeaveAllocations,
    viewLeaveAllocationsById,
    editLeaveAllocationById
    
  }