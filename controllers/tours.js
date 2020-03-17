/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tour.model');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getTours = catchAsync(async (req, res) => {

  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    tours
  });
    
});

exports.getTourById = catchAsync(async (req, res, next) => {

  const tour = await Tour.findById(req.params.id).populate('reviews');

  if(!tour) return next(new AppError('No tour find with that ID', 404));

  res.status(200).json({
    status: 'success',
    tour
  });

});

exports.patchTour = catchAsync(async (req, res, next) => {

  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!tour) return next(new AppError('No tour find with that ID', 404));

  res.status(200).json({
    status: 'success',
    tour
  });

});

exports.deleteTour = factory.delete(Tour);

exports.createTour = catchAsync(async (req, res) => {

  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: 'success',
    tour: newTour
  })
  
});

exports.getTourStats = catchAsync(async (req, res) => {

  const stats = await Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: '$difficulty',
        numTours:    { $sum: 1},
        numRatings:  { $sum: '$ratingQuantity'},
        avgRating:   { $avg: '$ratingAverage' },
        avgPice:     { $avg: '$price' },
        minPrice:    { $min: '$price' },
        maxPrice:    { $max: '$price' }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: stats
  })
  
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {

  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind:  '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStars: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numToursStars: -1 }
    },
    {
      $limit: 6 
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: plan
  })
  
});

exports.top5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}
