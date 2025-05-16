import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageVariants, itemVariants } from '../animations';

const OnderzoekPagina: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-2">Over Ons Onderzoek</h1>
        <p className="text-gray-600 text-lg mb-8">
          Inzichten en methodologie achter dit LOB-project
        </p>
      </motion.div>
      
      {/* Over het project sectie */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Over Dit LOB-Project</h2>
        <p className="text-gray-700 mb-4">
          Deze website is ontwikkeld als onderdeel van een Loopbaanoriëntatie en -begeleiding (LOB) project 
          voor de opleiding Software Development aan het ROC Midden Nederland. Het doel van dit project is om 
          het concept 'economisch burgerschap' te verkennen en te presenteren op een interactieve en informatieve manier.
        </p>
        <p className="text-gray-700 mb-4">
          Door middel van artikelen, interviews en interactieve elementen wordt de rol van economische kennis 
          en vaardigheden in het dagelijks leven onderzocht. Het project integreert verschillende dimensies 
          van burgerschap, waaronder economisch, politiek, sociaal en vitaal (gezondheid) burgerschap, om een 
          volledig beeld te geven van wat het betekent om een geïnformeerde burger te zijn in de huidige 
          complexe economische omgeving.
        </p>
        <p className="text-gray-700">
          Alle inhoud op deze site is zorgvuldig onderzocht en gebaseerd op betrouwbare bronnen, die te vinden zijn 
          op onze <span className="font-bold text-primary">insane romilige</span> <Link to="/references" className="text-accent hover:underline">Bronnen & Referenties</Link> pagina.
        </p>
      </motion.div>
      
      {/* Onderzoekers sectie */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={itemVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        {/* Ingmar profiel */}
        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden"
          variants={itemVariants}
        >
          <div className="bg-primary/10 p-6">
        <h3 className="text-xl font-bold text-primary mb-2">Ingmar</h3>
        <p className="text-gray-700 font-medium">Software Development Student</p>
        <p className="text-gray-600 text-sm">ROC Midden Nederland</p>
          </div>
          <div className="p-6">
        <p className="text-gray-700 mb-4">
          Als student Software Development aan het ROC Midden Nederland heb ik een sterke interesse in 
          het snijvlak van technologie en maatschappelijke vraagstukken. Voor dit LOB-project heb ik mij 
          vooral gericht op het onderzoeken en schrijven over economisch burgerschap en de invloed daarvan 
          op het dagelijks leven.
        </p>
        <p className="text-gray-700">
          Mijn technische vaardigheden in webontwikkeling hebben bijgedragen aan de bouw van deze 
          interactieve website, terwijl mijn analytische benadering hielp bij het structureren van de 
          complexe onderwerpen die hier worden behandeld.
        </p>
          </div>
        </motion.div>
        
        {/* Cinan profiel */}
        <motion.div 
          className="bg-white rounded-lg shadow-md overflow-hidden"
          variants={itemVariants}
        >
          <div className="bg-accent/10 p-6">
        <h3 className="text-xl font-bold text-accent mb-2">Cinan</h3>
        <p className="text-gray-700 font-medium">Software Development Student</p>
        <p className="text-gray-600 text-sm">ROC Midden Nederland</p>
          </div>
          <div className="p-6">
        <p className="text-gray-700 mb-4">
          Als student Software Development aan het ROC Midden Nederland breng ik een creatieve 
          benadering naar dit project. Ik heb me gespecialiseerd in het onderzoeken van de gezondheidsaspecten 
          (vitaal burgerschap) en hoe deze samenhangen met economische keuzes en welzijn.
        </p>
        <p className="text-gray-700">
          Met mijn focus op gebruikerservaring en toegankelijkheid heb ik ervoor gezorgd dat de complexe 
          onderwerpen op deze website begrijpelijk en aantrekkelijk worden gepresenteerd voor een breed publiek. 
          Mijn aandacht voor detail komt terug in zowel de inhoud als de technische implementatie.
        </p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Methodologie sectie */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Onze proberen een goed onderzoek te doen</h2>
        <p className="text-gray-700 mb-6">
          Voor dit project hebben we een systematische aanpak gebruikt om betrouwbare en relevante informatie te verzamelen:
        </p>
        <ul className="space-y-3 text-gray-700 list-disc pl-5">
          <li>
            <span className="font-medium">Literatuuronderzoek:</span> We hebben wetenschappelijke artikelen, 
            overheidsrapporten en publicaties van gerenommeerde instituten bestudeerd.
          </li>
          <li>
            <span className="font-medium">Data-analyse:</span> Waar mogelijk hebben we statistische gegevens 
            gebruikt om onze bevindingen te onderbouwen.
          </li>
          <li>
            <span className="font-medium">Expert interviews:</span> We hebben interviews gehouden met professionals 
            in relevante vakgebieden om praktijkinzichten te verkrijgen.
          </li>
          <li>
            <span className="font-medium">Toegepaste kennis:</span> We hebben concepten vertaald naar praktische 
            voorbeelden die relevant zijn voor het dagelijks leven.
          </li>
        </ul>
      </motion.div>
      
      {/* Leerdoelen sectie */}
      <motion.div 
        className="bg-blue-50 rounded-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Persoonlijke Leerdoelen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">Ingmar</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li>Verbeteren van UI/UX ontwerpvaardigheden</li>
              <li>Verdiepen in economische aspecten van burgerschap</li>
              <li>Verbeteren van onderzoeksvaardigheden</li>
              <li>Ontwikkelen van een responsive website</li>
              <li>Leren vertalen van complexe concepten naar begrijpelijke content</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent mb-3">Cinan</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li>Onderzoeken van de relatie tussen economie en gezondheid</li>
              <li>Optimaliseren van websiteprestaties</li>
              <li>Ontwikkelen van content die educatief en boeiend is</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnderzoekPagina;
