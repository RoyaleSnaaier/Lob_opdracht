import React from 'react';
import { Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

const ResearchPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Research Insights</h1>
      <p className="text-gray-600 text-lg mb-8">
        Recent studies on economic citizenship and its impact on daily life
      </p>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
          alt="Research study" 
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Behavioral Economics and Sustainable Consumption</h2>
          <p className="text-gray-600 mb-4">
            A 2022 study by the Economic Policy Institute
          </p>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              A groundbreaking study published in the Journal of Behavioral Economics examined how subtle nudges in consumer environments can dramatically shift purchasing decisions toward more sustainable options.
            </p>
            
            <p className="mb-4">
              The research, conducted across 50 retail locations in three countries, found that simple interventions like changing default options, rearranging product placement, and adjusting descriptive language led to a 27% increase in environmentally sustainable purchases without price changes.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Key Findings</h3>
            
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">Default options were particularly powerful: When sustainable products were presented as the default choice, selection rates increased by 34%</li>
              <li className="mb-2">Product placement at eye level increased selection of sustainable options by 21% compared to bottom shelf placement</li>
              <li className="mb-2">Descriptive labeling that emphasized community benefits ("Popular choice for environmentally conscious shoppers") outperformed technical environmental information</li>
              <li className="mb-2">The effects were consistent across demographic groups, though slightly stronger among younger consumers</li>
            </ul>
            
            <p className="mb-4">
              These findings suggest that many barriers to sustainable consumption aren't related to consumer attitudes or price sensitivity, but rather to choice architecture and presentation. Retailers and policymakers can leverage these insights to promote more sustainable consumption patterns without limiting consumer choice or imposing financial barriers.
            </p>
            
            <p>
              For more information on this study, see our <Link to="/references" className="text-accent hover:underline">references page</Link>.
            </p>
          </div>
        </div>
      </div>
      
      <CommentSection comments={[]} />
    </div>
  );
};

export default ResearchPage;
