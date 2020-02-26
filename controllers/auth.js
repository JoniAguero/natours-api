const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signup = catchAsync(async (req, res, next) => {

  const newUser = await User.create(req.body);

  if(newUser === undefined) return next(new AppError('Error', 404));

  res.status(201).json({
    status: 'sucess',
    data: {
      user: newUser
    }
  })
});

module.exports = {
  signup
};