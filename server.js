const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');

// Load env variables - variables is accessible in process.env<variable name>
dotenv.config();

// Create express app
const app = express();

// Port Variable
const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    chalk.green(
      `Server running in ${process.env.NODE_ENV} mode on port ${port}`
    )
  )
);
