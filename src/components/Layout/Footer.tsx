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
    <footer className="bg-primary text-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-4">EconoZen</h2>
            <p className="mb-4">Exploring the economic dimension of citizenship</p>
            <motion.div whileHover={{ x: 5 }}>
              <Link to="/references" className="text-accent hover:underline">References & Sources</Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/articles" className="hover:text-accent">Articles</Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/interviews" className="hover:text-accent">Interviews</Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/health" className="hover:text-accent">Health & Vitality</Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/quiz" className="hover:text-accent">Consumer Behavior Quiz</Link>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((platform, i) => (
                <motion.a 
                  key={platform}
                  href="#" 
                  className="text-light hover:text-accent"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-8 border-t border-light/20 text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-light">&copy; {new Date().getFullYear()} EconoZen Magazine. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
