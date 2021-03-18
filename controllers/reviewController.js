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

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
const getReview = asyncHandler(async (req, res, next) => {
  const review = await ReviewModel.findById(req.params.id).populate({
    path: 'school',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc Add review
// @route POST /api/v1/schools/:schoolId/reviews
// @access Private
const addReview = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.findById(req.params.schoolId);

  if (!school) {
    return next(
      new ErrorResponse(
        `No school found with id of ${req.params.schoolId}`,
        404
      )
    );
  }

  req.body.school = req.params.schoolId;
  req.body.user = req.user.id;

  const review = await ReviewModel.create(req.body);

  if (!review) {
    return next(new ErrorResponse(`Failed adding review`, 400));
  }

  res.status(201).json({
    success: true,
    data: review,
  });
});

export { getReviews, getReview, addReview };