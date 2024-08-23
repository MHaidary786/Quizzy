// models/userAnswerModel.js
const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  answer: String,
  isCorrect: Boolean,
});

module.exports = mongoose.model("UserAnswer", userAnswerSchema);
