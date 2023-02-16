const mongoose = require("mongoose");

const timepunchSchema = new mongoose.Schema({
    dateIn: { type: String, required: false },
    dateOut: { type: String, required: false },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"users"}
  });

const Timecard = mongoose.model("timecards", timepunchSchema);

module.exports = Timecard;