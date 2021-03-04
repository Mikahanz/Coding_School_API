import express from 'express';
import {
  getSchools,
  createSchool,
  getSchool,
  updateSchools,
  deleteSchool,
  getSchoolInRadius,
} from '../controllers/schoolController.js';

// Include other resource routers
import courseRouter from './courseRoutes.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:schoolId/courses', courseRouter);

// @route GET /api/v1/schools
// @route POST /api/v1/schools
router.route('/').get(getSchools).post(createSchool);

// @route GET /api/v1/schools/:id
// @route UPDATE /api/v1/schools/:id
// @route DELETE /api/v1/schools/:id
router.route('/:id').get(getSchool).put(updateSchools).delete(deleteSchool);

// @desc Get schools within a radius
// @route GET /api/v1/schools/radius/:zipcode/:distance
// @access Private
router.route('/radius/:zipcode/:distance').get(getSchoolInRadius);

export default router;
