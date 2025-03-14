import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import InterviewCard from '../components/InterviewCard';
import { articles } from '../data/articles';
import { interviews } from '../data/interviews';

const HomePage: React.FC = () => {
  // Show only the latest articles and interviews
  const latestArticles = articles.slice(0, 3);
  const latestInterviews = interviews.slice(0, 3);

  return (
    <div>
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <Link to="/articles" className="text-accent hover:underline">
            View all articles
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Interviews</h2>
          <Link to="/interviews" className="text-accent hover:underline">
            View all interviews
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestInterviews.map(interview => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
