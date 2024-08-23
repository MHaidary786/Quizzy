const express = require('express');
const quizController = require("../controllers/quizController")
const router = express.Router();

router.post("/add", quizController.addQuiz)
router.get("/allquizzes", quizController.getAllQuizzes)

router.get("/", quizController.getQuiz)
router.get('/saved-questions', quizController.getSavedQuestions);
router.post('/submit-answers', quizController.submitAnswers); 

router.get("/hi", function (req, res) {
    res.send("Hello World");
  });
module.exports = router;