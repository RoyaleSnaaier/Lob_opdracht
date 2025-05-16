import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { cardHoverVariants } from '../animations';

interface ArticleCardProps {
  article: Article;
}

// Helper functie voor categorie kleur en label
const getCategoryInfo = (category: string) => {
  switch (category.toLowerCase()) {
    case 'economy':
    case 'economie':
      return { 
        color: 'bg-blue-100 text-blue-800',
        label: 'Economische dimensie'
      };
    case 'gezondheid':
    case 'health':
      return { 
        color: 'bg-green-100 text-green-800',
        label: 'Vitaal burgerschap'
      };
    case 'sociaal':
    case 'social':
      return { 
        color: 'bg-purple-100 text-purple-800',
        label: 'Sociale dimensie'
      };
    case 'politiek':
    case 'political':
      return { 
        color: 'bg-red-100 text-red-800',
        label: 'Politieke dimensie'
      };
    case 'recensies':
    case 'reviews':
      return { 
        color: 'bg-orange-100 text-orange-800',
        label: 'Recensies'
      };
    default:
      return { 
        color: 'bg-gray-100 text-gray-800',
        label: category.charAt(0).toUpperCase() + category.slice(1)
      };
  }
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const categoryInfo = getCategoryInfo(article.category);

  return (
    <motion.div 
      className="bg-background rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-light/20"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {article.imageUrl && (
        <div className="overflow-hidden h-48 flex-shrink-0 relative">
          <motion.img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          {/* Categorie badge toevoegen */}
          <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded ${categoryInfo.color}`}>
            {categoryInfo.label}
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 text-primary line-clamp-2">{article.title}</h2>
        <p className="text-secondary text-sm mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          {article.author} • 
          <svg className="w-4 h-4 mx-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {article.date}
        </p>
        <p className="text-dark mb-4 line-clamp-3 text-sm">{article.excerpt}</p>
        <div className="mt-auto pt-3 border-t border-light/20">
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link 
              to={`/articles/${article.id}`} 
              className="text-accent hover:text-accent/80 font-medium inline-flex items-center group"
              aria-label={`Read more about ${article.title}`}
            >
              Read more
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
