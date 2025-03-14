import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Interview } from '../types';
import { cardHoverVariants } from '../animations';

interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  return (
    <motion.div 
      className="bg-background rounded-lg shadow-md overflow-hidden h-50 border border-light/20"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      layout
    >
      {interview.imageUrl && (
        <div className="overflow-hidden">
          <motion.img 
            src={interview.imageUrl} 
            alt={interview.title} 
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
      <div className="p-5 flex flex-col h-50">
        <h2 className="text-xl font-bold mb-2 text-primary">{interview.title}</h2>
        <p className="text-secondary text-sm mb-1">
          With {interview.interviewee}
        </p>
        <p className="text-light text-sm mb-2">
          {interview.role} • {interview.date}
        </p>
        <p className="text-dark mb-4">{interview.excerpt}</p>
        
        {interview.highlightedQuote && (
          <motion.blockquote 
            className="border-l-4 border-accent/30 pl-3 italic text-secondary mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            "{interview.highlightedQuote}"
          </motion.blockquote>
        )}
        
        <motion.div className="mt-auto" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link 
            to={`/interviews/${interview.id}`} 
            className="text-accent font-medium hover:underline inline-flex items-center"
          >
            Read interview
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 3
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewCard;
