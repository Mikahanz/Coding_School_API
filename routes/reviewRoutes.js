import express from 'express';
import {
  getReviews,
  getReview,
  addReview,
  //   updateReview,
  //   deleteReview,
} from '../controllers/reviewController.js';
import ReviewModel from '../models/ReviewModel.js';
import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(ReviewModel, {
      path: 'school',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router.route('/:id').get(getReview);

export default router;
