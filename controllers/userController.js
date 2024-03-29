import asyncHandler from 'express-async-handler';
import chalk from 'chalk';
import ErrorResponse from '../utils/errorResponse.js';
import UserModel from '../models/UserModel.js';

// @desc Get all users
// @route GET /api/v1/auth/users
// @access Private / Admin
const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get single user
// @route GET /api/v1/auth/users/:id
// @access Private / Admin
const getUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  res.status(200).json({ success: true, data: user });
});

// @desc Create user
// @route POST /api/v1/auth/users
// @access Private / Admin
const createUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);

  res.status(201).json({ success: true, data: user });
});

// @desc Update user
// @route PUT /api/v1/auth/users/:id
// @access Private / Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// @desc Delete user
// @route DELETE /api/v1/auth/users/:id
// @access Private / Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
export { getUsers, getUser, deleteUser, createUser, updateUser };
