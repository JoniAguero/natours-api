/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tour.model');
const APIFeatures = require('../utils/apiFeatures');

const getTours = async (req, res) => {
  try {
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
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      tour
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
};

const patchTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      tour
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      tour
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      tour: newTour
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
};

const getTourStats = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
}

const top5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}

module.exports = {
  getTours,
  getTourById,
  patchTour,
  deleteTour,
  createTour,
  getTourStats,
  top5Cheap
}