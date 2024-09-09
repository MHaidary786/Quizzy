import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

const JoinQuizPage = () => {
  const { sessionId } = useParams(); // Use useParams hook to access route parameters
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleJoin = async () => {
    if (!userName.trim() || !avatar.trim()) {
      notify('Please enter both your name and avatar URL', 'error'); // Notify if fields are empty
      return;
    }

    try {
      const response = await axios.post(`http://quizzy-5dpo.onrender.com:5000/sessions/${sessionId}/join`, { userName, avatar });
      if (response.data.success) {
        // Notify and redirect to the quiz session page
        notify('Successfully joined the quiz!', 'success');
        navigate(`/quiz/${sessionId}`);
      } else {
        notify(response.data.message, 'error'); // Notify if there’s an error from the server
      }
    } catch (error) {
      notify('Error joining the session: ' + error.message, 'error'); // Notify if there’s an error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Join Quiz</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-4 mb-4 rounded border border-gray-600 bg-gray-700 text-white text-lg"
        />
        <input
          type="text"
          placeholder="Enter your avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full p-4 mb-6 rounded border border-gray-600 bg-gray-700 text-white text-lg"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 text-lg"
        >
          Join Quiz
        </button>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

export default JoinQuizPage;
