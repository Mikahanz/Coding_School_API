import express from 'express';
import {
  getCampuses,
  createCampus,
  getCampus,
  updateCampuses,
  deleteCampus,
} from '../controllers/campusController.js';

const router = express.Router();

// @route GET /api/v1/campuses
// @route POST /api/v1/campuses
router.route('/').get(getCampuses).post(createCampus);

// @route GET /api/v1/campuses/:id
// @route UPDATE /api/v1/campuses/:id
// @route DELETE /api/v1/campuses/:id
router.route('/:id').get(getCampus).put(updateCampuses).delete(deleteCampus);

export default router;
