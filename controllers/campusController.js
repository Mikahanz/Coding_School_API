// TODO CAMPUS CONTROLLER

// @desc Get all campuses
// @route GET /api/v1/campuses
// @access Public
const getCampuses = (req, res) => {
  res.json({ success: true, msg: 'Show all campuses' });
};

// @desc Get campus by id
// @route GET /api/v1/campuses/:id
// @access Public
const getCampus = (req, res) => {
  res.json({ success: true, msg: 'Get campus by id ' + req.params.id });
};

// @desc Create new campus
// @route POST /api/v1/campuses
// @access Public
const createCampus = (req, res) => {
  res.json({ success: true, msg: 'Create new campus' });
};

// @desc Update campus
// @route UPDATE /api/v1/campuses/:id
// @access Public
const updateCampuses = (req, res) => {
  res.json({ success: true, msg: 'Update campus by id ' + req.params.id });
};

// @desc Delete campus by id
// @route DELETE /api/v1/campuses/:id
// @access Public
const deleteCampus = (req, res) => {
  res.json({ success: true, msg: 'Delete campuses by id ' + req.params.id });
};

export { getCampuses, createCampus, getCampus, updateCampuses, deleteCampus };
