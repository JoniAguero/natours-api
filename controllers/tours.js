const Tour = require('../models/tour.model');

const getTours = async (req, res) => {
  try {
    const Tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: Tours.length,
      Tours
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
    const TourSelected = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      TourSelected
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    })
  }
};

const patchTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    
  })
};

const deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    
  })
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