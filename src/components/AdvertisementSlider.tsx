import React, { useState } from 'react';
import { Advertisement } from '../types';

interface AdvertisementSliderProps {
  advertisements: Advertisement[];
}

const AdvertisementSlider: React.FC<AdvertisementSliderProps> = ({ advertisements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          {/* Advertisement image */}
          <img 
            src={advertisements[currentIndex].imageUrl} 
            alt={advertisements[currentIndex].title} 
            className="w-full h-[500px] object-cover"
          />
          
          {/* Overlay with content */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{advertisements[currentIndex].title}</h2>
            <p className="text-lg mb-4">{advertisements[currentIndex].description}</p>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={goToPrevious} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Previous advertisement"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext} 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Next advertisement"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {advertisements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-accent' : 'bg-gray-300'
            }`}
            aria-label={`Go to advertisement ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSlider;
