import React from 'react';
import Navigation from '../Navigation';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header>
      <Navigation />
      {isHomePage ? (
        <div 
          className="bg-cover bg-center py-24 relative overflow-hidden" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          {/* Animated overlay with gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.h1 
              className="text-5xl font-bold mb-4 text-background"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Economic Citizenship
            </motion.h1>
            
            <motion.p 
              className="text-xl text-light max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Exploring the intersection of economics, health, and civic responsibility in our modern society.
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a 
                href="#latest-content" 
                className="bg-accent hover:bg-accent/90 text-background px-6 py-3 rounded-full font-medium inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Content
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    repeatDelay: 0.5 
                  }}
                >
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div 
          className="bg-primary text-background py-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.h1 
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              EconoZen Magazine
            </motion.h1>
            <motion.p 
              className="text-xl text-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Economics, health, and citizenship for modern living.
            </motion.p>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
