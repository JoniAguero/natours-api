/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tour.model');

const getTours = async (req, res) => {
  try {
    // 1) Filtering
    const queryFilters = { ...req.query };
    const exludeFields = ['page', 'sort', 'limit', 'fields'];
    exludeFields.forEach(elem => delete queryFilters[elem]);

    // 2) Advances Filtering
    let queryStr = JSON.stringify(queryFilters);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));

    // 3) Execute Query
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