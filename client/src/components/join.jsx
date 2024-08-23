import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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

const JoinPage = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuizId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quizId.trim() !== '') {
      navigate(`/quiz/${quizId}`); // Navigate to the quiz page with the provided ID
    } else {
      notify('Please enter a quiz ID', 'error'); // Use the notify function instead of alert
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Join Quiz</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            value={quizId}
            onChange={handleInputChange}
            placeholder="Enter Quiz ID"
            className="p-4 rounded border border-gray-600 bg-gray-700 text-white text-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 flex items-center justify-center text-lg"
          >
            <FaArrowRight className="mr-2" />
            Join
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

export default JoinPage;
