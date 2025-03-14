import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../data/articles';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(article => article.id === Number(id));
  
  if (!article) {
    return <Navigate to="/articles" />;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/articles" className="text-accent hover:underline mb-6 inline-block">
        &larr; Back to articles
      </Link>
      
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-600 mb-6">
        By {article.author} • {article.date}
      </p>
      
      <div className="prose max-w-none">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
