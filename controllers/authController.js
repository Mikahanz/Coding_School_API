import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import SchoolModel from '../models/SchoolModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc Get all Schools
// @route GET /api/v1/auth/register
// @access Public
const register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

export { register };
