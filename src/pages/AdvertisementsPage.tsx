import React from 'react';
import { motion } from 'framer-motion';
import AdvertisementSlider from '../components/AdvertisementSlider';
import { advertisements } from '../data/advertisements';
import { pageVariants } from '../animations';

const AdvertisementsPage: React.FC = () => {
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
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-4">Advertisement Posters</h1>
        <p className="text-gray-600 mb-8">
          Browse through our collection of informative posters promoting economic citizenship and financial awareness.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <AdvertisementSlider advertisements={advertisements} />
      </motion.div>
      
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4">About Our Campaigns</h2>
        <p className="text-gray-700">
          These digital posters represent ongoing campaigns aimed at increasing economic literacy and participation 
          among citizens of all ages. Each campaign focuses on different aspects of economic citizenship, from financial 
          education to sustainable consumption.
        </p>
        <p className="text-gray-700 mt-4">
          If you're interested in using these materials for educational purposes or would like to participate 
          in any of these initiatives, please contact us through our social media channels.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AdvertisementsPage;
