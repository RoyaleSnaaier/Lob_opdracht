import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TableOfContentsProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Extract h2 headings from markdown content
  useEffect(() => {
    const h2Regex = /^## (.+)$/gm;
    const headings: TocItem[] = [];
    let match;
    
    // Find all h2 headings in the content
    while ((match = h2Regex.exec(content)) !== null) {
      const text = match[1].trim();
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      headings.push({ id, text });
    }
    
    setTocItems(headings);
    
    // Initialize intersection observer after a small delay to ensure DOM elements exist
    setTimeout(() => {
      const observerOptions = {
        rootMargin: '-80px 0px -40% 0px', // Adjust these values to control when sections are considered "active"
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      }, observerOptions);

      // Observe all h2 elements
      document.querySelectorAll('h2[id]').forEach(section => {
        observer.observe(section);
      });

      return () => {
        observer.disconnect();
      };
    }, 300);
  }, [content]);
  
  // Mobile collapse behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint in tailwind
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Scroll to the section when TOC item is clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate header offset to ensure section isn't hidden under header
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveId(id);
      
      // Auto-collapse on mobile after selecting section
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    }
  };
  
  if (tocItems.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="bg-background/90 backdrop-blur-sm rounded-lg shadow-lg border border-light/20 sticky top-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.button 
        className="w-full flex justify-between items-center p-4 text-lg font-bold border-b border-light/20 hover:bg-light/10 transition-colors duration-200 lg:cursor-default text-primary"
        onClick={() => window.innerWidth < 1024 && setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center">
          <motion.svg 
            className="w-5 h-5 text-accent mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            animate={isCollapsed ? { rotate: 0 } : { rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </motion.svg>
          Contents
        </span>
        {window.innerWidth < 1024 && (
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        )}
      </motion.button>
      
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            className="overflow-hidden max-h-[calc(100vh-150px)] overflow-y-auto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="p-4 space-y-2">
              {tocItems.map((item, index) => (
                <motion.li 
                  key={item.id} 
                  className="group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left w-full py-2 pl-3 pr-2 rounded-md transition-all duration-200 
                      ${activeId === item.id 
                        ? 'bg-accent/10 text-accent font-medium shadow-sm' 
                        : 'hover:bg-light/20 text-dark'
                      }`}
                    aria-current={activeId === item.id ? 'location' : undefined}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center">
                      <motion.span 
                        className={`rounded-full mr-2 transition-all duration-300 
                          ${activeId === item.id 
                            ? 'bg-accent' 
                            : 'bg-secondary group-hover:bg-primary'
                          }`}
                        initial={{ width: activeId === item.id ? 8 : 4, height: activeId === item.id ? 8 : 4 }}
                        animate={{ 
                          width: activeId === item.id ? 8 : 4,
                          height: activeId === item.id ? 8 : 4
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className={`${activeId === item.id ? 'text-accent' : 'text-dark'}`}>
                        {item.text}
                      </span>
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
            
            <div className="p-3 bg-gray-50 text-center text-sm text-gray-500 border-t border-gray-100">
              <motion.button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="flex items-center justify-center w-full hover:text-accent transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to top
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TableOfContents;
