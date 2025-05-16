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
      className="bg-background rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-light/20"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {interview.imageUrl && (
        <div className="overflow-hidden h-48 flex-shrink-0 relative">
          <motion.img 
            src={interview.imageUrl} 
            alt={interview.title} 
            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3">
            <div className="inline-flex items-center bg-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
              Interview
            </div>
          </div>
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 text-primary line-clamp-2">{interview.title}</h2>
        <div className="mb-3">
          <p className="text-secondary text-sm font-medium">
            With {interview.interviewee}
          </p>
          <p className="text-light text-xs">
            {interview.role} • {interview.date}
          </p>
        </div>
        <p className="text-dark mb-4 line-clamp-3 text-sm">{interview.excerpt}</p>
        
        {interview.highlightedQuote && (
          <motion.blockquote 
            className="border-l-4 border-accent/30 pl-3 italic text-secondary mb-4 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            "{interview.highlightedQuote}"
          </motion.blockquote>
        )}
        
        <div className="mt-auto pt-3 border-t border-light/20">
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link 
              to={`/interviews/${interview.id}`} 
              className="text-accent hover:text-accent/80 font-medium inline-flex items-center group"
              aria-label={`Read interview with ${interview.interviewee}`}
            >
              Read interview
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 group-hover:ml-2 transition-all"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewCard;
