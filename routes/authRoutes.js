import express from 'express';
import {
  loginUser,
  register,
  getMe,
  forgotPassword,
  resetPassword,
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

// @route PUT /api/v1/resetpassword/:resettoken
router.route('/resetpassword/:resettoken').put(resetPassword);

// @route GET /api/v1/auth/me
router.route('/me').get(protect, getMe);

export default router;
