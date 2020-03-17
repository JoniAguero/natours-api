const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.delete = Model => catchAsync(async (req, res, next) => {

  const document = await Model.findByIdAndDelete(req.params.id);

  if(!document) return next(new AppError('No document find with that ID', 404));

  res.status(200).json({
    status: 'success',
    document
  });

});

exports.update = Model => catchAsync(async (req, res, next) => {

  const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!document) return next(new AppError('No document find with that ID', 404));

  res.status(200).json({
    status: 'success',
    document
  });

});

exports.create = Model => catchAsync(async (req, res) => {

  const newDocument = await Model.create(req.body);
  res.status(200).json({
    status: 'success',
    tour: newDocument
  });
  
});

exports.getById = (Model, populateOptions) => catchAsync(async (req, res, next) => {

  let query = Model.findById(req.params.id);
  if(populateOptions) query = query.populate(populateOptions);
  const document = await query;

  if(!document) return next(new AppError('No document find with that ID', 404));

  res.status(200).json({
    status: 'success',
    document
  });

});

exports.getAll = Model => catchAsync(async (req, res) => {

  // To allow for nested GET reviews on tour
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const documents = await features.query;

  res.status(200).json({
    status: 'success',
    results: documents.length,
    documents
  });
    
});