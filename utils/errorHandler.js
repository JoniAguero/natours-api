/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('./appError');

module.exports = (err, req, res, next) => {

  const handleCastErrorDB = (error, fn) => {
    const message = `Invalid ${error.path}: ${error.value}.`;
    fn(new AppError(message, 400));
  }

  const handleDuplicateFieldsDB = (error, fn) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/);
    const message = `Duplicate field value: ${value}. Please use another value`;
    fn(new AppError(message, 400));
  }

  const handleValidationErrorDB = (error, fn) => {
    const errors = Object.values(error.errors).map(item => item.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    fn(new AppError(message, 400));
  }

  const handleJWTError = (error, fn) => {
    const message = `Invalid token. Please log in again!`;
    fn(new AppError(message, 401));
  }

  const errorDev = (error) => {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: err.stack
    });
  }

  const errorProd = (error) => {
    if(error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    } else {
      console.error('ERROR ', error)
      res.status(error.statusCode).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }

  const handleErrorDB = fn => {
    const error = { ...err };
    if(error.name === 'CastError') {
      handleCastErrorDB(error, fn);
    } else if(error.status === 11000) {
      handleDuplicateFieldsDB(error, fn)
    } else if(error.name === 'ValidationError') {
      handleValidationErrorDB(error, fn);
    } else if(error.name === 'JsonWebTokenError') {
      handleJWTError(error, fn);
    }
  }

  if(process.env.NODE_ENV === 'development') {
    handleErrorDB(errorDev);
  } else if(process.env.NODE_ENV === 'production') {
    handleErrorDB(errorProd);
  }
}