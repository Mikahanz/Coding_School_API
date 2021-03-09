import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import SchoolModel from '../models/SchoolModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import UserModel from '../models/UserModel.js';

// @desc Get all Schools
// @route GET /api/v1/auth/register
// @access Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await UserModel.create({
    name,
    email,
    password,
    role,
  });

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

export { register };
