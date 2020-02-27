const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

const signup = catchAsync(async (req, res, next) => {

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'sucess',
    token,
    data: {
      user: newUser
    }
  })
});

const login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  // 1) Check if email and password exists
  if(!email || !password) {
    next(new AppError('Please provide email and password', 400));
  }

  // 2) CHeck if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if(!user || !(await user.correctPassword(password, user.password))) {
    next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything oj, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  })

});

module.exports = {
  signup,
  login
};