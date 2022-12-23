const Leave = require("./../models/leaverequest.model");
const mongoose = require("mongoose");

const createLeaveRequest = async (req, res) => {
    try {
          const newleave = await new Leave({...req.body,postedBy:req.user}).save();
          res.status(201).send({ message: "Leave request added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
  };

  module.exports = {
    createLeaveRequest,
  }