import chalk from 'chalk';
import ErrorResponse from '../utils/errorResponse.js';

// ERROR HANDLER MIDDLEWARE - handle all the next(error)
const errorsHandler = (err, req, res, next) => {
  // log to console for dev ---------------------------------
  console.log(chalk.red(err));
  console.log(chalk.yellow(`The Error Name ->> ${err.name}`));
  //console.log(error);

  let error = { ...err };

  // Add property 'message' to error
  error.message = err.message;

  // Mongoose Invalid ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found due to Invalid ObjectId -> ${err.value}`;
    error = new ErrorResponse(message, 404); // ErrorResponse is custom ErrorResponse Class Extended from Error Interface
  }

  // Response to client
  res.status(error.statusCode ?? 500).json({
    success: false,
    error: error.message ?? 'Server Error',
  });
};

export default errorsHandler;
