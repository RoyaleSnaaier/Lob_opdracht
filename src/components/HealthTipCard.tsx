import React from 'react';
import { HealthTip } from '../types';

interface HealthTipCardProps {
  tip: HealthTip;
}

const HealthTipCard: React.FC<HealthTipCardProps> = ({ tip }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {tip.imageUrl && (
        <img 
          src={tip.imageUrl} 
          alt={tip.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
        <p className="text-gray-700">{tip.content}</p>
      </div>
    </div>
  );
};

export default HealthTipCard;
