import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';
import { pageVariants, itemVariants } from '../animations';

const ArticlesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Krijg alle unieke categorieën
  const categories = useMemo(() => {
    const allCategories = articles.map(article => article.category.toLowerCase());
    return ['all', ...Array.from(new Set(allCategories))];
  }, []);

  // Filter artikelen op basis van de geselecteerde categorie
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter(article => article.category.toLowerCase() === activeCategory);
  }, [activeCategory]);

  // Helper voor categorie labels
  const getCategoryLabel = (category: string) => {
    switch (category.toLowerCase()) {
      case 'all':
        return 'Alle artikelen';
      case 'economy':
      case 'economie':
        return 'Economische dimensie';
      case 'gezondheid':
      case 'health':
        return 'Vitaal burgerschap';
      case 'sociaal':
      case 'social':
        return 'Sociale dimensie';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Artikelen
      </motion.h1>
      
      {/* Categoriefilters */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-light/20 text-dark hover:bg-light/40'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={pageVariants}
      >
        {filteredArticles.map((article, index) => (
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

      {filteredArticles.length === 0 && (
        <motion.p 
          className="text-center text-secondary py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Er zijn geen artikelen gevonden in deze categorie.
        </motion.p>
      )}
    </motion.div>
  );
};

export default ArticlesPage;
