const mongoose = require("mongoose");

const timepunchSchema = new mongoose.Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    timeIn: { type: String, required: true },
    timeOut: { type: String, required: false },
    totalHours: { type: String, required: false },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"users"}
  });

const TimePunch = mongoose.model("timecards", timepunchSchema);

module.exports = TimePunch;