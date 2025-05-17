import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from '../types';
import { buttonVariants } from '../animations';

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
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, 0] }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {score}/{questions.length}
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold mb-4 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Quiz Completed!
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score === questions.length 
            ? 'Perfect score! Excellent understanding of consumer behavior.' 
            : score >= questions.length / 2 
              ? 'Good job! You have a solid grasp of consumer behavior concepts.' 
              : 'Keep learning! Understanding consumer behavior can help you make better economic decisions.'}
        </motion.p>
        
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={restartQuiz}
            className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-full"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Take Quiz Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <motion.div 
          className="px-3 py-1 bg-accent/10 rounded-full text-accent font-medium"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          Question {currentQuestionIndex + 1} of {questions.length}
        </motion.div>
        
        <motion.div 
          className="px-3 py-1 bg-gray-100 rounded-full font-medium"
        >
          Score: 
          <motion.span 
            className="ml-1 text-accent"
            key={score}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {score}
          </motion.span>
          /{currentQuestionIndex}
        </motion.div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2 
            className="text-xl font-bold mb-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentQuestion.question}
          </motion.h2>
          
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleOptionSelect(index)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedOptionIndex === index
                    ? isAnswerSubmitted
                      ? index === currentQuestion.correctAnswerIndex
                        ? 'bg-green-100 border-green-500 shadow-md'
                        : 'bg-red-100 border-red-500 shadow-md'
                      : 'bg-blue-100 border-blue-500 shadow-md'
                    : isAnswerSubmitted && index === currentQuestion.correctAnswerIndex
                    ? 'bg-green-100 border-green-500 shadow-md'
                    : 'hover:bg-gray-50 hover:border-gray-300 border-gray-200'
                }`}
                whileHover={!isAnswerSubmitted ? { scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" } : {}}
                whileTap={!isAnswerSubmitted ? { scale: 0.98 } : {}}
              >
                {option}
                {isAnswerSubmitted && index === currentQuestion.correctAnswerIndex && (
                  <motion.div 
                    className="float-right text-green-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, 0] }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
                {isAnswerSubmitted && selectedOptionIndex === index && index !== currentQuestion.correctAnswerIndex && (
                  <motion.div 
                    className="float-right text-red-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {isAnswerSubmitted && (
            <motion.div 
              className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-medium text-primary mb-1">Explanation:</p>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <motion.button
        onClick={handleSubmitAnswer}
        disabled={selectedOptionIndex === null}
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          selectedOptionIndex !== null
            ? 'bg-accent text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
        variants={buttonVariants}
        whileHover={selectedOptionIndex !== null ? "hover" : undefined}
        whileTap={selectedOptionIndex !== null ? "tap" : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isAnswerSubmitted ? 'Next Question' : 'Submit Answer'}
      </motion.button>
    </motion.div>
  );
};

export default Quiz;
