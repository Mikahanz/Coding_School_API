import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import ReviewModel from '../models/ReviewModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import SchoolModel from '../models/SchoolModel.js';

// @desc Get reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/schools/:schoolId/reviews
// @access Public
const getReviews = asyncHandler(async (req, res, next) => {
  // Verify if schoolId is provided
  if (req.params.schoolId) {
    const reviews = await ReviewModel.find({ school: req.params.schoolId });

    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

export { getReviews };
