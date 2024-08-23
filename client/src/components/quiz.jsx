import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (text, type) => {
  toast(text, {
    type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

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
      const answersArray = questions.map((_, index) => userAnswers[index] || '');

      const response = await axios.post("http://localhost:5000/quiz/submit-answers", {
        userId,    // Pass the userId
        quizId,    // Pass the quizId
        answers: answersArray,  // Pass the answers as an array
      });

      notify(response.data.message, 'success');  // Notify with the response message
      setFeedback(response.data.message);  // Display feedback from backend
      setShowAnswers(true);
    } catch (error) {
      notify('Error submitting answers: ' + error.message, 'error');
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center h-screen bg-gray-900 text-white p-4 overflow-x-scroll">
      <h1 className="m-10 text-7xl font-bold text-gray-100">Quiz</h1>
      {questions.length > 0 ? (
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 mb-4 border rounded shadow-md"
            >
              <p className="mb-4">{question.question}</p>
              <div>
                {question.incorrect_answers
                  .concat(question.correct_answer)
                  .map((answer, i) => (
                    <div
                      key={i}
                      className={`p-2 mb-2 border rounded cursor-pointer ${
                        userAnswers[index] === answer ? "bg-blue-600" : "bg-gray-600"
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
            className="bg-green-700 text-white p-2 rounded hover:bg-green-800 mt-4 transition-colors"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <p className="text-gray-400">No questions available.</p>
      )}

      {feedback && (
        <div className="mt-10 p-4 border rounded bg-gray-800 text-white shadow-md">
          <h2 className="text-xl font-bold">Results:</h2>
          <p>{feedback}</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
