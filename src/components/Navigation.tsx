import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

const Navigatie: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSearch } = useSearch();
  const { scrollY } = useScroll();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTop, setIsTop] = useState(true);
  
  // Scroll-effecten
  const navBackground = useTransform(
    scrollY,
    [0, 70],
    ["rgba(255, 255, 255, 0.85)", "rgba(255, 255, 255, 0.98)"]
  );
  
  const navShadow = useTransform(
    scrollY,
    [0, 70],
    ["0 1px 3px rgba(0,0,0,0.05)", "0 4px 20px rgba(0,0,0,0.08)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Sluit mobiel menu wanneer locatie verandert
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const menuItems = [
    { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/articles', label: 'Artikelen', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { path: '/interviews', label: 'Interviews', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
    { path: '/health', label: 'Gezondheid', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { path: '/research', label: 'Onderzoek', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { path: '/quiz', label: 'Quiz', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];
  
  return (
    <motion.nav 
      className="sticky top-0 z-50"
      style={{ 
        backgroundColor: navBackground, 
        boxShadow: navShadow,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      }}
      initial={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-lg mr-2 transition-all duration-300 ${isTop ? 'bg-transparent' : 'bg-gradient-to-r from-primary to-accent'}`}>
                  <svg className={`w-6 h-6 ${isTop ? 'text-primary' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-bold text-xl text-primary">
                  Econo<span className="text-accent">Zen</span>
                </span>
              </motion.div>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {/* Menu items */}
            <div className="flex items-center space-x-1 mr-4">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                const hovered = hoveredItem === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    className="relative"
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link 
                      to={item.path} 
                      className={`py-2 px-3 rounded-md flex items-center gap-1.5 relative overflow-hidden ${
                        active 
                          ? 'text-accent font-medium' 
                          : 'text-primary hover:text-accent'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {/* Hover effect background */}
                      <AnimatePresence>
                        {hovered && !active && (
                          <motion.div 
                            className="absolute inset-0 bg-light rounded-md z-0"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Icon */}
                      <motion.svg 
                        className={`w-4 h-4 relative z-10 ${active ? 'text-accent' : 'text-primary'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ scale: active || hovered ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={active ? 2.5 : 2} 
                          d={item.icon} 
                        />
                      </motion.svg>
                      
                      {/* Label */}
                      <span className="relative z-10">{item.label}</span>
                      
                      {/* Active indicator */}
                      {active && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                          layoutId="desktopUnderline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Zoekknop met verbeterde styling */}
            <motion.button 
              onClick={openSearch}
              className="p-2 rounded-full text-gray-600 hover:text-accent hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Zoeken (/ of Ctrl+K)"
              aria-label="Zoeken"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            {/* Sneltoets indicator */}
            <div className="ml-1 hidden lg:flex items-center text-xs text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">
              <span>/</span>
            </div>
          </div>
          
          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Zoekknop op mobiel */}
            <motion.button 
              onClick={openSearch}
              className="p-2 rounded-full text-gray-600 hover:text-accent bg-gray-100 focus:outline-none"
              whileTap={{ scale: 0.95 }}
              aria-label="Zoeken"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            {/* Hamburger menu knop */}
            <motion.button 
              className="p-2 rounded-full text-primary bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.svg 
                    key="close"
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg 
                    key="menu"
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden bg-white border-t border-light shadow-xl rounded-b-2xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="px-3 py-4 space-y-1 sm:px-3 divide-y divide-gray-100"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {menuItems.map((item, index) => {
                const active = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className={index === 0 ? "" : "pt-1"}
                  >
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-3 py-2.5 px-4 rounded-xl ${
                        active 
                          ? 'bg-accent/10 text-accent font-medium' 
                          : 'hover:bg-light/50 text-primary'
                      }`}
                      onClick={toggleMobileMenu}
                      aria-current={active ? 'page' : undefined}
                    >
                      <div className={`p-2 rounded-lg ${active ? 'bg-accent/20' : 'bg-light/50'}`}>
                        <svg className={`w-5 h-5 ${active ? 'text-accent' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d={item.icon} />
                        </svg>
                      </div>
                      <span>{item.label}</span>
                      
                      {active && (
                        <motion.div className="ml-auto">
                          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Extra item in mobiel menu */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="pt-2"
              >
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
                  <h4 className="text-sm font-medium text-primary mb-1">Economisch Burgerschap</h4>
                  <p className="text-xs text-gray-500 mb-2">Ontdek hoe economische kennis bijdraagt aan maatschappelijke participatie.</p>
                  <Link 
                    to="/research"
                    className="text-accent text-xs font-medium flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    Lees meer
                    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigatie;
