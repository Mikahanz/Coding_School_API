import mongoose from 'mongoose';
import { validateEmail } from '../utils/myValidatorUtils.js';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    validate(value) {
      if (!validateEmail(value)) {
        throw new Error('Please enter a valid email');
      }
    },
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false, // will not return a password when Select Operation executed
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', UserSchema);
