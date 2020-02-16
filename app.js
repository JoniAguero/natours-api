const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

app.get('/api/v1/tours/:id', (req, res) => {
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
})

app.patch('/api/v1/tours/:id', (req, res) => {
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
})

app.delete('/api/v1/tours/:id', (req, res) => {
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
})

app.post('/api/v1/tours', (req, res) => {

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
})

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}...`)
})