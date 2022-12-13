const User = require('../models/user.model');
const mongoose = require("mongoose");

//create a task to db
const createUser = async (req, res) => {
  if (req.body) {
    const user = new User(req.body);
    await user
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await User.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await (password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }

    res.status(200).json({email})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = {
    createUser,
    loginUser
};