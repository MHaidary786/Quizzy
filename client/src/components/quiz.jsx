import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function QuizPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);

  // Use useLocation to access the passed state (questions and quizId)
  const location = useLocation();
  const questions = location.state?.questions || [];
  const quizId = location.state?.quizId; // Get quizId from the passed state

  // Assuming you have a userId from the logged-in user
  const userId = "some-user-id"; // Replace this with actual userId from context/authentication

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Construct the data to send to the backend
      const answersArray = Object.keys(userAnswers).map((key) => userAnswers[key]);
      
      const response = await axios.post("http://localhost:5000/quiz/submit-answers", {
        userId: userId,    // Pass the userId
        quizId: quizId,    // Pass the quizId
        answers: answersArray,  // Pass the answers as an array
      });

      setFeedback(response.data.message);  // Display feedback from backend
      setShowAnswers(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center h-screen bg-slate-200 p-4 overflow-x-scroll utility">
      <h1 className="m-10 text-3xl font-bold">Quiz</h1>
      {questions.length > 0 ? (
        <div className="w-full max-w-2xl">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white p-6 mb-4 border rounded shadow-md"
            >
              <p className="mb-4">{question.question}</p>
              <div>
                {question.incorrect_answers
                  .concat(question.correct_answer)
                  .map((answer, i) => (
                    <div
                      key={i}
                      className={`p-2 mb-2 border rounded cursor-pointer ${
                        userAnswers[index] === answer ? "bg-blue-100" : "bg-gray-100"
                      }`}
                      onClick={() => handleAnswerChange(index, answer)}
                    >
                      {answer}
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mt-4"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <p>No questions available.</p>
      )}

      {feedback && (
        <div className="mt-10 p-4 border rounded bg-white shadow-md">
          <h2 className="text-xl font-bold">Results:</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
