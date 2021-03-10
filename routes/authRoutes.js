import express from 'express';
import {
  loginUser,
  register,
  getMe,
  forgotPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route POST /api/v1/auth/register
// @route POST /api/v1/auth/login
// @route POST /api/v1/auth/forgotpassword
router
  .post('/register', register)
  .post('/login', loginUser)
  .post('/forgotpassword', forgotPassword);

// @route GET /api/v1/auth/me
router.route('/me').get(protect, getMe);

export default router;
