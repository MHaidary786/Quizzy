const Quiz = require("../models/quizModel");
const fetch = require("node-fetch");
const Question = require("../models/questionModel"); // Import the Question model
const UserAnswer = require("../models/userAnswerModel");


// Helper function to build the query URL
const buildQuizUrl = (params) => {
  const url = new URL("https://opentdb.com/api.php");
  Object.keys(params).forEach((key) => {
    if (params[key]) url.searchParams.append(key, params[key]);
  });
  return url.toString();
};

// Add a new quiz
exports.addQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create and save a quiz with a unique quizId
exports.getQuiz = async (req, res) => {
    try {
      const { amount, category, difficulty, type } = req.query;
  
      if (!amount) {
        return res.status(400).send("Please provide the amount of the questions!");
      }
  
      const params = { amount, category, difficulty, type };
      const url = buildQuizUrl(params);
  
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(response.status).send(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const questions = data.results;
      // console.log(questions)
      // Create a new quiz document
      const quiz = new Quiz({
        // quizId: new mongoose.Types.ObjectId().toString(), // Generate a unique quizId
        title: "Sample Quiz Title", // Set a title or use a dynamic title
      });
  
      // Save the quiz document
      await quiz.save();
  
      // Save questions and link them to the quiz
      const savedQuestions = await Question.insertMany(questions);
      quiz.questions = savedQuestions.map(question => question._id); // Link questions to the quiz
      await quiz.save(); // Update the quiz with question references
  
      res.status(200).json({  questions: data.results });
    } catch (error) {
      console.error("Error in getQuiz:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// Add this function to your backend
exports.getSavedQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error in getSavedQuestions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.submit_answers = async (req, res) => {
//   try {
//     let userAnswersDb = [];
//     const { answers } = req.body;
//     // Save answers in the database (replace with your actual DB logic)
//     userAnswersDb.push(answers);

//     // Calculate results
//     let correctCount = 0;
//     let totalQuestions = Object.keys(answers).length;

//     answers.forEach((answer, index) => {
//       // Assume you have a function to get the correct answer for a question
//       const correctAnswer = getCorrectAnswerForQuestion(index); // Define this function
//       if (answer === correctAnswer) {
//         correctCount++;
//       }
//     });

//     const resultMessage = `You answered ${correctCount} out of ${totalQuestions} questions correctly.`;
//     res.json({ message: resultMessage });
//   } catch (error) {}
// };

exports.submitAnswers = async (req, res) => {
    try {
      const { userId, quizId, answers } = req.body;
      console.log(`Received quizId: ${quizId}`); // Add this line for debugging
  
      // Retrieve the quiz to get the correct answers
      const quiz = await Quiz.findById(quizId).populate("questions");
      console.log(`Quiz found: ${quiz}`); // Add this line for debugging
  
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
  
      let correctCount = 0;
      const totalQuestions = quiz.questions.length;
      const userAnswers = [];
  
      // Iterate through each question and compare the user's answers with the correct answers
      for (let i = 0; i < totalQuestions; i++) {
        const question = quiz.questions[i];
        const userAnswer = answers[i]; // Assuming answers array matches question indices
        const isCorrect = userAnswer === question.correct_answer;
  
        // Save the user's answer to the database (if you need to store it)
        const answerRecord = new UserAnswer({
          userId,
          quizId,
          questionId: question._id,
          answer: userAnswer,
          isCorrect: isCorrect,
        });
        await answerRecord.save();
  
        userAnswers.push(answerRecord);
  
        if (isCorrect) correctCount++;
      }
  
      const resultMessage = `You answered ${correctCount} out of ${totalQuestions} questions correctly.`;
  
      // Send the result back to the frontend
      res.json({ message: resultMessage, userAnswers });
    } catch (error) {
      console.error("Error in submitAnswers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  