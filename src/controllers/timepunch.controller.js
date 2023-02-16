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
        const updateID = await Timecard.find({dateOut:null, postedBy:id});
        if(updateID){
            console.log(req.body.dateOut);
            Timecard.updateOne({id:updateID.id}, {dateOut:req.body.dateOut});
            res.status(201).send({ message: "Time card found", updateID });
        }
    }catch(error){
        res.status(500).send({ error });
    }

    // try{
        
    //     res.status(201).send({ message: "Time card updated successfully" });
    // }catch(error){
    //     res.status(500).send({ message: "Internal Server Error" });
    // }
    
};

module.exports ={
    createTimeCard,
    getPunchedInTimeCardById
}

