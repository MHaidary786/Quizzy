// models/questionModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  incorrect_answers: [{ type: String }],
  correct_answer: { type: String },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' } // Optional, if you want to reference the quiz
});

module.exports = mongoose.model('Question', questionSchema);
