import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { FaInfoCircle } from "react-icons/fa"; // For the help icon
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./quizPage.css";

// Dummy questions for UI testing (replace with backend data)
const dummyQuestions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correctAnswer: "Delhi",
  },
  {
    question: "Who wrote the Indian Constitution?",
    options: ["Mahatma Gandhi", "B.R. Ambedkar", "Nehru", "Sardar Patel"],
    correctAnswer: "B.R. Ambedkar",
  },
  // Add more questions
];

const QuizPage = () => {
  const navigate = useNavigate();
  const { moduleName } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: option });
  };

  // Handle next and previous
  const nextQuestion = () => {
    if (currentQuestion < dummyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const updateProgress = async (status) => {
    try {
      console.log('Updating progress with:', { moduleName, status });
      const response = await axios.post(
        'http://localhost:4000/api/users/updateprogress',
        { moduleName, status },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Progress update response:', response.data);
      if (response.data.success) {
        toast.success('Progress updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update progress');
    }
  };

  // Finish Quiz
  const finishQuiz = async () => {
    let correct = 0;
    dummyQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setShowResult(true);

    // Update progress to completed if score is passing
    if (correct >= dummyQuestions.length / 2) {
      await updateProgress('completed');
    }
  };

  return (
    <div className="quiz-page">
      <Navbar />
      <ToastContainer />

      {/* Progress & Help Section */}
      <div className="quiz-header">
        <FaInfoCircle className="help-icon" title="Quiz Instructions" />
        <p>
          Questions Solved: {Object.keys(selectedAnswers).length}/{dummyQuestions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="quiz-question-card">
        <h3>{dummyQuestions[currentQuestion].question}</h3>
        <div className="quiz-options">
          {dummyQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedAnswers[currentQuestion] === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="quiz-buttons">
          {currentQuestion > 0 && (
            <button onClick={prevQuestion} className="prev-btn">⬅️ Previous</button>
          )}
          {currentQuestion < dummyQuestions.length - 1 ? (
            <button onClick={nextQuestion} className="next-btn">Next ➡️</button>
          ) : (
            <button onClick={finishQuiz} className="finish-btn">Finish Quiz</button>
          )}
        </div>
      </div>

      {/* Result Popup */}
        {showResult && (
        <div className="quiz-result-overlay">
            <div className="quiz-result-card">
            <span className="close-btn" onClick={() => navigate("/")}>✖</span>
            <h2>{score >= dummyQuestions.length / 2 ? "🎉 Congratulations!" : "❌ Better Luck Next Time!"}</h2>
            <p>{score >= dummyQuestions.length / 2 ? "You Passed the Quiz!" : "You Failed the Quiz."}</p>

            {/* Result Statistics */}
            <div className="quiz-stats">
                <div className="quiz-stat-card">
                <h3>{dummyQuestions.length}</h3>
                <p>Total Questions</p>
                </div>
                <div className="quiz-stat-card">
                <h3>{score}</h3>
                <p>Correct Answers</p>
                </div>
                <div className="quiz-stat-card">
                <h3>{dummyQuestions.length - score}</h3>
                <p>Wrong Answers</p>
                </div>
            </div>
            </div>
        </div>
        )}

    </div>
  );
};

export default QuizPage;
