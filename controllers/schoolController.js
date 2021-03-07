import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import geocoder from '../utils/geocoder.js';
import SchoolModel from '../models/SchoolModel.js';
import ErrorResponse from '../utils/errorResponse.js';

// TODO SCHOOL CONTROLLER

// @desc Get all Schools
// @route GET /api/v1/schools
// @access Public
const getSchools = asyncHandler(async (req, res, next) => {
  // Response to client
  res.status(200).json(res.advancedResults);
});

// @desc Get School by id
// @route GET /api/v1/schools/:id
// @access Private
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
// @access Private
const createSchool = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.create(req.body);
  res.status(201).json({ success: true, data: school });
});

// @desc Update School
// @route UPDATE /api/v1/schools/:id
// @access Private
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
// @access Private
const deleteSchool = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.findById(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(`School not found with id of ${req.params.id}`, 404)
    );
  }

  school.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc Get schools within a radius
// @route GET /api/v1/schools/radius/:zipcode/:distance
// @access Private
const getSchoolInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/long from geocoder
  const loc = await geocoder.geocode(zipcode);

  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of earth
  // Earth radius = 3963 mi / 6378 km
  const radius = distance / 3963;

  const schools = await SchoolModel.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], radius] } },
  });

  res.status(200).json({ success: true, count: schools.length, data: schools });
});

// @desc Upload Photo For School by id
// @route DELETE /api/v1/schools/:id/photo
// @access Private
const schoolUploadPhoto = asyncHandler(async (req, res, next) => {
  const school = await SchoolModel.findById(req.params.id);
  console.log(`uploading photo.. for school ${req.params.id}`);

  if (!school) {
    return next(
      new ErrorResponse(`School not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.file) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  console.log(req.file.filename);

  await SchoolModel.findByIdAndUpdate(req.params.id, {
    photo: req.file.filename,
  });

  res.status(200).json({ success: true, data: req.file.filename });
});

export {
  getSchools,
  createSchool,
  getSchool,
  updateSchools,
  deleteSchool,
  getSchoolInRadius,
  schoolUploadPhoto,
};
