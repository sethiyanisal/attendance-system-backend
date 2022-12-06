const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  contactno: { type: String, required: true },
  password: { type: String, required: true }
},
{ timestamps: true });

const Task = mongoose.model("users", TaskSchema);

module.exports = Task;