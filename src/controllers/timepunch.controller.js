const Timecard = require("./../models/timepunch.model");
const User = require("./../models/user.model");
const mongoose = require("mongoose");

const createTimeCard = async (req, res) => {
    try {
          const newTimecard = await new Timecard({...req.body,postedBy:req.user}).save();
          res.status(201).send({ message: "Time card added successfully" });
  
      } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
      }
};

module.exports ={
    createTimeCard
}

