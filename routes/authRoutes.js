import express from 'express';
import { loginUser, register } from '../controllers/authController.js';

const router = express.Router();

// @route POST /api/v1/auth/register
// @route POST /api/v1/auth/login
router.post('/register', register).post('/login', loginUser);

export default router;
