//const validator = require('validator');
import validator from 'validator';

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

//module.exports = { validateURL, validateEmail };
export { validateURL, validateEmail };
