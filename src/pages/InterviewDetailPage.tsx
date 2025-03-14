import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { interviews } from '../data/interviews';

const InterviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const interview = interviews.find(interview => interview.id === Number(id));
  
  if (!interview) {
    return <Navigate to="/interviews" />;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/interviews" className="text-accent hover:underline mb-6 inline-block">
        &larr; Back to interviews
      </Link>
      
      {interview.imageUrl && (
        <img 
          src={interview.imageUrl} 
          alt={interview.title} 
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      
      <h1 className="text-3xl font-bold mb-2">{interview.title}</h1>
      <div className="mb-6">
        <p className="text-gray-600 font-medium">
          With {interview.interviewee}
        </p>
        <p className="text-gray-500">
          {interview.role} • {interview.date}
        </p>
      </div>
      
      <div className="prose max-w-none">
        <p>{interview.content}</p>
      </div>
    </div>
  );
};

export default InterviewDetailPage;
