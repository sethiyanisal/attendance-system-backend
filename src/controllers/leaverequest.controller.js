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

 
const viewLeaveRequest = async (req, res) => {
    try{
        const leave = await Leave.findOne({postedBy:req.user});
      
    if(leave){
        res.json(leave);
    }else{
        res.status(201).send({ message: "No Leave requests are added by you" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};

const viewAllLeaveRequest = async (res) => {
    try{
        const leave = await Leave.find();
       
    if(leave){ 
        res.json(leave);
    }else{
        res.status(201).send({ message: "No Leave requests are added" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};

module.exports ={
    createLeaveRequest,
    viewLeaveRequest,
    viewAllLeaveRequest,
}