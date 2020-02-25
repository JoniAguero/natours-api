const morgan = require('morgan');
const express = require('express');

const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

const app = express();
// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {

  const err = new Error(`Can't find ${req.originalUrl} on this server!`)
  err.status = 'fail';
  err.statusCode = 404;

  next(err);

});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
