// models/questionModel.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  correct_answer: String,
  incorrect_answers: [String],
  type: String,
  category: String,
});

module.exports = mongoose.model("Question", questionSchema); 

