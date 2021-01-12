const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username:String,
  password:String,
  _id:String
})

module.exports = mongoose.model('User',usersSchema)