const mongoose = require("mongoose");

const leavesallocationSchema = new mongoose.Schema({
    annualleaves: { type: Number, required: true },
    casualleaves: { type: Number, required: true },
    bdayleaves: { type: Number, required: true },
    pdleaves: { type: Number, required: true },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"users"}
  
  });

const LeaveAllocation = mongoose.model("leavesallocation", leavesallocationSchema);

module.exports = LeaveAllocation;