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

const getTimeCardsById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
    }

  const timecards = await Timecard.find({postedBy:id})

  if (!timecards) {
    return res.status(404).json({error: 'No Time cards Added'})
  }
  
  res.status(200).send({data:timecards})
  };


  const viewAllTimeCards = async (req , res) => {
    try{
        const timecards = await Timecard.find().populate("postedBy");
       
    if(timecards){ 
        res.status(200).send({data:timecards});
    }else{
        res.status(201).send({ message: "No any time cards" }); 
    }

    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }

};

module.exports ={
    createTimeCard,
    getPunchedInTimeCardById,
    getTimeCardsById,
    viewAllTimeCards
}

