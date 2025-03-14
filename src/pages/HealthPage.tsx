import React from 'react';
import ArticleCard from '../components/ArticleCard';
import HealthTipCard from '../components/HealthTipCard';
import { healthArticles } from '../data/healthArticles';
import { healthTips } from '../data/healthTips';

const HealthPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Health & Vitality</h1>
      <p className="text-gray-600 text-lg mb-8">
        Exploring the economic dimensions of health and well-being
      </p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Health Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Healthy Lifestyle Tips</h2>
        <p className="text-gray-700 mb-6">
          Incorporate these practical tips into your daily routine to improve your health without breaking the bank.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTips.map(tip => (
            <HealthTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </section>
      
      <section className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">The Economic Value of Good Health</h2>
        <p className="text-gray-700 mb-4">
          Investing in your health today can save significant healthcare costs in the future. Studies show that every 
          dollar spent on preventive health measures can save up to $5-7 in future healthcare costs.
        </p>
        <p className="text-gray-700">
          Moreover, maintaining good health allows for greater workforce participation, higher productivity, and
          a better quality of life—all of which have substantial economic benefits both individually and collectively.
        </p>
      </section>
    </div>
  );
};

export default HealthPage;
