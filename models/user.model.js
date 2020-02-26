const mongoose = require('mongoose');
const validator = require('validator');

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
    validate:  [validator.isAlpha, 'User name must only contain character']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'A user must have a email'],
    validate: [validator.isEmail, 'Must valid email']
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', emailSchema);
module.exports = User;