import chalk from 'chalk';
import ErrorResponse from '../utils/errorResponse.js';

const notFound = (req, res, next) => {
  console.log(chalk.red('Not Found - 404 Error'));
  //no specified rout meaning all server requests will pass through this code! if the code above was not resolved
  const error = new Error(`Not Found ${req.originalUrl}`); //req.originalUrl=> is the url the user entered
  res.status(404);
  next(error);
};

// ERROR HANDLER MIDDLEWARE - handle all the next(error)
const errorsHandler = (err, req, res, next) => {
  // log to console for dev ---------------------------------
  // console.log(err);
  console.log(chalk.yellow(`${err.name} - ${err.message}`));

  let error = { ...err };
  //console.log(error);

  // Add property 'message' to error
  error.message = err.message;

  // Mongoose Invalid ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found due to Invalid ObjectId -> ${err.value}`;
    error = new ErrorResponse(message, 404); // ErrorResponse is custom ErrorResponse Class Extended from Error Interface
  }

  // Mongoose duplicate key (MongoError)
  if (error.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Response to client
  res.status(error.statusCode ?? 500).json({
    success: false,
    error: error.message ?? 'Server Error',
  });
};

export { errorsHandler, notFound };
