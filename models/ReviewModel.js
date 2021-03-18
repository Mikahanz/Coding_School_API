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

// Static Method to get average rating and save
ReviewSchema.statics.getAverageRating = async function (schoolId) {
  const obj = await this.aggregate([
    { $match: { school: schoolId } },
    { $group: { _id: '$school', averageRating: { $avg: '$rating' } } },
  ]);

  try {
    // Use the SchoolModel
    await this.model('School').findByIdAndUpdate(schoolId, {
      averageRating: obj[0].averageRating,
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageCost after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.school);
});

// Call getAverageCost before remove
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.school);
});

export default mongoose.model('Review', ReviewSchema);
