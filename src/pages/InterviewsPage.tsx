import React from 'react';
import { motion } from 'framer-motion';
import InterviewCard from '../components/InterviewCard';
import { interviews } from '../data/interviews';
import { pageVariants, itemVariants } from '../animations';

const InterviewsPage: React.FC = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Interviews
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={pageVariants}
      >
        {interviews.map((interview, index) => (
          <motion.div
            key={interview.id}
            variants={itemVariants}
            custom={index}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <InterviewCard interview={interview} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InterviewsPage;
