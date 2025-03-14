import React from 'react';
import { motion } from 'framer-motion';
import { HealthTip } from '../types';

interface HealthTipCardProps {
  tip: HealthTip;
}

const HealthTipCard: React.FC<HealthTipCardProps> = ({ tip }) => {
  return (
    <motion.div 
      className="bg-background rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-light/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {tip.imageUrl && (
        <div className="overflow-hidden h-48 flex-shrink-0 relative">
          <motion.img 
            src={tip.imageUrl} 
            alt={tip.title} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute top-0 right-0 p-2">
            <div className="inline-flex items-center bg-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium">
              Health Tip
            </div>
          </div>
        </div>
      )}
      <motion.div 
        className="p-5 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-2 flex-shrink-0">
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.h3 
            className="text-lg font-bold text-primary line-clamp-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {tip.title}
          </motion.h3>
        </motion.div>
        <motion.p 
          className="text-dark line-clamp-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {tip.content}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default HealthTipCard;
