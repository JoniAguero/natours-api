/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tour.model');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getTours = factory.getAll(Tour);

exports.getTourById = factory.getById(Tour, { path: 'reviews' })

exports.updateTour = factory.update(Tour);

exports.deleteTour = factory.delete(Tour);

exports.createTour = factory.create(Tour);

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
