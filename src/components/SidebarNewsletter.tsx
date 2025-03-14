import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SidebarNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real app, you would send this to an API
      console.log('Newsletter signup:', email);
    }
  };
  
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden border border-light/20">
      <h3 className="bg-primary text-white py-2 px-4 font-medium">Stay Updated</h3>
      
      <div className="p-4">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-2"
          >
            <svg className="w-12 h-12 mx-auto text-accent mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-primary font-medium">Thanks for subscribing!</p>
            <p className="text-sm text-secondary mt-1">We'll keep you informed about the latest articles and updates.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-dark text-sm mb-3">
              Subscribe to our newsletter for weekly updates on economics, health, and sustainability.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-2 border border-light rounded-md text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-accent text-white py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarNewsletter;
