import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { cardHoverVariants } from '../animations';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <motion.div 
      className="bg-background rounded-lg shadow-md overflow-hidden h-50 border border-light/20"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      layout
    >
      {article.imageUrl && (
        <div className="overflow-hidden">
          <motion.img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
      <div className="p-5 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-2 text-primary">{article.title}</h2>
        <p className="text-secondary text-sm mb-2">
          By {article.author} • {article.date}
        </p>
        <p className="text-dark mb-4">{article.excerpt}</p>
        <motion.div className="mt-auto" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link 
            to={`/articles/${article.id}`} 
            className="text-accent hover:underline inline-flex items-center font-medium"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            Read more
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 3
              }}
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
