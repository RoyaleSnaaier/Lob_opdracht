import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleCard from '../components/ArticleCard';
import InterviewCard from '../components/InterviewCard';
import SidebarAd from '../components/SidebarAd';
import SidebarNewsletter from '../components/SidebarNewsletter';
import { articles } from '../data/articles';
import { interviews } from '../data/interviews';
import { advertisements } from '../data/advertisements';
import { healthArticles } from '../data/healthArticles';
import { healthTips } from '../data/healthTips';
import { pageVariants, itemVariants, fadeInUpVariants } from '../animations';

// Helper functie voor categorie info
const getCategoryInfo = (category: string) => {
  switch (category.toLowerCase()) {
    case 'economy':
    case 'economie':
      return { 
        color: 'bg-blue-100 text-blue-800',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        ),
        label: 'Economische dimensie'
      };
    case 'gezondheid':
    case 'health':
      return { 
        color: 'bg-green-100 text-green-800',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ),
        label: 'Vitaal burgerschap'
      };
    case 'sociaal':
    case 'social':
      return { 
        color: 'bg-purple-100 text-purple-800',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        ),
        label: 'Sociale dimensie'
      };
    case 'politiek':
    case 'political':
      return { 
        color: 'bg-red-100 text-red-800',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        ),
        label: 'Politieke dimensie'
      };
    case 'recensies':
    case 'reviews':
      return { 
        color: 'bg-orange-100 text-orange-800',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ),
        label: 'Recensies'
      };
    default:
      return { 
        color: 'bg-gray-100 text-gray-800',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        ),
        label: category.charAt(0).toUpperCase() + category.slice(1)
      };
  }
};

const HoofdPagina: React.FC = () => {
  // Toon alleen de nieuwste artikelen en interviews
  const nieuwsteArtikelen = articles.slice(0, 3);
  const nieuwsteInterviews = interviews.slice(0, 2); // Gereduceerd naar 2 voor een betere layout
  const uitgelichteTip = healthTips[0]; // Haal één gezondheidstip op voor de zijbalk
  const uitgelichteArtikel = healthArticles[0]; // Haal één gezondheidsartikel op voor de zijbalk

  // Tel alle artikelen uit verschillende bronnen samen
  const alleArtikelen = [...articles, ...healthArticles];

  // Categorieën voor de snelkoppelingen sectie - verbeterde telling
  const categorieën = [
    {
      category: 'economie', 
      aantal: alleArtikelen.filter(a => 
        a.category.toLowerCase() === 'economie' || 
        a.category.toLowerCase() === 'economy'
      ).length
    },
    {
      category: 'gezondheid', 
      aantal: alleArtikelen.filter(a => 
        a.category.toLowerCase() === 'gezondheid' || 
        a.category.toLowerCase() === 'health'
      ).length
    },
    {
      category: 'recensies', 
      aantal: alleArtikelen.filter(a => 
        a.category.toLowerCase() === 'recensies' || 
        a.category.toLowerCase() === 'reviews'
      ).length
    }
  ];

  // Animatie controles voor secties
  const artikelenControl = useAnimation();
  const interviewsControl = useAnimation();
  const zijbalkControl = useAnimation();
  const heroControl = useAnimation();
  
  // Referenties voor intersection observer
  const [artikelenRef, artikelenInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [interviewsRef, interviewsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [zijbalkRef, zijbalkInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Animeer secties wanneer ze in beeld komen
  useEffect(() => {
    if (artikelenInView) artikelenControl.start("visible");
    if (interviewsInView) interviewsControl.start("visible");
    if (zijbalkInView) zijbalkControl.start("visible");
    if (heroInView) heroControl.start("visible");
  }, [artikelenControl, interviewsControl, zijbalkControl, heroControl, artikelenInView, interviewsInView, zijbalkInView, heroInView]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pb-12"
    >
      {/* Hero Sectie */}
      <motion.section
        ref={heroRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={heroControl}
        className="relative   lg:-mx-96 mb-16 bg-gradient-to-r from-primary to-accent rounded-b-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Economisch Burgerschap
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Ontdek hoe economische kennis en vaardigheden bijdragen aan actief burgerschap 
              in verschillende dimensies van het dagelijks leven.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/articles" 
                className="px-6 py-3 bg-white text-primary rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center"
              >
                Bekijk Artikelen
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/quiz" 
                className="px-6 py-3 bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold hover:bg-white/30 transition-all"
              >
                Test je Kennis
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 md:w-2/5 opacity-20 md:opacity-25">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M47.7,-57.2C59.9,-47.3,67.2,-31.9,70.5,-15.6C73.8,0.7,73.1,17.8,65.4,30.8C57.8,43.8,43.2,52.7,28.2,58.9C13.3,65.1,-2.1,68.5,-15.4,64.5C-28.7,60.4,-39.9,49,-48.1,36.2C-56.2,23.5,-61.3,9.4,-61.2,-4.8C-61.1,-19.1,-55.8,-33.5,-45.6,-43.7C-35.3,-53.9,-20.1,-59.9,-2.9,-57.3C14.3,-54.6,35.5,-67.2,47.7,-57.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </motion.section>
      
      {/* Categorieën Snelkoppelingen */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2 
          className="text-2xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Verken per Thema
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={itemVariants}
          initial="initial"
          animate="animate"
        >
          {categorieën.map((cat, index) => {
            const catInfo = getCategoryInfo(cat.category);
            return (
              <motion.div
                key={cat.category}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-light/10 cursor-pointer"
              >
                <Link to={`/articles?category=${cat.category}`} className="block p-5">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${catInfo.color.split(' ')[0]} bg-opacity-30`}>
                      {catInfo.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">{catInfo.label}</h3>
                      <p className="text-secondary text-sm">{cat.aantal} artikelen</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          
          <motion.div
            variants={itemVariants}
            custom={categorieën.length}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl shadow-md overflow-hidden border border-light/10 cursor-pointer"
          >
            <Link to="/articles" className="block p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-primary">Alle Categorieën</h3>
                  <p className="text-secondary text-sm">Bekijk alles</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Hoofdinhoud Kolom */}
          <div className="lg:col-span-8">
            <motion.section 
              ref={artikelenRef}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={artikelenControl}
              className="mb-16"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary inline-flex items-center">
                  <svg className="w-6 h-6 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                  </svg>
                  Nieuwste Artikelen
                </h2>
                <motion.div 
                  whileHover={{ x: 5 }} 
                  whileTap={{ x: 0 }}
                  className="z-10 relative"
                >
                  <Link to="/articles" className="text-accent hover:underline flex items-center font-medium">
                    Bekijk alle artikelen
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      animate={{ x: 3 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nieuwsteArtikelen.map((artikel, index) => (
                  <motion.div
                    key={artikel.id}
                    variants={itemVariants}
                    custom={index}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ArticleCard article={artikel} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              ref={interviewsRef}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={interviewsControl}
              className="mb-12"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary inline-flex items-center">
                  <svg className="w-6 h-6 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Nieuwste Interviews
                </h2>
                <motion.div 
                  whileHover={{ x: 5 }} 
                  whileTap={{ x: 0 }}
                  className="z-10 relative"
                >
                  <Link to="/interviews" className="text-accent hover:underline flex items-center font-medium">
                    Bekijk alle interviews
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      animate={{ x: 3 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2, delay: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nieuwsteInterviews.map((interview, index) => (
                  <motion.div
                    key={interview.id}
                    variants={itemVariants}
                    custom={index}
                    transition={{ delay: index * 0.1 }}
                    className="hover:-translate-y-1 transition-transform duration-300"
                  >
                    <InterviewCard interview={interview} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
            
            {/* Extra Sectie: Veelgestelde Vragen */}
            <motion.section
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-light/10 to-light/5 rounded-xl p-6 shadow-sm border border-light/20 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center">
                <svg className="w-6 h-6 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Veelgestelde Vragen
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-primary mb-2">Wat is economisch burgerschap?</h3>
                  <p className="text-sm text-gray-700">Economisch burgerschap verwijst naar de kennis, vaardigheden en mogelijkheden die individuen nodig hebben om bewuste economische beslissingen te nemen als consument, werknemer, ondernemer en financieel verantwoordelijk persoon.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-primary mb-2">Hoe beïnvloedt gezondheid onze economische keuzes?</h3>
                  <p className="text-sm text-gray-700">Gezondheid en economie zijn nauw verbonden. Een goede gezondheid stelt mensen in staat productief deel te nemen aan de economie, terwijl economische factoren zoals inkomen en werk grote invloed hebben op gezondheidsuitkomsten en toegang tot zorg.</p>
                </div>
              </div>
            </motion.section>
          </div>
          
          {/* Zijbalk Kolom */}
          <motion.aside 
            className="lg:col-span-4 space-y-8"
            ref={zijbalkRef}
            variants={fadeInUpVariants}
            initial="hidden"
            animate={zijbalkControl}
          >
            {/* Uitgelichte Advertentie */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-light/10 transition-all hover:shadow-lg">
              <h3 className="bg-primary text-white py-3 px-4 font-medium text-sm uppercase tracking-wider">Uitgelichte Campagne</h3>
              {advertisements && advertisements.length > 0 ? (
                <SidebarAd advertisement={advertisements[0]} />
              ) : (
                <p className="p-4 text-sm text-gray-500">Geen advertenties beschikbaar</p>
              )}
            </div>
            
            {/* Nieuwsbrief Inschrijving */}
            <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl shadow-md overflow-hidden border border-light/10 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-primary">Nieuwsbrief</h4>
              </div>
              <p className="text-dark mb-4">Ontvang maandelijks tips en inzichten over economisch burgerschap.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="E-mailadres"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-light/30 focus:border-accent focus:ring-1 focus:ring-accent"
                />
                <button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-lg font-medium transition-all"
                >
                  Inschrijven
                </button>
              </form>
            </div>
            
            {/* Gezondheidstip van de Week */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-light/10 transition-all hover:shadow-lg">
              <h3 className="bg-green-600 text-white py-3 px-4 font-medium text-sm uppercase tracking-wider">Gezondheidstip van de Week</h3>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2.5 rounded-lg mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">{uitgelichteTip.title}</h4>
                    <p className="text-dark text-sm mb-3 line-clamp-3">{uitgelichteTip.content}</p>
                  </div>
                </div>
                <Link 
                  to="/health" 
                  className="text-accent hover:underline text-sm flex items-center mt-2 font-medium"
                >
                  Meer gezondheidstips
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Uitgelicht Gezondheidsartikel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-light/10 transition-all hover:shadow-lg">
              <div className="relative h-32 bg-green-300">
                {uitgelichteArtikel.imageUrl && (
                  <img 
                    src={uitgelichteArtikel.imageUrl}
                    alt={uitgelichteArtikel.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="inline-flex bg-green-600 text-xs px-2.5 py-1 rounded-full font-medium mb-1">
                    Vitaal burgerschap
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-primary mb-2 line-clamp-2">{uitgelichteArtikel.title}</h4>
                <p className="text-dark text-sm mb-3 line-clamp-3">{uitgelichteArtikel.excerpt}</p>
                <Link 
                  to={`/articles/${uitgelichteArtikel.id}`} 
                  className="text-accent hover:underline text-sm flex items-center mt-2 font-medium"
                >
                  Lees artikel
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Snelkoppelingen */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-light/10 transition-all hover:shadow-lg">
              <h3 className="bg-primary text-white py-3 px-4 font-medium text-sm uppercase tracking-wider">Snelkoppelingen</h3>
              <div className="p-5 space-y-3">
                <Link 
                  to="/quiz" 
                  className="flex items-center py-2.5 px-3 hover:bg-light/10 rounded-lg group transition-all"
                >
                  <div className="bg-light/20 p-2 rounded-lg mr-3 group-hover:bg-accent/10 transition-colors">
                    <svg className="w-5 h-5 text-primary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary group-hover:text-accent transition-colors">Consumentengedrag Quiz</p>
                    <p className="text-xs text-secondary">Test je kennis</p>
                  </div>
                </Link>
                <Link 
                  to="/research" 
                  className="flex items-center py-2.5 px-3 hover:bg-light/10 rounded-lg group transition-all"
                >
                  <div className="bg-light/20 p-2 rounded-lg mr-3 group-hover:bg-accent/10 transition-colors">
                    <svg className="w-5 h-5 text-primary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary group-hover:text-accent transition-colors">Onderzoeksinzichten</p>
                    <p className="text-xs text-secondary">Onze methodologie</p>
                  </div>
                </Link>
                <Link 
                  to="/references" 
                  className="flex items-center py-2.5 px-3 hover:bg-light/10 rounded-lg group transition-all"
                >
                  <div className="bg-light/20 p-2 rounded-lg mr-3 group-hover:bg-accent/10 transition-colors">
                    <svg className="w-5 h-5 text-primary group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-primary group-hover:text-accent transition-colors">Bronnen & Referenties</p>
                    <p className="text-xs text-secondary">Academische bronnen</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  );
};

export default HoofdPagina;
