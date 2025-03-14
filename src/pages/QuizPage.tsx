import React from 'react';
import { motion } from 'framer-motion';
import Quiz from '../components/Quiz';
import { quizQuestions } from '../data/quizQuestions';
import { pageVariants, fadeInUpVariants } from '../animations';

const QuizPage: React.FC = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-primary">Consumer Behavior Quiz</h1>
        <p className="text-secondary text-lg mb-8">
          Test your knowledge about economic decision-making and consumer psychology
        </p>
      </motion.div>
      
      <motion.div 
        className="mb-8"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <p className="text-dark">
          Understanding how we make economic decisions can help us become more informed consumers and citizens. 
          This quiz covers concepts from behavioral economics, consumer psychology, and health economics.
        </p>
      </motion.div>
      
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Quiz questions={quizQuestions} />
      </motion.div>
      
      <motion.div 
        className="mt-12 bg-background p-6 rounded-lg border border-light/20"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 text-primary">Why This Matters</h2>
        <p className="text-dark mb-4">
          Many of our economic decisions happen automatically, influenced by environmental cues, social factors, 
          and cognitive shortcuts we may not be aware of. By understanding these influences, we can make more 
          intentional choices that align with our actual priorities and values.
        </p>
        <p className="text-dark">
          The questions in this quiz highlight how our economic environment shapes our behavior—and how policy, 
          design, and personal awareness can help create healthier and more sustainable outcomes.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QuizPage;
