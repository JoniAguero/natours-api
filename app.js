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

const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const getUserById = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'User not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const patchUser = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'User not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const deleteUser = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'User not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const createUser = (req, res) => {
  const newId = tours.length + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  tours.push(newUser);
  fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), err => {
    res.status
  })
  res.status(200).json({
    status: 'success',
    message: 'TO-DO'
  })
};

app.route('/api/v1/tours')
  .get(getTours)
  .post(createTour)

app.route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(patchTour)
  .delete(deleteTour)

app.route('/api/v1/users')
  .get(getUsers)
  .post(createUser)

app.route('/api/v1/users/:id')
  .get(getUserById)
  .patch(patchUser)
  .delete(deleteUser)

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}...`)
});