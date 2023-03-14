const User = require('../models/user.model');
const LeaveAllocation = require('../models/leaveallocation.model');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
};

//Sign up a user
const createUser = async (req, res) => {
  try {
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newuser = await new User({ ...req.body, password: hashPassword }).save();
    const token = createToken(newuser._id);
		res.status(201).send({ message: "User registered successfully", token });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
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
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }

    const token = createToken(user._id)
    const id = user._id;
    const role = user.userRole;
    res.status(200).json({email, token, id, role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

const getAllUsers = async (req, res) => {
  try{
    const allusers = await User.find()
   
if(allusers){ 
    res.json(allusers);
}else{
    res.status(201).send({ message: "No users are added" }); 
}

}catch(error){
    res.status(500).send({ message: "Internal Server Error" });
}

};

const getAllEmployees = async (req, res) => {
  try{
    const allusers = await User.find({userRole:2080});
    res.status(200).send({data:allusers, message:"users found successfully"})

  }catch(err){
    res.status(500).send({ err: "Internal Server Error" });
  }
}


module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getAllEmployees
};