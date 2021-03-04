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
    ref: 'SchoolModel', // Referrence to SchoolModel
    required: true,
  },
});

export default mongoose.model('Course', CourseSchema);
