import React from 'react';
import { motion } from 'framer-motion';
import Quiz from '../components/Quiz';
import { quizQuestions } from '../data/quizQuestions';
import { pageVariants, fadeInUpVariants } from '../animations';

const QuizPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-2 text-primary">Consumentengedrag Quiz</h1>
        <p className="text-secondary text-lg mb-8">
          Test je kennis over economische besluitvorming en consumentenpsychologie
        </p>
      </motion.div>
      
      <motion.div 
        className="mb-8"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <p className="text-dark">
          Begrijpen hoe we economische beslissingen nemen kan ons helpen om beter geïnformeerde consumenten en burgers te worden. 
          Deze quiz behandelt concepten uit gedragseconomie, consumentenpsychologie en gezondheidseconomie.
        </p>
      </motion.div>
      
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Quiz questions={quizQuestions} />
      </motion.div>
      
      <motion.div 
        className="mt-12 bg-background p-6 rounded-lg border border-light/20"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 text-primary">Waarom Dit Belangrijk Is</h2>
        <p className="text-dark mb-4">
          Veel van onze economische beslissingen gebeuren automatisch, beïnvloed door omgevingsfactoren, sociale factoren,
          en cognitieve shortcuts waarvan we ons mogelijk niet bewust zijn. Door deze invloeden te begrijpen, kunnen we meer
          bewuste keuzes maken die aansluiten bij onze werkelijke prioriteiten en waarden.
        </p>
        <p className="text-dark">
          De vragen in deze quiz benadrukken hoe onze economische omgeving ons gedrag vormt — en hoe beleid,
          ontwerp en persoonlijk bewustzijn kunnen helpen bij het creëren van gezondere en duurzamere uitkomsten.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QuizPage;
