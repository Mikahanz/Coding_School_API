import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please add a course title',
  },
  description: {
    type: String,
    required: 'Please add a description',
  },
  weeks: {
    type: String,
    required: 'Please add number of weeks',
  },
  tuition: {
    type: Number,
    required: 'Please add a tuition cost',
  },
  minimumSkill: {
    type: String,
    required: 'Please add a minimum skill',
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
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
});

// Static Methods
CourseSchema.statics.getAverageCost = async function (schoolId) {
  console.log(`Calculating avg cost...`);

  const obj = await this.aggregate([
    { $match: { school: schoolId } },
    { $group: { _id: '$school', averageCost: { $avg: '$tuition' } } },
  ]);

  try {
    await this.model('School').findByIdAndUpdate(schoolId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageCost after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.school);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.school);
});

export default mongoose.model('Course', CourseSchema);
