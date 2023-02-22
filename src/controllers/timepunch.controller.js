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

const getPunchedInTimeCardById = async (req, res) => {
    const { id } = req.params
    try{
        const timecard =await Timecard.findOne({dateOut:null, postedBy:id});
        if(timecard){
            const updateID = timecard.id;
            Timecard.findByIdAndUpdate(updateID, {$set: {dateOut:req.body.dateOut}}, function (err) {
                if (err){
                  res.status(500).send({ message: "Internal Server Error" });
                }
                else{
                  res.status(201).send({ message: "Time card updated successfully" });
                }}); 
        }else{
            res.status(500).send({ message: "No such time card" });
        }
    }catch(err){
        res.status(500).send({ err });
    }
    
};

module.exports ={
    createTimeCard,
    getPunchedInTimeCardById
}

