const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');


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

const forgotPassword = catchAsync(async (req, res, next) => {

  // 1) Get user based on POST email
  const user = await User.findOne({ email: req.body.email })

  if(!user) {
    return next(new AppError('THere is no user with email address.', 404));
  }
  
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false })

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
  const message = `Forgot your password= Submit a PATCH reques with your new password and password confirm to ${resetURL}.\nIf you didn´t forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });
  
    res.status(200).json({
      status: 'sucess',
      message: 'Token sent to email'
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next (new AppError(
      'There was an error sending the email. Tryu again later.'),
      500
    )
  }

});

const resetPassword = catchAsync(async (req, res, next) => {

  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {$gt: Date.now()}
  });

  // 2) If token has not expired, and there is user, set the new password
  if(!user) {
    return next(new AppError('Token invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires= undefined;
  await User.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT

  const token = signToken(user._id);

  res.status(200).json({
    status: 'sucess',
    token
  });

});

module.exports = {
  signup,
  login,
  protect,
  restricTo,
  forgotPassword,
  resetPassword
};