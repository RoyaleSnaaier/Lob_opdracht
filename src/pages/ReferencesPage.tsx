import React from 'react';
import { references } from '../data/references';

const ReferencesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">References & Sources</h1>
      <p className="text-gray-600 text-lg mb-8">
        Academic studies and resources that inform our content
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">About Our Sources</h2>
        <p className="text-gray-700">
          At EconoZen, we're committed to evidence-based content that accurately represents current research. 
          Our articles and features draw from peer-reviewed academic studies, government data, and reports 
          from reputable organizations. Below you'll find the key references that inform our work.
        </p>
      </div>
      
      <div className="space-y-6">
        {references.map(ref => (
          <div key={ref.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-2">{ref.title}</h2>
            <p className="text-gray-600 mb-1">
              {ref.authors.join(', ')} ({ref.year})
            </p>
            <p className="text-gray-700 italic mb-3">{ref.source}</p>
            <p className="text-gray-700 mb-2">{ref.description}</p>
            
            {ref.url && (
              <a 
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                View source
              </a>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Suggest a Source</h2>
        <p className="text-gray-700 mb-4">
          We're always looking to expand our reference library. If you know of relevant research or 
          resources that could enhance our coverage of economic citizenship, please email us at 
          <a href="mailto:research@econozen.com" className="text-accent hover:underline ml-1">
            research@econozen.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ReferencesPage;
