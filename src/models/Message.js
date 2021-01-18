const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username:String,
  msg:String,
  time:String,
  ua:String,
  _id:String
})

module.exports = mongoose.model('Message',messageSchema)