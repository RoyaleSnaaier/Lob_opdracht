import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SidebarNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In een echte app zou je dit naar een API sturen
      console.log('Nieuwsbrief aanmelding:', email);
    }
  };
  
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden border border-light/20">
      <h3 className="bg-primary text-white py-2 px-4 font-medium">Blijf op de Hoogte</h3>
      
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
            <p className="text-primary font-medium">Bedankt voor je aanmelding!</p>
            <p className="text-sm text-secondary mt-1">We houden je op de hoogte van de laatste artikelen en updates.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-dark text-sm mb-3">
              Abonneer je op onze nieuwsbrief voor wekelijkse updates over economie, gezondheid en duurzaamheid.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="email"
                  placeholder="Jouw e-mailadres"
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
                Abonneren
              </motion.button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarNewsletter;
