import React from 'react';
import { motion } from 'framer-motion';
import { Advertisement } from '../types';

interface SidebarAdProps {
  advertisement: Advertisement;
}

const SidebarAd: React.FC<SidebarAdProps> = ({ advertisement }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={advertisement.imageUrl} 
          alt={advertisement.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold mb-1">{advertisement.title}</h3>
          <p className="text-sm text-light/90 mb-2 line-clamp-2">{advertisement.description}</p>
          <motion.button 
            className="bg-accent/90 hover:bg-accent text-white text-xs py-1 px-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarAd;
