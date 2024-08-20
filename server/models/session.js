const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSessionSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  quizId: {
    type: String,
    required: true
  },
  hostId: {
    type: String,
    required: true
  },
  participants: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const QuizSession = mongoose.model('QuizSession', quizSessionSchema);

module.exports = QuizSession;
