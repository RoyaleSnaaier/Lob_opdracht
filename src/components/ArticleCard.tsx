import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-2">
          By {article.author} • {article.date}
        </p>
        <p className="text-gray-700 mb-4">{article.excerpt}</p>
        <Link 
          to={`/articles/${article.id}`} 
          className="text-accent font-medium hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
