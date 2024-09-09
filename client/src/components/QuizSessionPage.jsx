import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://quizzy-5dpo.onrender.com:5000');

const QuizSessionPage = ({ match }) => {
  const { sessionId } = match.params;
  const [question, setQuestion] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  
  useEffect(() => {
    // Join the session
    socket.emit('join-session', { sessionId });

    // Listen for new questions
    socket.on('new-question', (newQuestion) => {
      setQuestion(newQuestion);
    });

    // Listen for leaderboard updates
    socket.on('update-leaderboard', (newLeaderboard) => {
      setLeaderboard(newLeaderboard);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  const handleAnswerSubmit = (answer) => {
    socket.emit('submit-answer', { sessionId, answer });
  };

  return (
    <div>
      <h2>Quiz Session</h2>
      <div>
        <h3>Question: {question.text}</h3>
        {question.options && question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerSubmit(option)}>
            {option}
          </button>
        ))}
      </div>
      <div>
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((participant, index) => (
            <li key={index}>{participant.userName}: {participant.score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizSessionPage;
