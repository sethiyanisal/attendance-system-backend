const mongoose = require("mongoose");

const timepunchSchema = new mongoose.Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    timeIn: { type: String, required: true },
    timeOut: { type: String, required: true },
    totalHours: { type: String, required: true },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"users"}
  });

const TimePunch = mongoose.model("timecards", timepunchSchema);

module.exports = TimePunch;