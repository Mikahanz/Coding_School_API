import path from 'path';
import express from 'express';
//import connectDB from './config/db.js';
import dotenv from 'dotenv';
import chalk from 'chalk';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import cookieParser from 'cookie-parser';
import { errorsHandler, notFound } from './middleware/errorsHandler.js';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

// Load env variables - variables is accessible in process.env<variable name>
dotenv.config();

// Connect to database
//connectDB();

// Create express app
const app = express();

/*
 * This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
 */
app.use(express.json());

// Cookie-parser
app.use(cookieParser());

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

// Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS(Cross Site Scripting) attack
app.use(xss());

// Rate limiting - 100 request per 10 mins
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent Http param polution
app.use(hpp());

// Enable Cors
app.use(cors());

// ROUTES----------------------------------

// User Routes
app.use('/api/v1/users', userRoutes);

// Authentication Routes
app.use('/api/v1/auth', authRoutes);

// Schools Routes
app.use('/api/v1/schools', schoolRoutes);

// Courses Routes
app.use('/api/v1/courses', courseRoutes);

// Reviews Routes
app.use('/api/v1/reviews', reviewRoutes);

// END OF ROUTES----------------------------------

// Make uploads folder accessible by the browser by making it static
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/public')));
//console.log(path.join(__dirname, 'public/uploads/'));

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')));

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  );
}

//Error Handler Middleware
app.use(notFound);
app.use(errorsHandler);

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
