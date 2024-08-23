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
      const url = `http://localhost:5000/quiz?amount=${selectedAmount}&difficulty=${selectedDifficulty}&category=${selectedCategoryId}&type=${selectedType}`;
      const response = await axios.get(url);
      console.log(response.data.results)
      if (response.data.results) {
        // Pass questions to QuizPage through state
        navigate("/quiz", { state: { questions: response.data.results } });
      } else {
        setError("No questions found.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen bg-slate-200 p-4">
      <h1 className="m-10 text-3xl font-bold">Select Your Quiz Parameters</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-semibold mb-2">Category</label>
          <select
            id="category"
            className="w-full p-2 border rounded"
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
          <label htmlFor="type" className="block text-lg font-semibold mb-2">Type</label>
          <select
            id="type"
            className="w-full p-2 border rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-lg font-semibold mb-2">Difficulty</label>
          <select
            id="difficulty"
            className="w-full p-2 border rounded"
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
          <label htmlFor="amount" className="block text-lg font-semibold mb-2">Number of Questions</label>
          <select
            id="amount"
            className="w-full p-2 border rounded"
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Fetch Questions
        </button>

        {error && (
          <div className="mt-10 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

