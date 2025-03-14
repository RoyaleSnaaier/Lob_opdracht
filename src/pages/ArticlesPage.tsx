import React from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';
import { pageVariants, itemVariants } from '../animations';

const ArticlesPage: React.FC = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Articles
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={pageVariants}
      >
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            custom={index}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ArticlesPage;
