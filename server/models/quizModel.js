const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: false },
  options: { type: [String], required: false },
  correctAnswer: { type: String, required: false },
  // timer: { type: Number, required: false }
}, { _id: false });

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: false },
  // description: { type: String, required: false },
  questions: { type: [questionSchema], required: false },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
