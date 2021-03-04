import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import CourseModel from '../models/CourseModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// todo COURSE CONTROLLER

// @desc Get all Courses
// @route GET /api/v1/courses
// @route GET /api/v1/schools/:schoolId/courses
// @access Public
const getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.schoolId) {
    query = CourseModel.find({ school: req.params.schoolId });
  } else {
    query = CourseModel.find().populate({
      path: 'school',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export { getCourses };
