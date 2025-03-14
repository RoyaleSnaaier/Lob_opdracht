import React from 'react';
import { motion } from 'framer-motion';
import { references } from '../data/references';
import { pageVariants, itemVariants } from '../animations';

const ReferencesPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-2">References & Sources</h1>
        <p className="text-gray-600 text-lg mb-8">
          Academic studies and resources that inform our content
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">About Our Sources</h2>
        <p className="text-gray-700">
          At EconoZen, we're committed to evidence-based content that accurately represents current research. 
          Our articles and features draw from peer-reviewed academic studies, government data, and reports 
          from reputable organizations. Below you'll find the key references that inform our work.
        </p>
      </motion.div>
      
      <div className="space-y-6">
        {references.map((ref, index) => (
          <motion.div 
            key={ref.id} 
            className="bg-white rounded-lg shadow-md p-6"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            custom={index}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <h2 className="text-lg font-bold mb-2">{ref.title}</h2>
            <p className="text-gray-600 mb-1">
              {ref.authors.join(', ')} ({ref.year})
            </p>
            <p className="text-gray-700 italic mb-3">{ref.source}</p>
            <p className="text-gray-700 mb-2">{ref.description}</p>
            
            {ref.url && (
              <motion.a 
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline inline-flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                View source
                <motion.svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-12 bg-gray-50 p-6 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Suggest a Source</h2>
        <p className="text-gray-700 mb-4">
          We're always looking to expand our reference library. If you know of relevant research or 
          resources that could enhance our coverage of economic citizenship, please email us at
          <a href="mailto:research@econozen.com" className="text-accent hover:underline ml-1">
            research@econozen.com
          </a>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ReferencesPage;
