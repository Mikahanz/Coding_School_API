// TODO SCHOOL CONTROLLER

// @desc Get all Schools
// @route GET /api/v1/schools
// @access Public
const getSchools = (req, res) => {
  res.json({ success: true, msg: 'Show all Schools' });
};

// @desc Get School by id
// @route GET /api/v1/schools/:id
// @access Public
const getSchool = (req, res) => {
  res.json({ success: true, msg: 'Get School by id ' + req.params.id });
};

// @desc Create new School
// @route POST /api/v1/schools
// @access Public
const createSchool = (req, res) => {
  res.json({ success: true, msg: 'Create new School' });
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
