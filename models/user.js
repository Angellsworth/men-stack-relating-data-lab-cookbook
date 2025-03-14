const mongoose = require('mongoose');

//define foodSchema first
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 } // New field for tracking amount
});
//embed foodSchema INSIDE userSchema
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  pantry: [foodSchema],//embed foodSchema
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
