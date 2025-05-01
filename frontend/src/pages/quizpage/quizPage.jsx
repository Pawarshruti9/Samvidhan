import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizQuestions } from '../../data/quizQuestions';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/navbar.jsx';
import './quizPage.css';

const QuizPage = () => {
  const { moduleName } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Load questions based on module name
    const moduleQuestions = quizQuestions[moduleName] || [];
    setQuestions(moduleQuestions);
  }, [moduleName]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const updateProgress = async () => {
    try {
      // Update progress
      const response = await axios.post(
        'http://localhost:4000/api/users/updateprogress',
        { 
          moduleName: moduleName,
          status: 'completed'
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        // Refresh user data
        await axios.get('http://localhost:4000/api/users/getcurrentuser', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        toast.success('Module completed successfully!');
      } else {
        toast.error(response.data.message || 'Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update progress');
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      // Check if score is 50% or more
      const percentage = (score / questions.length) * 100;
      if (percentage >= 50) {
        updateProgress();
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="quiz-container">Loading questions...</div>
      </>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <>
        <Navbar />
        <div className="quiz-container">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} out of {questions.length} ({percentage.toFixed(1)}%)</p>
          {percentage >= 50 ? (
            <p className="success-message">Congratulations! You've completed this module!</p>
          ) : (
            <p className="try-again-message">You need at least 50% to complete the module. Try again!</p>
          )}
          <div className="quiz-buttons">
            <button onClick={handleRestart}>Try Again</button>
            <button onClick={handleGoToHome}>Go to Home</button>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2>{moduleName.replace(/-/g, ' ').toUpperCase()} Quiz</h2>
        <div className="question-container">
          <p className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <h3 className="question-text">{currentQuestion.question}</h3>
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="quiz-buttons">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
