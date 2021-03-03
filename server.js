import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import connectDB from './config/db.js';

// Load env variables - variables is accessible in process.env<variable name>
dotenv.config();

// Connect to database
connectDB();

// Create express app
const app = express();

/*
 * This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
 */
app.use(express.json());

// Middleware - Get request detail
// const logger = (req, res, next) => {
//   console.log(
//     `Method: ${req.method} | Protocol: ${req.protocol} | Host: ${req.get(
//       'host'
//     )} | URL: ${req.originalUrl}`
//   );
//   next();
// };

// app.use(logger);

// HTTP Request Logger (morgan) - ONLY in Development Mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES----------------------------------

// User Routes
app.use(userRoutes);

// Schools Routes
app.use('/api/v1/schools', schoolRoutes);

// END OF ROUTES----------------------------------

// Port Variable ---------------------------
const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    chalk.green.underline.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${port}`
    )
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(chalk.red(`Unhandled Rejetion Error: ${err.message}`));
  // Close server & exit process
  // server.close(() => process.exit(1));
});
