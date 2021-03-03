import mongoose from 'mongoose';
import { validateURL, validateEmail } from '../utils/myValidatorUtils.js';

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please add a name',
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 character'],
  },
  slug: String,
  description: {
    type: String,
    required: 'Please add a description',
    maxlength: [500, 'Description can not be more than 500 character'],
  },
  website: {
    type: String,
    validate(value) {
      if (!validateURL(value)) {
        throw new Error('Please use a valid URL with HTTP or HTTPS');
      }
    },
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  email: {
    type: String,
    validate(value) {
      if (!validateEmail(value)) {
        throw new Error('Please enter a valid email');
      }
    },
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('School', SchoolSchema);
