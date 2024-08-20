import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinQuizPage = ({ match }) => {
  const { sessionId } = match.params;
  const history = useNavigate();
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleJoin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/sessions/${sessionId}/join`, { userName, avatar });
      if (response.data.success) {
        // Redirect to the quiz session page
        history.push(`/quiz/${sessionId}`);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error joining the session:', error);
    }
  };

  return (
    <div>
      <h2>Join Quiz</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <button onClick={handleJoin}>Join Quiz</button>
    </div>
  );
};

export default JoinQuizPage;
