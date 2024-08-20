const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  questionId: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const userAnswerSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sessionId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  answers: [answerSchema],
  score: {
    type: Number,
    required: true
  }
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;
