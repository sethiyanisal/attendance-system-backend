const mongoose = require("mongoose");

const employeetypeSchema = new mongoose.Schema({
    employeetype: { type: String, required: true },
    annualleaves: { type: Number, required: true },
    casualleaves: { type: Number, required: true },
    bdayleaves: { type: Number, required: true },
    pdleaves: { type: Number, required: true },
  
  });

const EmpTypeLeaves = mongoose.model("emptypeleaves", employeetypeSchema);

module.exports = EmpTypeLeaves;