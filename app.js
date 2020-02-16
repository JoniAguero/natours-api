const fs = require('fs');
const express = require('express');
const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

app.get('/', (req, res) => {
  res.status(200)
  res.json({message: 'Hi from the server side'})
})

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}...`)
})