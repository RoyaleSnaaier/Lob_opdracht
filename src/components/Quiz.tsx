import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOptionIndex(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;

    if (!isAnswerSubmitted) {
      if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
        setScore(score + 1);
      }
      setIsAnswerSubmitted(true);
    } else {
      // Go to next question or finish quiz
      const nextQuestionIndex = currentQuestionIndex + 1;
      
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOptionIndex(null);
        setIsAnswerSubmitted(false);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-4">
          Your score: <span className="font-bold">{score}</span> out of {questions.length}
        </p>
        <p className="mb-6">
          {score === questions.length ? 'Perfect score! Excellent understanding of consumer behavior.' : 
           score >= questions.length / 2 ? 'Good job! You have a solid grasp of consumer behavior concepts.' :
           'Keep learning! Understanding consumer behavior can help you make better economic decisions.'}
        </p>
        <button
          onClick={restartQuiz}
          className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span className="text-gray-600">Score: {score}/{currentQuestionIndex}</span>
      </div>
      
      <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
      
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`p-3 rounded-lg border cursor-pointer ${
              selectedOptionIndex === index
                ? isAnswerSubmitted
                  ? index === currentQuestion.correctAnswerIndex
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : 'bg-blue-100 border-blue-500'
                : isAnswerSubmitted && index === currentQuestion.correctAnswerIndex
                ? 'bg-green-100 border-green-500'
                : 'hover:bg-gray-100'
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      
      {isAnswerSubmitted && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Explanation:</p>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}
      
      <button
        onClick={handleSubmitAnswer}
        disabled={selectedOptionIndex === null}
        className={`w-full py-2 px-4 rounded font-medium ${
          selectedOptionIndex !== null
            ? 'bg-accent hover:bg-accent/90 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isAnswerSubmitted ? 'Next Question' : 'Submit Answer'}
      </button>
    </div>
  );
};

export default Quiz;
