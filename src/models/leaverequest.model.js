const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    leavetype: { type: String, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, required: true },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"users"}
  });

const Leave = mongoose.model("leaverequests", leaveSchema);

module.exports = Leave;