import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { articles } from '../data/articles';
import { interviews } from '../data/interviews';
import { healthArticles } from '../data/healthArticles';
import { Article, Interview } from '../types';

interface SearchResult {
  type: 'article' | 'interview';
  id: number;
  title: string;
  excerpt?: string;
  category?: string;
  interviewee?: string;
  imageUrl?: string;
}

interface SearchContextProps {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  loading: boolean;
}

const SearchContext = createContext<SearchContextProps>({
  isSearchOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  searchResults: [],
  loading: false,
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Combineer alle artikelen
  const allArticles = [...articles, ...healthArticles];

  // Zoekfunctie
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    // Simuleer een kleine vertraging voor een betere UX
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();

      // Zoek in artikelen
      const articleResults: SearchResult[] = allArticles
        .filter(article => 
          article.title.toLowerCase().includes(query) || 
          article.excerpt.toLowerCase().includes(query) ||
          (article.author && article.author.toLowerCase().includes(query)) ||
          (article.content && article.content.toLowerCase().includes(query))
        )
        .map(article => ({
          type: 'article',
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          imageUrl: article.imageUrl
        }));

      // Zoek in interviews
      const interviewResults: SearchResult[] = interviews
        .filter(interview => 
          interview.title.toLowerCase().includes(query) || 
          interview.excerpt.toLowerCase().includes(query) ||
          (interview.interviewee && interview.interviewee.toLowerCase().includes(query)) ||
          (interview.content && interview.content.toLowerCase().includes(query))
        )
        .map(interview => ({
          type: 'interview',
          id: interview.id,
          title: interview.title,
          interviewee: interview.interviewee,
          excerpt: interview.excerpt,
          imageUrl: interview.imageUrl
        }));

      // Combineer en limiteer resultaten
      setSearchResults([...articleResults, ...interviewResults].slice(0, 15));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handler voor sneltoetsen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open zoekoverlay met '/' of Ctrl+K
      if (
        (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) || 
        (e.key === 'k' && (e.ctrlKey || e.metaKey))
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      } 
      
      // Sluit met Escape
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        searchQuery,
        setSearchQuery,
        searchResults,
        loading
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
