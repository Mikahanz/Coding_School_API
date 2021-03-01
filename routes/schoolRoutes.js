import express from 'express';
import {
  getSchools,
  createSchool,
  getSchool,
  updateSchools,
  deleteSchool,
} from '../controllers/schoolController.js';

const router = express.Router();

// @route GET /api/v1/schools
// @route POST /api/v1/schools
router.route('/').get(getSchools).post(createSchool);

// @route GET /api/v1/schools/:id
// @route UPDATE /api/v1/schools/:id
// @route DELETE /api/v1/schools/:id
router.route('/:id').get(getSchool).put(updateSchools).delete(deleteSchool);

export default router;
