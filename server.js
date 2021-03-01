import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import campusRoutes from './routes/campusRoutes.js';

// Load env variables - variables is accessible in process.env<variable name>
dotenv.config();

// Create express app
const app = express();

// HTTP Request Logger (morgan) - ONLY in Development Mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES----------------------------------

// User Routes
app.use(userRoutes);

// Campuses Routes
app.use('/api/v1/campuses', campusRoutes);

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
