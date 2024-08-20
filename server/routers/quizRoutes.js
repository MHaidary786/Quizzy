const express = require('express');
const quizController = require("../controllers/quizController")
const router = express.Router();

router.post("/add", quizController.addQuiz)
router.get("/allquizzes", quizController.getAllQuizzes)


module.exports = router;