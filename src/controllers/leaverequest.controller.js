const Leave = require("./../models/leaverequest.model");
const User = require("./../models/user.model");
const mongoose = require("mongoose");

const createLeaveRequest = async (req, res) => {
    try {
          const newleave = await new Leave({...req.body,postedBy:req.user}).save();
          res.status(201).send({ message: "Leave request added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  };

  const getLeaveRequestsById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
    }

  const leave = await Leave.find({postedBy:id})

  if (!leave) {
    return res.status(404).json({error: 'No such leave'})
  }
  
  res.status(200).send({data:leave})
  };

  const viewLeaveRequestsById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such leave'})
    }

  const leave = await Leave.findOne({_id:id}).populate("postedBy");

  if (!leave) {
    return res.status(404).json({error: 'No such leave'})
  }
  
  res.status(200).send({data:leave})
  };


  const editLeaveRequestsById = async (req, res) => {
    const { id } = req.params
    const {status} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such leave'})
    }
    
    Leave.updateOne({_id:id}, 
      {status:status}, function (err) {
      if (err){
        res.status(500).send({ message: "Internal Server Error" });
      }
      else{
        res.status(201).send({ message: "Leave request status updated successfully" });
      }
  });
  };

  const getUserDetailsById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
    }

  const user = await User.findOne({_id:id})

  res.status(200).send({data:user})
  };


  const viewAllLeaveRequest = async (req , res) => {
    try{
        const allleave = await Leave.find().populate("postedBy");
       
    if(allleave){ 
        res.json(allleave);
    }else{
        res.status(201).send({ message: "No Leave requests are added" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};


  module.exports = {
    createLeaveRequest,
    getLeaveRequestsById,
    getUserDetailsById,
    viewAllLeaveRequest,
    viewLeaveRequestsById,
    editLeaveRequestsById
  }