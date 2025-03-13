const mongoose = require('mongoose');

//define foodSchema first
const foodSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  }
})
//embed foodSchema INSIDE userSchema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]//embed foodSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
