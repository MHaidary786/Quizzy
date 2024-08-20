import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoTriangle } from "react-icons/io5";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { FaSquare, FaCircle } from "react-icons/fa";
import { BiSolidPolygon } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { FaSave } from "react-icons/fa";
import "./styles.css";
import axios from "axios";
// import "beercss";
// import "material-dynamic-colors";

const Quiz = () => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);

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
    // Implement the logic to save the quiz, e.g., sending data to the backend
    console.log({ quizName, questions });
    try {
      axios.post("http://localhost:4000/quiz/add", {quizName, questions})
    .then(e => {
      console.log(e.data)
    })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        quizName={quizName}
        setQuizName={setQuizName}
        onSaveQuiz={handleSaveQuiz}
      />
      <div className="flex flex-1">
        <Sidebar
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          addQuestion={addQuestion}
        />
        <div className="flex flex-col items-center justify-center flex-1 bg-lightgreen py-12">
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

const Navbar = ({ quizName, setQuizName, onSaveQuiz }) => (
  <div className="navbar">
    <div className="navbar-left">
      <h1 className="navbar-title">Quiz App</h1>
      <input
        name="quizName"
        type="text"
        className="quiz-title-input"
        placeholder="Enter Quiz Title ..."
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
      />
      <Link to={"templates"}><button className="btn btn-outline btn-info">Use Templates</button></Link>
    </div>
    <div className="navbar-right ">
      <Link to="/">
        <button class="btn btn-info gap-5 text-white">
          <i>home</i>
          <span>Exit</span>
        </button>
      </Link>

      <button class="btn btn-success gap-5 text-white" onClick={onSaveQuiz}>
        <i>save</i>
        <span>Save</span>
      </button>
    </div>
  </div>
);

const Sidebar = ({ questions, onDeleteQuestion, addQuestion }) => (
  <>
    <div className="sidebar flex flex-col">
      {questions.map((_, index) => (
        <div key={index} className="sidebar-question relative">
          <h1 className="sidebar-question-title">Question {index + 1}</h1>
          <button
            onClick={() => onDeleteQuestion(index)}
            className="btn-delete absolute top-1 right-1 text-3xl hover:text-red-600"
          >
            <TiDelete />
          </button>
        </div>
      ))}
      
      <button class="circle primary large" onClick={addQuestion}>
        <i>add</i>
        <div class="tooltip">Add Question</div>
      </button>
    </div>
  </>
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
    <div className="question-container">
      <div className="question-input-container">
        <input
          type="text"
          placeholder="Insert your question..."
          className="question-input"
          value={question.text}
          onChange={handleTextChange}
        />
      </div>
      <div className="options-grid">
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
    <div className="option-container">
      <div className={`option-icon ${iconMap[optIndex].bgColor}`}>
        {React.createElement(iconMap[optIndex].icon, { className: "icon" })}
      </div>
      <input
        type="text"
        placeholder={`answer ${optIndex + 1}`}
        className="option-input"
        value={option}
        onChange={(e) => onOptionChange(e.target.value)}
      />
      <div onClick={onCorrectAnswerChange}>
        {checked ? (
          <RiCheckboxCircleFill className="checkbox-checked" />
        ) : (
          <RiCheckboxBlankCircleLine className="checkbox-unchecked" />
        )}
      </div>
    </div>
  );
};

export default Quiz;
