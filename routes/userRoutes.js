import express from 'express';
import {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
} from '../controllers/userController.js';
import UserModel from '../models/UserModel.js';
import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

// Protect & Authorize all the routes below
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(UserModel), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
