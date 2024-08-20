const Quiz = require("../models/quizModel")

exports.addQuiz = async (req, res)=> {
    console.log(req.body)
    try {
        const quiz = new Quiz(req.body)
        await quiz.save();
        res.status(201).send(quiz)
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find()
        res.status(200).send(quizzes)
    } catch (error) {
        res.status(400).send(error)
    }
}