import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import CourseModel from '../models/CourseModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import SchoolModel from '../models/SchoolModel.js';

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

// @desc Get Single Course By Id
// @route GET /api/v1/courses/:id
// @access Public
const getCourse = asyncHandler(async (req, res, next) => {
  const course = await await CourseModel.findById(req.params.id).populate({
    path: 'school',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }
  //console.log(course);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc Add A New Course
// @route POST /api/v1/schools/:schoolId/courses/
// @access Private
const addCourse = asyncHandler(async (req, res, next) => {
  const newCourse = req.body;
  newCourse.school = req.params.schoolId;

  console.log(newCourse);

  const school = await SchoolModel.findById(req.params.schoolId);

  if (!school) {
    return next(
      new ErrorResponse(`No School with the id of ${req.params.schoolId}`),
      404
    );
  }

  const course = await CourseModel.create(newCourse);

  if (!course) {
    return next(new ErrorResponse(`Failed adding a new course`, 400));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc Update A Course
// @route PUT /api/v1/courses/:id
// @access Private
const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await CourseModel.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id}`),
      404
    );
  }

  course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc Delete A Course
// @route DELETE /api/v1/courses/:id
// @access Private
const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await CourseModel.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No Course with the id of ${req.params.id}`),
      404
    );
  }

  await course.remove(course);

  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getCourses, getCourse, addCourse, updateCourse, deleteCourse };
