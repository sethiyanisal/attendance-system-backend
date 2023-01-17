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

  const getUserDetailsById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
    }

  const user = await User.findOne({_id:id})

  res.status(200).send({data:user})
  };



  module.exports = {
    createLeaveRequest,
    getLeaveRequestsById,
    getUserDetailsById
  }