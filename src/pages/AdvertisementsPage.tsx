import React from 'react';
import { motion } from 'framer-motion';
import AdvertisementSlider from '../components/AdvertisementSlider';
import { advertisements } from '../data/advertisements';
import { pageVariants } from '../animations';

const AdvertisementsPage: React.FC = () => {
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
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-4">Reclamematerialen</h1>
        <p className="text-gray-600 mb-8">
          Bekijk onze collectie informatieve posters die economisch burgerschap en financieel bewustzijn promoten.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <AdvertisementSlider advertisements={advertisements} />
      </motion.div>
      
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4">Over Onze Campagnes</h2>
        <p className="text-gray-700">
          Deze digitale posters vertegenwoordigen lopende campagnes gericht op het vergroten van economische 
          geletterdheid en participatie onder burgers van alle leeftijden. Elke campagne richt zich op verschillende 
          aspecten van economisch burgerschap, van financiële educatie tot duurzame consumptie.
        </p>
        <p className="text-gray-700 mt-4">
          Als u geïnteresseerd bent in het gebruik van deze materialen voor educatieve doeleinden of wilt 
          deelnemen aan een van deze initiatieven, neem dan contact met ons op via onze sociale mediakanalen.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AdvertisementsPage;
