const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');   
const { dbConnect } = require("./src/config/dbConnect");

//import APIs
const UserApi = require('./src/apis/user.api');
const LeaveApi = require('./src/apis/leaverequest.api');
const TimePunchApi = require('./src/apis/timepunch.api');
// const categoryAPI = require('./src/api/category.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4445;

//root route
app.route('/').get((req, res) => {
  res.send('Attendance System - OnTime');
});

//register router - CHANGEABLE
app.use('/', UserApi());
app.use('/user', LeaveApi());
app.use('/user', TimePunchApi());
// app.use('/category', categoryAPI());

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is up and running on PORT ${PORT}`);
});