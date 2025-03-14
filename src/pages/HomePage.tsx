import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleCard from '../components/ArticleCard';
import InterviewCard from '../components/InterviewCard';
import { articles } from '../data/articles';
import { interviews } from '../data/interviews';
import { pageVariants, itemVariants, fadeInUpVariants } from '../animations';

const HomePage: React.FC = () => {
  // Show only the latest articles and interviews
  const latestArticles = articles.slice(0, 3);
  const latestInterviews = interviews.slice(0, 3);

  // Animation controls for sections
  const articlesControl = useAnimation();
  const interviewsControl = useAnimation();
  
  // References for intersection observer
  const [articlesRef, articlesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [interviewsRef, interviewsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Animate sections when they come into view
  useEffect(() => {
    if (articlesInView) {
      articlesControl.start("visible");
    }
  }, [articlesControl, articlesInView]);
  
  useEffect(() => {
    if (interviewsInView) {
      interviewsControl.start("visible");
    }
  }, [interviewsControl, interviewsInView]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      id="latest-content"
    >
      <motion.section 
        ref={articlesRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={articlesControl}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Latest Articles</h2>
          <motion.div 
            whileHover={{ x: 5 }} 
            whileTap={{ x: 0 }}
            className="z-10 relative"
          >
            <Link to="/articles" className="text-accent hover:underline flex items-center font-medium">
              View all articles
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: 3 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        ref={interviewsRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={interviewsControl}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Latest Interviews</h2>
          <motion.div 
            whileHover={{ x: 5 }} 
            whileTap={{ x: 0 }}
            className="z-10 relative"
          >
            <Link to="/interviews" className="text-accent hover:underline flex items-center font-medium">
              View all interviews
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: 3 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8, delay: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestInterviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              variants={itemVariants}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <InterviewCard interview={interview} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
