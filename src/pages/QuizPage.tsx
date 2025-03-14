import React from 'react';
import Quiz from '../components/Quiz';
import { quizQuestions } from '../data/quizQuestions';

const QuizPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Consumer Behavior Quiz</h1>
      <p className="text-gray-600 text-lg mb-8">
        Test your knowledge about economic decision-making and consumer psychology
      </p>
      
      <div className="mb-8">
        <p className="text-gray-700">
          Understanding how we make economic decisions can help us become more informed consumers and citizens. 
          This quiz covers concepts from behavioral economics, consumer psychology, and health economics.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Quiz questions={quizQuestions} />
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Why This Matters</h2>
        <p className="text-gray-700 mb-4">
          Many of our economic decisions happen automatically, influenced by environmental cues, social factors, 
          and cognitive shortcuts we may not be aware of. By understanding these influences, we can make more 
          intentional choices that align with our actual priorities and values.
        </p>
        <p className="text-gray-700">
          The questions in this quiz highlight how our economic environment shapes our behavior—and how policy, 
          design, and personal awareness can help create healthier and more sustainable outcomes.
        </p>
      </div>
    </div>
  );
};

export default QuizPage;
