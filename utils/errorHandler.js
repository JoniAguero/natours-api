/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('./appError');

module.exports = (err, req, res, next) => {

  const handleCastErrorDB = (error) => {
    console.log(error);
    
    const message = `Invalid ${error.path}: ${error.value}.`;
    return new AppError(message, 400);
  }

  const errorDev = () => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  const errorProd = () => {
    if(err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR ', err)
      res.status(err.statusCode).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }

  const handleErrorDB = fn => {
    const error = { ...err };
    if(error.name === 'CastError') {
      handleCastErrorDB(error);
    } else {
      fn();
    } 
  }

  if(process.env.NODE_ENV === 'development') {
    handleErrorDB(errorDev);
  } else if(process.env.NODE_ENV === 'production') {
    handleErrorDB(errorProd);
  }
}