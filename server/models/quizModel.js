// models/quizModel.js
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  // quizId: { type: String, unique: true, required: true },
  title: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);

