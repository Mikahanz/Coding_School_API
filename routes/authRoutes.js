import express from 'express';
import {
  loginUser,
  register,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatepassword,
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

// @route PUT /api/v1/auth/updatedetails
router.route('/updatedetails').put(protect, updateDetails);

// @route PUT /api/v1/auth/updatepassword
router.route('/updatepassword').put(protect, updatepassword);

// @route GET /api/v1/auth/me
router.route('/me').get(protect, getMe);

export default router;
