import chalk from 'chalk';
import SchoolModel from '../models/SchoolModel.js';

// TODO SCHOOL CONTROLLER

// @desc Get all Schools
// @route GET /api/v1/schools
// @access Public
const getSchools = async (req, res) => {
  try {
    const schools = await SchoolModel.find({});

    res
      .status(200)
      .json({ success: true, count: schools.length, data: schools });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Get School by id
// @route GET /api/v1/schools/:id
// @access Public
const getSchool = async (req, res, next) => {
  try {
    const school = await SchoolModel.findById(req.params.id);

    if (!school) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: school });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// @desc Create new School
// @route POST /api/v1/schools
// @access Public
const createSchool = async (req, res) => {
  try {
    const school = await SchoolModel.create(req.body);
    res.status(201).json({ success: true, data: school });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Update School
// @route UPDATE /api/v1/schools/:id
// @access Public
const updateSchools = async (req, res) => {
  try {
    // new: true - means that the new update data will be the new data
    // runValidators - mean that the update data will be validated by the model
    const school = await SchoolModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!school) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: school });
  } catch (error) {
    console.error(chalk.redBright(error.message));
    res.status(400).json({ success: false });
  }
};

// @desc Delete School by id
// @route DELETE /api/v1/schools/:id
// @access Public
const deleteSchool = async (req, res) => {
  try {
    const school = await SchoolModel.findByIdAndDelete(req.params.id);

    if (!school) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(chalk.redBright(error.message));
    res.status(400).json({ success: false });
  }
};

export { getSchools, createSchool, getSchool, updateSchools, deleteSchool };
