import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Advertisement } from '../types';

interface AdvertisementSliderProps {
  advertisements: Advertisement[];
}

const AdvertisementSlider: React.FC<AdvertisementSliderProps> = ({ advertisements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [advertisements.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative h-[500px]">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div 
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full h-full"
            >
              {/* Advertisement image with parallax effect */}
              <motion.img 
                src={advertisements[currentIndex].imageUrl} 
                alt={advertisements[currentIndex].title} 
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6 }}
              />
              
              {/* Overlay with content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.h2 
                  className="text-2xl font-bold mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {advertisements[currentIndex].title}
                </motion.h2>
                <motion.p 
                  className="text-lg mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {advertisements[currentIndex].description}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows */}
          <motion.button 
            onClick={goToPrevious} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Previous advertisement"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button 
            onClick={goToNext} 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Next advertisement"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {advertisements.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-accent' : 'bg-gray-300'
            }`}
            aria-label={`Go to advertisement ${index + 1}`}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              backgroundColor: index === currentIndex ? '#4299e1' : '#d1d5db'
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSlider;
