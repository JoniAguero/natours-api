const morgan = require('morgan');
const express = require('express');

const AppError = require('./utils/appError');
const errorHandler = require('./utils/errorHandler');

const authRouter = require('./routes/auth');
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
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {

  // Creamos AppError para actuar cómo middleware

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

});

app.use(errorHandler);

module.exports = app;
