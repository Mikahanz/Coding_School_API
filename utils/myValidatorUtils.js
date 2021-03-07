//const validator = require('validator');
import validator from 'validator';
import ErrorResponse from '../utils/errorResponse.js';

// URL validator for HTTP or HTTPS
const validateURL = (url) => {
  if (!validator.isURL(url, { protocols: ['http', 'https'] })) {
    return false;
  } else {
    return true;
  }
};

//console.log(validateURL('https://www.npmjs.com/package/validator'));
// ---------------------------------

// Email Validator
const validateEmail = (email) => {
  return validator.isEmail(email) ? true : false;
};

//console.log(validateEmail('hanzel@gmail.com'));
// ---------------------------------

// Verify File Type for Photo Upload
const verifyFile = (file, cb) => {
  // Verify if file is image
  if (!file.mimetype.startsWith('image')) {
    return cb(
      new ErrorResponse(
        `Please upload an image type file - jpg / png / jpeg`,
        400
      )
    );
  }

  // Verify filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return cb(
      new ErrorResponse(
        `Please upload an image less than ${MAX_FILE_UPLOAD} kb`,
        400
      )
    );
  }

  return cb(null, true);
};

//module.exports = { validateURL, validateEmail };
export { validateURL, validateEmail, verifyFile };
