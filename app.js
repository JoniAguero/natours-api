const morgan = require('morgan');
const express = require('express');

const toursRouter = require('./routes/tours')
const usersRouter = require('./routes/users')

const app = express();
// MIDDLEWARES
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;