import React from 'react';
import { Link } from 'react-router-dom';
import { Interview } from '../types';

interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {interview.imageUrl && (
        <img 
          src={interview.imageUrl} 
          alt={interview.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">{interview.title}</h2>
        <p className="text-gray-600 text-sm mb-1">
          With {interview.interviewee}
        </p>
        <p className="text-gray-500 text-sm mb-2">
          {interview.role} • {interview.date}
        </p>
        <p className="text-gray-700 mb-4">{interview.excerpt}</p>
        <Link 
          to={`/interviews/${interview.id}`} 
          className="text-accent font-medium hover:underline"
        >
          Read interview
        </Link>
      </div>
    </div>
  );
};

export default InterviewCard;
