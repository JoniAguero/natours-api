const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

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
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'Tour not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const patchTour = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'Tour not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const deleteTour = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'Tour not found'
      }
    })
  }
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
  fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), err => {
    res.status
  })
  res.status(200).json({
    status: 'success',
    tour: newTour
  })
};

app.route('/api/v1/tours')
  .get(getTours)
  .post(createTour)

app.route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(patchTour)
  .delete(deleteTour)

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}...`)
});