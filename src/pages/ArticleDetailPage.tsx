import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../data/articles';
import { healthArticles } from '../data/healthArticles';
import ReactMarkdown from 'react-markdown';
import CommentSection from '../components/CommentSection';
import TableOfContents from '../components/TableOfContents';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Try to find article in both regular and health articles
  const numericId = Number(id);
  const allArticles = [...articles, ...healthArticles];
  const article = allArticles.find(article => article.id === numericId);
  
  // Add IDs to h2 headings for navigation
  useEffect(() => {
    setTimeout(() => {
      const articleContent = document.querySelector('.article-content');
      if (articleContent) {
        const h2Elements = articleContent.querySelectorAll('h2');
        h2Elements.forEach((h2) => {
          const id = h2.textContent?.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') || '';
          h2.id = id;
        });
      }
    }, 100); // Small delay to ensure markdown has rendered
  }, [article]);
  
  if (!article) {
    return <Navigate to="/articles" />;
  }

  return (
    <div className="relative">
      <Link to="/articles" className="text-accent hover:underline mb-6 inline-block">
        &larr; Back to articles
      </Link>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Main content */}
        <div className="lg:col-span-8">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <h1 className="text-3xl font-bold mb-2 text-primary">{article.title}</h1>
          <p className="text-secondary mb-6">
            By {article.author} • {article.date}
          </p>
          
          <div className="prose max-w-full article-content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          
          <CommentSection comments={[]} articleId={article.id} />
        </div>
        
        {/* Sidebar with TOC */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="toc-container">
            <TableOfContents content={article.content} />
          </div>
        </aside>
        
        {/* Mobile TOC - fixed at bottom */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <div className="shadow-lg">
            <TableOfContents content={article.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
