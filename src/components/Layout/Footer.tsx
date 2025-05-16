import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const linkVariants = {
    hover: { 
      x: 5, 
      color: "#A6685B", 
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-background py-12 relative overflow-hidden">
      {/* Decoratieve elementen */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-accent/50"></div>
      <div className="absolute -top-10 right-16 w-40 h-40 rounded-full bg-accent/40 backdrop-blur-md"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 rounded-full bg-accent/40 backdrop-blur-md"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-white/10 p-2 rounded-lg mr-2">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Econo<span className="text-accent">Zen</span></h2>
            </div>
            
            <p className="mb-5 text-light/90">
              Een educatief platform over economisch burgerschap, ontwikkeld als LOB-opdracht 
              door studenten Software Development aan het ROC Midden Nederland.
            </p>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-5 rounded-lg mt-5 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-white mb-2">Over dit project</h3>
              <p className="text-sm text-light/90 mb-3">
                Deze website is gemaakt als LOB-opdracht (Loopbaanoriëntatie en -begeleiding) 
                door Ingmar van Rheenen en Cinan van de Pol, studenten Software Development aan het ROC Midden Nederland.
              </p>
              <motion.div whileHover={{ x: 5 }}>
                <Link to="/research" className="text-accent hover:underline text-sm flex items-center">
                  Meer over dit project
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="md:col-span-3 md:ml-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Navigatie
            </h3>
            <ul className="space-y-2">
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/articles" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Artikelen
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/interviews" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  Interviews
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/health" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Gezondheid
                </Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/quiz" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quiz
                </Link>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Bronnen & Informatie
            </h3>
            <div className="space-y-3">
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/references" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Bronnen & Referenties
                </Link>
              </motion.div>
              
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/research" className="hover:text-accent flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Onderzoeksmethodologie
                </Link>
              </motion.div>
              
              <div className="mt-8 space-y-3">
                <h4 className="text-sm font-semibold text-white/70 mb-2">Gemaakt door:</h4>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-accent/20 text-white px-2 py-1 rounded-md">Ingmar van Rheenen</span>
                  <span className="text-white/60">&</span>
                  <span className="bg-accent/20 text-white px-2 py-1 rounded-md">Cinan van de Pol</span>
                </div>
                <p className="text-xs text-light/70">
                  Studenten Software Development<br />
                  ROC Midden Nederland, 2023
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 pt-6 border-t border-white/10 text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-light/70">
            &copy; {new Date().getFullYear()} EconoZen | LOB-project Economisch Burgerschap | 
            <span className="italic ml-1">Alle rechten voorbehouden</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
