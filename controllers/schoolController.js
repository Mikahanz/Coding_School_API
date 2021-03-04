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
  let query;

  // Copy req.query
  const reqQuery = { ...req.query }; // This is the same as reqQuery = req.query

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Replace any gt|gte|lt|lte|in with $ in front of it
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // FOR DEV
  // /api/v1/schools?averageCost[gte]=10000&location.city=Boston
  // result queryStr -> {"averageCost":{"$gte":"10000"},"location.city":"Boston"}
  //console.log(queryStr);
  //console.log(req.query);

  // Find resources
  query = SchoolModel.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  }

  // Sort fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const startIndex = limit * (page - 1);
  const endIndex = page * limit;
  const totalDocs = await SchoolModel.countDocuments();

  const pagination = {};

  if (totalDocs > endIndex) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  query = query.limit(limit).skip(startIndex);
  console.log(page);
  console.log(limit);
  //  executing query
  const schools = await query;

  // Response to client
  res.status(200).json({
    success: true,
    count: schools.length,
    page,
    pagination,
    data: schools,
  });
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
  const school = await SchoolModel.findByIdAndDelete(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(`School not found with id of ${req.params.id}`, 404)
    );
  }

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

export {
  getSchools,
  createSchool,
  getSchool,
  updateSchools,
  deleteSchool,
  getSchoolInRadius,
};
