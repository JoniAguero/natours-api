const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.delete = Model => catchAsync(async (req, res, next) => {

  const document = await Model.findByIdAndDelete(req.params.id);

  if(!document) return next(new AppError('No document find with that ID', 404));

  res.status(200).json({
    status: 'success',
    document
  });

});