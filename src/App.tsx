import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import InterviewsPage from './pages/InterviewsPage';
import InterviewDetailPage from './pages/InterviewDetailPage';
import HealthPage from './pages/HealthPage';
import ResearchPage from './pages/ResearchPage';
import QuizPage from './pages/QuizPage';
import ReferencesPage from './pages/ReferencesPage';
import { SearchProvider } from './context/SearchContext';
import SearchOverlay from './components/SearchOverlay';

const App: React.FC = () => {
  const location = useLocation();
  
  return (
    <SearchProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-light/20">
        <Layout>
          <SearchOverlay />
          <main className="flex-1 container mx-auto px-4">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:id" element={<ArticleDetailPage />} />
                <Route path="/interviews" element={<InterviewsPage />} />
                <Route path="/interviews/:id" element={<InterviewDetailPage />} />
                <Route path="/health" element={<HealthPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/references" element={<ReferencesPage />} />
              </Routes>
            </AnimatePresence>
          </main>
        </Layout>
      </div>
    </SearchProvider>
  );
};

export default App;
