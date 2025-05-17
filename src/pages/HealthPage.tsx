import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArticleCard from '../components/ArticleCard';
import HealthTipCard from '../components/HealthTipCard';
import { healthArticles } from '../data/healthArticles';
import { healthTips } from '../data/healthTips';
import { pageVariants, fadeInUpVariants } from '../animations';

const HealthPage: React.FC = () => {
  const articlesControl = useAnimation();
  const tipsControl = useAnimation();
  const summaryControl = useAnimation();
  
  const [articlesRef, articlesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [tipsRef, tipsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [summaryRef, summaryInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    if (articlesInView) articlesControl.start("visible");
    if (tipsInView) tipsControl.start("visible");
    if (summaryInView) summaryControl.start("visible");
  }, [articlesControl, tipsControl, summaryControl, articlesInView, tipsInView, summaryInView]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Gezondheid & Vitaliteit</h1>
        <p className="text-gray-600 text-lg mb-8">
          Een verkenning van de economische dimensies van gezondheid en welzijn
        </p>
      </motion.div>
      
      <motion.section 
        ref={articlesRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={articlesControl}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Uitgelichte Gezondheidsartikelen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex flex-col h-full"
            >
              <ArticleCard article={article} />
              {article.references && (
                <div className="mt-3 text-xs text-gray-500">
                  <p className="font-semibold mb-1">Bronnen:</p>
                  <ul className="list-disc pl-4">
                    {article.references.slice(0, 2).map((ref, i) => (
                      <li key={i} className="mb-1">{ref}</li>
                    ))}
                    {article.references.length > 2 && (
                      <li className="italic">en {article.references.length - 2} meer...</li>
                    )}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <motion.section
        ref={tipsRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={tipsControl}
      >
        <h2 className="text-2xl font-bold mb-6">Gezonde Leefstijl Tips</h2>
        <p className="text-gray-700 mb-6">
          Integreer deze praktische tips in je dagelijkse routine om je gezondheid te verbeteren zonder je budget te belasten.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTips.map((tip, index) => (
            <HealthTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </motion.section>
      
      <motion.section
        ref={summaryRef}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={summaryControl}
        className="mt-12 bg-blue-50 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">De Economische Waarde van Goede Gezondheid</h2>
        <p className="text-gray-700 mb-4">
          Investeren in je gezondheid vandaag kan aanzienlijke zorgkosten in de toekomst besparen. Studies tonen aan dat elke euro besteed aan 
          preventieve gezondheidsmaatregelen tot €5-7 kan besparen aan toekomstige zorgkosten.
        </p>
        <p className="text-gray-700">
          Bovendien zorgt het behouden van een goede gezondheid voor grotere arbeidsparticipatie, hogere productiviteit en een betere 
          levenskwaliteit—allemaal met substantiële economische voordelen, zowel individueel als collectief.
        </p>
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-semibold">Bronnen:</p>
          <ul className="list-disc pl-6 mt-1">
            <li>RIVM. (2022). Preventie en zorgkosten: Economische analyses. Rijksinstituut voor Volksgezondheid en Milieu.</li>
            <li>CBS. (2022). Gezondheid en economische participatie: Statistische verbanden. Centraal Bureau voor de Statistiek.</li>
          </ul>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HealthPage;
