const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`));

const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
};

const getTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const patchTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const createTour = (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/../dev-data/data/tours.json`, JSON.stringify(tours), err => {
    res.status
  })
  res.status(200).json({
    status: 'success',
    tour: newTour
  })
};

const checkIfExists = (req, res, next, val) => {
  const tour = tours.find(el => el.id === val);
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'Invalid ID'
      }
    })
  }
  next();
};

module.exports = {
  getTours,
  getTourById,
  patchTour,
  deleteTour,
  createTour,
  checkIfExists
}