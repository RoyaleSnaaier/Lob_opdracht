import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

// Helper functie voor categorie kleur en label
const getCategoryInfo = (category?: string) => {
  if (!category) return { color: 'bg-gray-100 text-gray-800', label: 'Onbekend' };
  
  switch (category.toLowerCase()) {
    case 'economy':
    case 'economie':
      return { 
        color: 'bg-blue-100 text-blue-800',
        label: 'Economische dimensie'
      };
    case 'gezondheid':
    case 'health':
      return { 
        color: 'bg-green-100 text-green-800',
        label: 'Vitaal burgerschap'
      };
    case 'sociaal':
    case 'social':
      return { 
        color: 'bg-purple-100 text-purple-800',
        label: 'Sociale dimensie'
      };
    case 'politiek':
    case 'political':
      return { 
        color: 'bg-red-100 text-red-800',
        label: 'Politieke dimensie'
      };
    case 'recensies':
    case 'reviews':
      return { 
        color: 'bg-orange-100 text-orange-800',
        label: 'Recensies'
      };
    default:
      return { 
        color: 'bg-gray-100 text-gray-800',
        label: category.charAt(0).toUpperCase() + category.slice(1)
      };
  }
};

const SearchOverlay: React.FC = () => {
  const { 
    isSearchOpen, 
    closeSearch, 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    loading 
  } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // Focus de zoekinput wanneer de overlay wordt geopend
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Voorkom dat de body kan scrollen als de overlay open is
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  // Genereer willekeurige posities voor de achtergrondvormen
  const bgShapes = [
    { x: '5%', y: '15%', size: 150, color: 'primary', delay: 0 },
    { x: '80%', y: '10%', size: 100, color: 'accent', delay: 0.3 },
    { x: '70%', y: '70%', size: 120, color: 'secondary', delay: 0.5 },
    { x: '15%', y: '65%', size: 80, color: 'accent', delay: 0.2 },
    { x: '50%', y: '55%', size: 60, color: 'primary', delay: 0.7 },
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4 backdrop-blur-md bg-black/40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeSearch}
        >
          {/* Dynamische achtergrondvormen */}
          {bgShapes.map((shape, i) => (
            <motion.div
              key={`shape-${i}`}
              className={`absolute rounded-full opacity-30 bg-${shape.color} filter blur-3xl`}
              initial={{ 
                top: shape.y, 
                left: shape.x, 
                width: 0, 
                height: 0,
                opacity: 0 
              }}
              animate={{
                width: shape.size,
                height: shape.size,
                opacity: 0.15,
                x: [0, 20, -20, 10, 0],
                y: [0, -15, 10, -5, 0]
              }}
              transition={{
                delay: shape.delay,
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          ))}
          
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl w-full max-w-3xl shadow-2xl border border-white/30 overflow-hidden relative z-10"
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decoratieve header patroon */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-purple-500"></div>
            
            {/* Zoekbalk met verbeterde styling */}
            <div className="p-5 flex items-center gap-3 relative bg-white">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: loading ? [0, 360] : 0,
                  scale: loading ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: loading ? Infinity : 0, 
                  ease: "linear" 
                }}
              >
                <svg className={`w-5 h-5 ${loading ? 'text-accent' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.div>
              
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek artikelen en interviews..."
                className="flex-1 outline-none text-lg bg-transparent"
                autoComplete="off"
              />
              
              <div className="flex gap-2">
                {searchQuery && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    whileHover={{ scale: 1.1, rotate: [0, -15, 15, 0] }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    aria-label="Wis zoekopdracht"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
                <div className="border border-light/30 rounded-md px-2 py-1 text-xs text-gray-500 flex items-center bg-gray-50 shadow-inner">
                  ESC
                </div>
              </div>
            </div>

            {/* Zoekresultaten met moderne styling */}
            <div 
              className="max-h-[65vh] overflow-y-auto p-4 perspective"
              style={{ perspective: "800px" }}
            >
              {loading ? (
                <div className="flex flex-col justify-center items-center py-12">
                  <motion.div 
                    className="relative w-16 h-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary opacity-50"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5],
                        rotate: 360
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut" 
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-accent opacity-70"
                      animate={{ 
                        scale: [1.1, 0.9, 1.1],
                        opacity: [0.7, 0.3, 0.7],
                        rotate: -360
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut" 
                      }}
                    />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-primary text-sm font-medium">Zoeken...</span>
                    </motion.div>
                  </motion.div>
                  <motion.p
                    className="text-gray-500 mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                  >
                    Doorzoeken van artikelen en interviews
                  </motion.p>
                </div>
              ) : searchQuery && searchResults.length === 0 ? (
                <motion.div 
                  className="py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                    <motion.svg 
                      className="w-8 h-8 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M12 14a3 3 0 100-6 3 3 0 000 6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">Geen resultaten gevonden voor "{searchQuery}"</p>
                  <p className="text-gray-400 mt-2">Probeer andere zoektermen of een bredere zoekopdracht</p>
                </motion.div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={`${result.type}-${result.id}`}
                      initial={{ opacity: 0, y: 20, rotateX: -15 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0, 
                        z: hoverIndex === index ? 20 : 0
                      }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -4,
                        rotateX: 5
                      }}
                      onHoverStart={() => setHoverIndex(index)}
                      onHoverEnd={() => setHoverIndex(null)}
                      className="transform-gpu"
                    >
                      <Link
                        to={result.type === 'article' ? `/articles/${result.id}` : `/interviews/${result.id}`}
                        onClick={closeSearch}
                        className="block relative p-0 rounded-xl overflow-hidden bg-white border border-light/30 hover:border-light/50 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Achtergrondkleur glow effect gebaseerd op categorie */}
                        {result.type === 'article' && result.category && (
                          <div 
                            className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity`}
                            style={{ 
                              background: `radial-gradient(circle at center, ${
                                result.category.toLowerCase().includes('economie') ? '#3B82F6' :
                                result.category.toLowerCase().includes('gezondheid') ? '#10B981' :
                                result.category.toLowerCase().includes('sociaal') ? '#8B5CF6' :
                                result.category.toLowerCase().includes('politiek') ? '#EF4444' :
                                result.category.toLowerCase().includes('recensies') ? '#F59E0B' : '#6B7280'
                              }, transparent 70%)`
                            }}
                          />
                        )}
                        
                        <div className="flex p-4">
                          {/* Afbeeldingssectie met hover effect */}
                          <div className="mr-4 relative flex-shrink-0">
                            {result.imageUrl ? (
                              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden">
                                <motion.img 
                                  src={result.imageUrl} 
                                  alt={result.title}
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.5 }}
                                />
                                <motion.div 
                                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0"
                                  animate={{ 
                                    opacity: hoverIndex === index ? 0.6 : 0
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  {result.type === 'article' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  )}
                                </svg>
                              </div>
                            )}
                            
                            {/* Kleine animatie-indicator bij hover */}
                            <motion.div 
                              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center"
                              animate={{ 
                                scale: hoverIndex === index ? [1, 1.2, 1] : 1,
                              }}
                              transition={{ duration: 1, repeat: hoverIndex === index ? Infinity : 0 }}
                            >
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-accent"
                                animate={{ 
                                  scale: hoverIndex === index ? [1, 0.8, 1] : 1,
                                }}
                                transition={{ duration: 1, repeat: hoverIndex === index ? Infinity : 0 }}
                              />
                            </motion.div>
                          </div>

                          {/* Inhoudssectie */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-primary line-clamp-1 group-hover:text-accent transition-colors">
                                {result.title}
                              </h3>
                              
                              {/* Categorie-label met animatie */}
                              <div className="flex items-center">
                                {result.type === 'article' && result.category && (
                                  <motion.span 
                                    className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ml-1 whitespace-nowrap ${getCategoryInfo(result.category).color}`}
                                    whileHover={{ y: -2 }}
                                  >
                                    <motion.span 
                                      className="w-1.5 h-1.5 rounded-full bg-current inline-block"
                                      animate={{ 
                                        scale: hoverIndex === index ? [1, 1.5, 1] : 1,
                                      }}
                                      transition={{ 
                                        duration: 1.5, 
                                        repeat: hoverIndex === index ? Infinity : 0 
                                      }}
                                    />
                                    {getCategoryInfo(result.category).label}
                                  </motion.span>
                                )}
                                
                                {result.type === 'interview' && (
                                  <motion.span 
                                    className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1"
                                    whileHover={{ y: -2 }}
                                  >
                                    <motion.span 
                                      className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"
                                      animate={{ 
                                        scale: hoverIndex === index ? [1, 1.5, 1] : 1,
                                      }}
                                      transition={{ 
                                        duration: 1.5, 
                                        repeat: hoverIndex === index ? Infinity : 0 
                                      }}
                                    />
                                    Interview
                                  </motion.span>
                                )}
                              </div>
                            </div>
                            
                            {/* Details van het resultaat */}
                            {result.interviewee && (
                              <p className="text-sm text-gray-600 mt-1">
                                Interview met <span className="font-medium">{result.interviewee}</span>
                              </p>
                            )}
                            
                            {result.excerpt && (
                              <p className="text-sm text-gray-600 line-clamp-1 mt-1">{result.excerpt}</p>
                            )}
                            
                            {/* Relevantie indicator - visueel element */}
                            <motion.div 
                              className="h-0.5 bg-gradient-to-r from-primary/40 to-accent/20 rounded-full w-full mt-2 scale-x-0 origin-left"
                              animate={{ scaleX: hoverIndex === index ? 1 : 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Zoektips met verbeterde styling */}
            <motion.div 
              className="p-4 border-t border-light/10 bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Tip:</span> Gebruik 
                  <kbd className="mx-1.5 px-1.5 py-0.5 bg-white rounded border border-light/20 shadow-sm text-xs">/</kbd> 
                  of 
                  <kbd className="mx-1.5 px-1.5 py-0.5 bg-white rounded border border-light/20 shadow-sm text-xs">Ctrl + K</kbd>
                </p>
                
                <motion.button
                  onClick={closeSearch}
                  className="text-accent hover:text-accent/80 font-medium text-sm flex items-center"
                  whileHover={{ x: -3 }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Sluiten
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
