import React from 'react';
import InterviewCard from '../components/InterviewCard';
import { interviews } from '../data/interviews';

const InterviewsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Interviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map(interview => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default InterviewsPage;
