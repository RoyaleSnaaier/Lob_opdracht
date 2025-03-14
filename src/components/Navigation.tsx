import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Articles' },
    { path: '/interviews', label: 'Interviews' },
    { path: '/health', label: 'Health & Vitality' },
    { path: '/research', label: 'Research' },
    { path: '/quiz', label: 'Quiz' },
  ];
  
  return (
    <nav className="bg-background/90 backdrop-blur-sm shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link to="/" className="flex items-center py-5 px-2">
                <motion.span 
                  className="font-bold text-xl text-accent"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  EconoZen
                </motion.span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={item.path} 
                    className={`py-5 px-3 relative ${isActive(item.path) ? 'text-accent' : 'text-primary hover:text-accent'}`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <motion.button 
              className="focus:outline-none"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6 fill-current text-gray-500" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path} 
                  className={`block py-2 px-4 ${isActive(item.path) ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-200'}`}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
