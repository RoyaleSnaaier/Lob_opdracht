import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';

const ArticlesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
