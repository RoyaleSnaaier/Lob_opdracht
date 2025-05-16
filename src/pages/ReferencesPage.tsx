import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { references } from '../data/references';
import { articles } from '../data/articles';
import { healthArticles } from '../data/healthArticles';
import { pageVariants, itemVariants } from '../animations';

const BronnenPagina: React.FC = () => {
  // Verzamel alle artikelbronnen
  const artikelBronnen = useMemo(() => {
    const alleBronnen: Record<string, string[]> = {};
    
    // Verzamel bronnen van reguliere artikelen
    articles.forEach(artikel => {
      if (artikel.references && artikel.references.length > 0) {
        alleBronnen[artikel.title] = artikel.references;
      }
    });
    
    // Verzamel bronnen van gezondheidsartikelen
    healthArticles.forEach(artikel => {
      if (artikel.references && artikel.references.length > 0) {
        alleBronnen[artikel.title] = artikel.references;
      }
    });
    
    return alleBronnen;
  }, []);

  // Tel het totaal aantal bronnen
  const totaalAantalBronnen = useMemo(() => {
    return Object.values(artikelBronnen).reduce((total, refs) => total + refs.length, 0) + references.length;
  }, [artikelBronnen]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Bronnen & Referenties</h1>
        <p className="text-gray-600 text-lg mb-8">
          Wetenschappelijke studies en bronnen die onze inhoud onderbouwen
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Over Onze Bronnen</h2>
        <p className="text-gray-700">
          Bij onze LOB-opdracht over economisch burgerschap zijn we toegewijd aan het leveren van 
          evidence-based content dat de huidige onderzoeken accuraat weergeeft. 
          Onze artikelen en kenmerken zijn gebaseerd op peer-reviewed academische studies, 
          overheidsgegevens en rapporten van gerenommeerde organisaties. 
          In totaal hebben we {totaalAantalBronnen} bronnen gebruikt in dit project.
        </p>
      </motion.div>
      
      {/* Bronnen per artikel */}
      <h2 className="text-2xl font-bold mb-4">Bronnen per Artikel</h2>
      <div className="space-y-6 mb-10">
        {Object.entries(artikelBronnen).map(([titel, bronnen], index) => (
          <motion.div 
            key={`artikel-${index}`} 
            className="bg-white rounded-lg shadow-md p-6"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            custom={index}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <h3 className="text-lg font-bold mb-2">{titel}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {bronnen.map((bron, bIndex) => (
                <li key={bIndex} className="text-gray-700 text-sm">{bron}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      {/* Andere referenties */}
      <h2 className="text-2xl font-bold mb-4">Algemene Bronnen</h2>
      <div className="space-y-6">
        {references.map((ref, index) => (
          <motion.div 
            key={ref.id} 
            className="bg-white rounded-lg shadow-md p-6"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            custom={index}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <h2 className="text-lg font-bold mb-2">{ref.title}</h2>
            <p className="text-gray-600 mb-1">
              {ref.authors.join(', ')} ({ref.year})
            </p>
            <p className="text-gray-700 italic mb-3">{ref.source}</p>
            <p className="text-gray-700 mb-2">{ref.description}</p>
            
            {ref.url && (
              <motion.a 
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline inline-flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Bekijk bron
                <motion.svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-12 bg-gray-50 p-6 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Contact voor Bronnen</h2>
        <p className="text-gray-700 mb-4">
          Voor vragen over onze bronnen of suggesties voor aanvullend onderzoek, 
          kunt u contact opnemen via onze docenten of direct met ons via 
          <a href="mailto:lob-project@studenten.rocmn.nl" className="text-accent hover:underline ml-1">
            lob-project@studenten.rocmn.nl
          </a>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BronnenPagina;
