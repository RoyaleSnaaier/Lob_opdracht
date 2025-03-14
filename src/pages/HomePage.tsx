import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleCard from '../components/ArticleCard';
import InterviewCard from '../components/InterviewCard';
import AdvertisementSlider from '../components/AdvertisementSlider';
import SidebarAd from '../components/SidebarAd';
import SidebarNewsletter from '../components/SidebarNewsletter';
import { articles } from '../data/articles';
import { interviews } from '../data/interviews';
import { advertisements } from '../data/advertisements';
import { healthArticles } from '../data/healthArticles';
import { healthTips } from '../data/healthTips';
import { pageVariants, itemVariants, fadeInUpVariants } from '../animations';

const HomePage: React.FC = () => {
  // Show only the latest articles and interviews
  const latestArticles = articles.slice(0, 3);
  const latestInterviews = interviews.slice(0, 2); // Reduced to 2 for better layout
  const featuredHealthTip = healthTips[0]; // Get one health tip for sidebar
  const featuredHealthArticle = healthArticles[0]; // Get one health article for sidebar

  // Animation controls for sections
  const articlesControl = useAnimation();
  const interviewsControl = useAnimation();
  const sidebarControl = useAnimation();
  
  // References for intersection observer
  const [articlesRef, articlesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [interviewsRef, interviewsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [sidebarRef, sidebarInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Animate sections when they come into view
  useEffect(() => {
    if (articlesInView) articlesControl.start("visible");
    if (interviewsInView) interviewsControl.start("visible");
    if (sidebarInView) sidebarControl.start("visible");
  }, [articlesControl, interviewsControl, sidebarControl, articlesInView, interviewsInView, sidebarInView]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      id="latest-content"
      className="lg:grid lg:grid-cols-12 lg:gap-8"
    >
      {/* Main Content Column */}
      <div className="lg:col-span-8">
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
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          className="mb-12"
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
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
      
      {/* Sidebar Column */}
      <motion.aside 
        className="lg:col-span-4 space-y-8"
        ref={sidebarRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={sidebarControl}
      >
        {/* Featured Advertisement */}
        <div className="mb-8 bg-background rounded-lg shadow-md overflow-hidden border border-light/20">
          <h3 className="bg-primary text-white py-2 px-4 font-medium">Featured Campaign</h3>
          <SidebarAd advertisement={advertisements[0]} />
        </div>
        
        {/* Newsletter Signup */}
        <SidebarNewsletter />
        
        {/* Health Tip */}
        <div className="bg-background rounded-lg shadow-md overflow-hidden border border-light/20">
          <h3 className="bg-accent text-white py-2 px-4 font-medium">Health Tip of the Week</h3>
          <div className="p-4">
            <h4 className="font-bold text-primary mb-2">{featuredHealthTip.title}</h4>
            <p className="text-dark text-sm mb-3 line-clamp-3">{featuredHealthTip.content}</p>
            <Link 
              to="/health" 
              className="text-accent hover:underline text-sm flex items-center"
            >
              More health tips
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="bg-background rounded-lg shadow-md overflow-hidden border border-light/20">
          <h3 className="bg-primary text-white py-2 px-4 font-medium">Quick Links</h3>
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/quiz" 
                  className="text-primary hover:text-accent flex items-center transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Consumer Behavior Quiz
                </Link>
              </li>
              <li>
                <Link 
                  to="/research" 
                  className="text-primary hover:text-accent flex items-center transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Research Insights
                </Link>
              </li>
              <li>
                <Link 
                  to="/references" 
                  className="text-primary hover:text-accent flex items-center transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  References & Sources
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
};

export default HomePage;
