import SchoolModel from '../models/SchoolModel.js';

// TODO SCHOOL CONTROLLER

// @desc Get all Schools
// @route GET /api/v1/schools
// @access Public
const getSchools = async (req, res) => {
  try {
    const schools = await SchoolModel.find({});

    res.status(200).json({ success: true, data: schools });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Get School by id
// @route GET /api/v1/schools/:id
// @access Public
const getSchool = async (req, res) => {
  try {
    const school = await SchoolModel.findById(req.params.id);

    if (!school) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: school });
  } catch (error) {
    res.status(400).json({ success: false });
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
const updateSchools = (req, res) => {
  res.json({ success: true, msg: 'Update School by id ' + req.params.id });
};

// @desc Delete School by id
// @route DELETE /api/v1/schools/:id
// @access Public
const deleteSchool = (req, res) => {
  res.json({ success: true, msg: 'Delete Schools by id ' + req.params.id });
};

export { getSchools, createSchool, getSchool, updateSchools, deleteSchool };
