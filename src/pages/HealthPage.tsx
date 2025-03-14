import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleCard from '../components/ArticleCard';
import HealthTipCard from '../components/HealthTipCard';
import { healthArticles } from '../data/healthArticles';
import { healthTips } from '../data/healthTips';
import { pageVariants, fadeInUpVariants } from '../animations';

const HealthPage: React.FC = () => {
  const articlesControl = useAnimation();
  const tipsControl = useAnimation();
  const summaryControl = useAnimation();
  
  const [articlesRef, articlesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [tipsRef, tipsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [summaryRef, summaryInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    if (articlesInView) articlesControl.start("visible");
    if (tipsInView) tipsControl.start("visible");
    if (summaryInView) summaryControl.start("visible");
  }, [articlesControl, tipsControl, summaryControl, articlesInView, tipsInView, summaryInView]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Health & Vitality</h1>
        <p className="text-gray-600 text-lg mb-8">
          Exploring the economic dimensions of health and well-being
        </p>
      </motion.div>
      
      <motion.section 
        ref={articlesRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={articlesControl}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Featured Health Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <motion.section
        ref={tipsRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={tipsControl}
      >
        <h2 className="text-2xl font-bold mb-6">Healthy Lifestyle Tips</h2>
        <p className="text-gray-700 mb-6">
          Incorporate these practical tips into your daily routine to improve your health without breaking the bank.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTips.map((tip, index) => (
            <HealthTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </motion.section>
      
      <motion.section
        ref={summaryRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={summaryControl}
        className="mt-12 bg-blue-50 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">The Economic Value of Good Health</h2>
        <p className="text-gray-700 mb-4">
          Investing in your health today can save significant healthcare costs in the future. Studies show that every 
          dollar spent on preventive health measures can save up to $5-7 in future healthcare costs.
        </p>
        <p className="text-gray-700">
          Moreover, maintaining good health allows for greater workforce participation, higher productivity, and
          a better quality of life—all of which have substantial economic benefits both individually and collectively.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default HealthPage;
