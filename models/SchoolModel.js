import mongoose from 'mongoose';
import slugify from 'slugify';
import geocoder from '../utils/geocoder.js';
import chalk from 'chalk';
import { validateURL, validateEmail } from '../utils/myValidatorUtils.js';

const SchoolSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete courses when a school is deleted
SchoolSchema.pre('remove', async function (next) {
  console.log(chalk.blue(`Courses being removed from school - ${this._id}`));
  await this.model('Course').deleteMany({ school: this._id });
  next();
});

// Virtual attribute for reverse populate
// 'courses' is the field that will show, can be anything
SchoolSchema.virtual('courses', {
  ref: 'Course', // Referrence to the Course Model
  localField: '_id', // _id field on the School Collection
  foreignField: 'school', // school field on the Course Collection
  justOne: false,
});

// Create School slug from the name
SchoolSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Mongoose pre Hooks middleware
// Geocoder & create location field
SchoolSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address to database
  this.address = undefined;

  next();
});

export default mongoose.model('School', SchoolSchema);
