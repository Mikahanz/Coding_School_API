import express from 'express';
import { greeting } from '../controllers/userController.js';

// Create express router
const router = express.Router();

// @desc GET default endpoint
// @route GET /
// @access Public
router.route('/').get(greeting);

export default router;
