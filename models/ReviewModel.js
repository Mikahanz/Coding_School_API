import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please add a review for the review',
  },
  text: {
    type: String,
    required: 'Please add some text',
  },
  rating: {
    type: Number,
    required: 'Please add a rating between 1 and 10',
    min: 1,
    max: 10,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School', // Referrence to the database School
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Referrence to the database User
    required: true,
  },
});

// Allows user only submit one review per school
ReviewSchema.index({ school: 1, user: 1 }, { unique: true });

ReviewSchema.index();

export default mongoose.model('Review', ReviewSchema);
