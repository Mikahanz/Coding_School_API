import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import SchoolModel from '../models/SchoolModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// TODO SCHOOL CONTROLLER

// @desc Get all Schools
// @route GET /api/v1/schools
// @access Public
const getSchools = asyncHandler(async (req, res, next) => {
  const schools = await SchoolModel.find({});

  res.status(200).json({ success: true, count: schools.length, data: schools });
});

// @desc Get School by id
// @route GET /api/v1/schools/:id
// @access Public
const getSchool = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.findById(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(`School not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: school });
});

// @desc Create new School
// @route POST /api/v1/schools
// @access Public
const createSchool = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.create(req.body);
  res.status(201).json({ success: true, data: school });
});

// @desc Update School
// @route UPDATE /api/v1/schools/:id
// @access Public
const updateSchools = asyncHandler(async (req, res, next) => {
  // new: true - means that the new update data will be the new data
  // runValidators - mean that the update data will be validated by the model
  const school = await SchoolModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!school) {
    return next(
      new ErrorResponse(`School not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: school });
});

// @desc Delete School by id
// @route DELETE /api/v1/schools/:id
// @access Public
const deleteSchool = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.findByIdAndDelete(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(`School not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

export { getSchools, createSchool, getSchool, updateSchools, deleteSchool };
