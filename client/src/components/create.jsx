import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoTriangle } from "react-icons/io5";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import { FaSquare, FaCircle } from "react-icons/fa";
import { BiSolidPolygon } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { FaSave } from "react-icons/fa";
import axios from "axios";

const Quiz = () => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctAnswer: null },
    ]);
  };

  const handleQuestionChange = (index, newQuestion) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? newQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = () => {
    try {
      axios.post("http://localhost:4000/quiz/add", { quizName, questions })
        .then(response => {
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar quizName={quizName} setQuizName={setQuizName} onSaveQuiz={handleSaveQuiz} />
      <div className="flex flex-1">
        <Sidebar questions={questions} onDeleteQuestion={handleDeleteQuestion} addQuestion={addQuestion} />
        <div className="flex flex-col items-center justify-center flex-1 bg-gray-800 py-12">
          {questions.map((question, index) => (
            <Question
              key={index}
              index={index}
              question={question}
              onQuestionChange={(newQuestion) =>
                handleQuestionChange(index, newQuestion)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ quizName, setQuizName, onSaveQuiz }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-100">Quiz App</h1>
        <input
          name="quizName"
          type="text"
          className="bg-gray-800 text-white p-2 rounded border border-gray-600"
          placeholder="Enter Quiz Title ..."
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        <button
          className="btn bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          onClick={() => navigate("/templates")}
        >
          Use Templates
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/">
          <button className="btn bg-gray-700 text-white border-gray-600 hover:bg-gray-600 flex items-center">
            <FaSave className="text-2xl mr-2" />
            Exit
          </button>
        </Link>
        <button className="btn bg-green-600 text-white hover:bg-green-700 flex items-center" onClick={onSaveQuiz}>
          <FaSave className="text-2xl mr-2" />
          Save
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({ questions, onDeleteQuestion, addQuestion }) => (
  <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
    {questions.map((_, index) => (
      <div key={index} className="relative bg-gray-700 p-2 mb-2 rounded">
        <h1 className="text-lg font-semibold">Question {index + 1}</h1>
        <button
          onClick={() => onDeleteQuestion(index)}
          className="absolute top-1 right-1 text-2xl text-red-600 hover:text-red-500"
        >
          <TiDelete />
        </button>
      </div>
    ))}
    <button
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      onClick={addQuestion}
    >
      Add Question
    </button>
  </div>
);

const Question = ({ index, question, onQuestionChange }) => {
  const handleTextChange = (e) => {
    onQuestionChange({ ...question, text: e.target.value });
  };

  const handleOptionChange = (optIndex, newOption) => {
    const updatedOptions = question.options.map((opt, i) =>
      i === optIndex ? newOption : opt
    );
    onQuestionChange({ ...question, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (optIndex) => {
    onQuestionChange({
      ...question,
      correctAnswer: question.options[optIndex],
    });
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-6 mb-4 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Insert your question..."
          className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
          value={question.text}
          onChange={handleTextChange}
        />
      </div>
      <div className="space-y-2">
        {question.options.map((option, optIndex) => (
          <AnswerOption
            key={optIndex}
            option={option}
            checked={question.correctAnswer === option}
            onOptionChange={(newOption) =>
              handleOptionChange(optIndex, newOption)
            }
            onCorrectAnswerChange={() => handleCorrectAnswerChange(optIndex)}
            optIndex={optIndex}
          />
        ))}
      </div>
    </div>
  );
};

const AnswerOption = ({
  option,
  checked,
  onOptionChange,
  onCorrectAnswerChange,
  optIndex,
}) => {
  const iconMap = [
    { icon: IoTriangle, bgColor: "bg-red-600" },
    { icon: FaSquare, bgColor: "bg-yellow-600" },
    { icon: FaCircle, bgColor: "bg-blue-600" },
    { icon: BiSolidPolygon, bgColor: "bg-green-600" },
  ];

  return (
    <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded border border-gray-600">
      <div className={`w-16 h-12 flex items-center justify-center rounded-full ${iconMap[optIndex].bgColor}`}>
        {React.createElement(iconMap[optIndex].icon, { className: "text-white text-2xl" })}
      </div>
      <input
        type="text"
        placeholder={`Answer ${optIndex + 1}`}
        className="w-full bg-gray-600 text-white p-2 rounded border border-gray-500"
        value={option}
        onChange={(e) => onOptionChange(e.target.value)}
      />
      <div
        onClick={onCorrectAnswerChange}
        className="text-xl cursor-pointer"
      >
        {checked ? (
          <RiCheckboxCircleFill className="text-green-400 text-2xl" />
        ) : (
          <RiCheckboxBlankCircleLine className="text-gray-400 text-2xl" />
        )}
      </div>
    </div>
  );
};

export default Quiz;
