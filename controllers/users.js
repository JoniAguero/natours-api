const AppError = require('../utils/appError');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

const filterObj = (body, ...fields) => {
  const newBody = {};
  Object.keys(body).forEach(el => {
    if(fields.includes(el)) newBody[el] = body[el];
  })
  return newBody;
}

const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const getUserById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const patchUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const updateCurrentUser = catchAsync(async (req, res, next) => {

  // 1) Create error if user POSTs password data
  if(req.body.password || req.body.passwordConfirm) {
    return next(new AppError(
      'This route is not for password updates. Please use /update-password.',
      400
    ))
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true});

  res.status(200).json({
    status: 'sucess'
  })

});



module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  updateCurrentUser
}