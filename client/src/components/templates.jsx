import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("10");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api_category.php");
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    setError(""); // Clear previous errors
    try {
      const url = `http://quizzy-5dpo.onrender.com:5000/quiz?amount=${selectedAmount}&difficulty=${selectedDifficulty}&category=${selectedCategoryId}&type=${selectedType}`;
      const response = await axios.get(url);
      console.log(response.data.results)
      console.log(response.data)
      if (response.data.questions) {
        // Pass questions to QuizPage through state
        navigate("/quiz", { state: { questions: response.data.questions } });
      } else {
        setError("No questions found.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen bg-gray-900 text-white p-4">
      <h1 className="m-10 text-3xl font-bold text-gray-100">Select Your Quiz Parameters</h1>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-semibold mb-2 text-gray-300">Category</label>
          <select
            id="category"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-lg font-semibold mb-2 text-gray-300">Type</label>
          <select
            id="type"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-lg font-semibold mb-2 text-gray-300">Difficulty</label>
          <select
            id="difficulty"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-semibold mb-2 text-gray-300">Number of Questions</label>
          <select
            id="amount"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <button
          onClick={fetchQuestions}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Fetch Questions
        </button>

        {error && (
          <div className="mt-10 text-red-400">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
