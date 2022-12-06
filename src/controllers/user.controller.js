const Task = require('../models/user.model');
const mongoose = require("mongoose");
//create a task to db
const createTask = async (req, res) => {
  if (req.body) {
    const task = new Task(req.body);
    await task
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const getAllTasks = async (req, res) => {
    //use populate to get data from other collection.
    await Task.find({})
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  };

module.exports = {
    createTask,
    getAllTasks
};