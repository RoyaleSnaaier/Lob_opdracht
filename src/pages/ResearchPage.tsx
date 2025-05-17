import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CommentSection from '../components/CommentSection';
import { pageVariants, fadeInUpVariants } from '../animations';

const ResearchPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-2 text-primary">Research Insights</h1>
        <p className="text-secondary text-lg mb-8">
          Recent studies on economic citizenship and its impact on daily life
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-background rounded-lg shadow-md overflow-hidden mb-12 border border-light/20"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <motion.img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
          alt="Research study" 
          className="w-full h-64 object-cover"
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">Behavioral Economics and Sustainable Consumption</h2>
          <p className="text-secondary mb-4">
            A 2022 study by the Economic Policy Institute
          </p>
          
          <div className="prose max-w-none text-dark">
            <motion.p 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A groundbreaking study published in the Journal of Behavioral Economics examined how subtle nudges in consumer environments can dramatically shift purchasing decisions toward more sustainable options.
            </motion.p>
            
            <motion.p 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The research, conducted across 50 retail locations in three countries, found that simple interventions like changing default options, rearranging product placement, and adjusting descriptive language led to a 27% increase in environmentally sustainable purchases without price changes.
            </motion.p>
            
            <motion.h3 
              className="text-xl font-bold mt-6 mb-3 text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Key Findings
            </motion.h3>
            
            <motion.ul 
              className="list-disc pl-5 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <li className="mb-2">Default options were particularly powerful: When sustainable products were presented as the default choice, selection rates increased by 34%</li>
              <li className="mb-2">Product placement at eye level increased selection of sustainable options by 21% compared to bottom shelf placement</li>
              <li className="mb-2">Descriptive labeling that emphasized community benefits ("Popular choice for environmentally conscious shoppers") outperformed technical environmental information</li>
              <li className="mb-2">The effects were consistent across demographic groups, though slightly stronger among younger consumers</li>
            </motion.ul>
            
            <motion.p 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              These findings suggest that many barriers to sustainable consumption aren't related to consumer attitudes or price sensitivity, but rather to choice architecture and presentation. Retailers and policymakers can leverage these insights to promote more sustainable consumption patterns without limiting consumer choice or imposing financial barriers.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              For more information on this study, see our <Link to="/references" className="text-accent hover:underline">references page</Link>.
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      <CommentSection comments={[]} />
    </motion.div>
  );
};

export default ResearchPage;
