const morgan = require('morgan');
const express = require('express');

const toursRouter = require('./routes/tours')
const usersRouter = require('./routes/users')

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port: ${port}...`)
});