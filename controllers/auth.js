const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

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