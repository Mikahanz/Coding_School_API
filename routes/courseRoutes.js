import express from 'express';
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import CourseModel from '../models/CourseModel.js';
import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(CourseModel, {
      path: 'school',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('admin', 'publisher'), addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('admin', 'publisher'), updateCourse)
  .delete(protect, authorize('admin', 'publisher'), deleteCourse);

export default router;
