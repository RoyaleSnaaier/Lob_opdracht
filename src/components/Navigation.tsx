import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link to="/" className="flex items-center py-5 px-2">
                <span className="font-bold text-xl text-accent">EconoZen</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`py-5 px-3 ${isActive('/') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Home
              </Link>
              <Link 
                to="/articles" 
                className={`py-5 px-3 ${isActive('/articles') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Articles
              </Link>
              <Link 
                to="/interviews" 
                className={`py-5 px-3 ${isActive('/interviews') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Interviews
              </Link>
              <Link 
                to="/advertisements" 
                className={`py-5 px-3 ${isActive('/advertisements') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Ad Posters
              </Link>
              <Link 
                to="/health" 
                className={`py-5 px-3 ${isActive('/health') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Health & Vitality
              </Link>
              <Link 
                to="/research" 
                className={`py-5 px-3 ${isActive('/research') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Research
              </Link>
              <Link 
                to="/quiz" 
                className={`py-5 px-3 ${isActive('/quiz') ? 'text-accent border-b-2 border-accent' : 'text-gray-700 hover:text-accent'}`}
              >
                Quiz
              </Link>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="focus:outline-none" onClick={toggleMobileMenu}>
              <svg className="h-6 w-6 fill-current text-gray-500" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/articles" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Articles</Link>
        <Link to="/interviews" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Interviews</Link>
        <Link to="/advertisements" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Ad Posters</Link>
        <Link to="/health" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Health & Vitality</Link>
        <Link to="/research" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Research</Link>
        <Link to="/quiz" className="block py-2 px-4 text-gray-700 hover:bg-gray-200" onClick={toggleMobileMenu}>Quiz</Link>
      </div>
    </nav>
  );
};

export default Navigation;
