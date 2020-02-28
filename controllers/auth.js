const { promisify } = require('util');
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

const protect = catchAsync(async (req, res, next) => {

  let token;

  // 1) Getting token and check of it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 400)
    )
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify(token, process.env.JWT_SECRET));

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id)
  if(!freshUser) {
    return next(
      new AppError('This user belonging to this token does no longer exists.', 401)
    )
  }

  // 4) Check if user changed password after the token was issued

  if(freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recentrly changed password! Please log in agaian.', 401)
    )
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();

});

const restricTo = (...roles) => {

  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission.', 403));
    }
    next();
  }
};

module.exports = {
  signup,
  login,
  protect,
  restricTo
};