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
    >
      {tip.imageUrl && (
        <div className="overflow-hidden">
          <motion.img 
            src={tip.imageUrl} 
            alt={tip.title} 
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
      <motion.div 
        className="p-5 flex-grow bg-gradient-to-b from-background to-light/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3 
          className="text-lg font-bold mb-2 text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {tip.title}
        </motion.h3>
        <motion.p 
          className="text-dark"
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
