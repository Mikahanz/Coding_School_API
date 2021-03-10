import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import UserModel from '../models/UserModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //console.log(token);

  // else if(req.cookies.token){
  //     token = req.cookies.token
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    // Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

export { protect, authorize };
