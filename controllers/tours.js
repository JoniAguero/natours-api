/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tour.model');

const getTours = async (req, res) => {
  try {
    // Filtering
    const queryFilters = { ...req.query };
    const exludeFields = ['page', 'sort', 'limit', 'fields'];
    exludeFields.forEach(elem => delete queryFilters[elem]);

    // Advances Filtering
    let queryStr = JSON.stringify(queryFilters);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // Sorting

    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt')
    }

    // Field Limiting

    if(req.query.fields) {
      const fieldBy = req.query.fields.split(',').join(' ');
      query = query.select(fieldBy);
    } else {
      query = query.select('-__v')
    }

    // Pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute Query
    const tours = await query;

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

module.exports = {
  getTours,
  getTourById,
  patchTour,
  deleteTour,
  createTour
}