import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useViewportScroll, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { interviews } from '../data/interviews';
import InterviewCard from '../components/InterviewCard';
import CommentSection from '../components/CommentSection';

const InterviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const interview = interviews.find(interview => interview.id === Number(id));
  const [relatedInterviews, setRelatedInterviews] = useState<typeof interviews>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Format interview content as Q&A format
  const [formattedContent, setFormattedContent] = useState<Array<{ type: 'question' | 'answer', content: string }>>([]);
  const [questionRefs, setQuestionRefs] = useState<Array<React.RefObject<HTMLDivElement>>>([]);
  
  // Split content into Q&A format
  useEffect(() => {
    if (!interview) return;
    
    const lines = interview.content.split('\n');
    const formatted: Array<{ type: 'question' | 'answer', content: string }> = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      if (line.startsWith('Q:')) {
        formatted.push({ type: 'question', content: line.substring(2).trim() });
      } else if (line.startsWith('A:')) {
        formatted.push({ type: 'answer', content: line.substring(2).trim() });
      } else {
        // If last item is an answer, append to it, otherwise create a new answer
        if (formatted.length > 0 && formatted[formatted.length - 1].type === 'answer') {
          formatted[formatted.length - 1].content += ' ' + line;
        } else {
          formatted.push({ type: 'answer', content: line });
        }
      }
    }
    
    setFormattedContent(formatted);
    
    // Create refs for each question
    const questionCount = formatted.filter(item => item.type === 'question').length;
    const refs = Array(questionCount).fill(0).map(() => React.createRef<HTMLDivElement>());
    setQuestionRefs(refs);
  }, [interview]);
  
  // Find related interviews
  useEffect(() => {
    if (!interview) return;
    
    const related = interviews
      .filter(item => item.id !== interview.id)
      .sort(() => Math.random() - 0.5) // Shuffle
      .slice(0, 2); // Pick 2 random interviews
      
    setRelatedInterviews(related);
  }, [interview]);
  
  // Set up intersection observer to track active question
  useEffect(() => {
    if (questionRefs.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = questionRefs.findIndex(ref => ref.current === entry.target);
          if (index !== -1) {
            setActiveQuestionIndex(index);
          }
        }
      });
    }, { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' });
    
    questionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => observer.disconnect();
  }, [questionRefs]);
  
  const scrollToQuestion = (index: number) => {
    if (questionRefs[index]?.current) {
      questionRefs[index].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveQuestionIndex(index);
    }
  };
  
  if (!interview) {
    return <Navigate to="/interviews" />;
  }
  
  // Extract interview metadata
  const [firstName, ...lastNameParts] = interview.interviewee.split(' ');
  const lastName = lastNameParts.join(' ');
  
  // Extract just the questions for the TOC
  const questions = formattedContent
    .filter(item => item.type === 'question')
    .map(item => item.content);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Hero Section with Parallax */}
      <div className="relative h-[50vh] min-h-[400px] mb-12 overflow-hidden rounded-lg ">
        {interview.imageUrl && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{ 
              scale,
              opacity 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark/80 mix-blend-multiply z-10" />
            <img 
              src={interview.imageUrl} 
              alt={interview.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        )}
        
        <motion.div 
          className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8"
          style={{ y: textY }}
        >
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/interviews" 
              className="inline-flex items-center text-background mb-5 hover:text-accent"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back to interviews
            </Link>
          </motion.div>
          
          {/* Interview Title */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-3 text-background"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {interview.title}
          </motion.h1>
          
          {/* Interviewee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center"
          >
            <div className="mr-4 h-14 w-14 bg-accent rounded-full flex items-center justify-center text-background font-bold text-xl border-2 border-background/60">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </div>
            <div>
              <p className="text-2xl font-medium text-background">
                {interview.interviewee}
              </p>
              <p className="text-light/90">
                {interview.role}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Date */}
          <div className="flex items-center text-secondary mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{interview.date}</span>
          </div>
          
          {/* Highlighted Quote */}
          {interview.highlightedQuote && (
            <motion.blockquote 
              className="relative text-2xl font-medium text-primary italic my-10 pl-6 border-l-4 border-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <svg className="absolute text-accent/20 top-0 left-0 transform -translate-x-6 -translate-y-5 h-16 w-16" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              "{interview.highlightedQuote}"
            </motion.blockquote>
          )}
          
          {/* Main content layout with sidebar */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main interview content */}
            <div className="lg:col-span-8">
              {/* Interviewee Profile Card */}
              <motion.div 
                className="bg-background border border-light/20 rounded-lg p-6 shadow-md mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="w-24 h-24 rounded-full bg-light/20 flex items-center justify-center text-2xl font-bold text-primary border-2 border-accent/30">
                  {firstName.charAt(0)}{lastName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary mb-1 text-center sm:text-left">About {interview.interviewee}</h2>
                  <p className="text-secondary mb-3 text-center sm:text-left">{interview.role}</p>
                  <p className="text-dark">
                    {interview.interviewee} is a distinguished expert in their field with extensive experience and insights to share. 
                    This interview explores their unique perspectives and contributions to the industry.
                  </p>
                </div>
              </motion.div>
              
              {/* Interview Content */}
              <div className="prose max-w-none">
                {formattedContent.map((item, index) => {
                  const questionIndex = formattedContent.slice(0, index).filter(i => i.type === 'question').length;
                  return (
                    <motion.div
                      key={index}
                      ref={item.type === 'question' ? questionRefs[questionIndex] : undefined}
                      id={item.type === 'question' ? `question-${questionIndex}` : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px 0px" }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      className={`mb-8 ${item.type === 'question' ? '' : 'pl-0 sm:pl-6'}`}
                    >
                      {item.type === 'question' ? (
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-primary text-background rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">Q</div>
                          <div className="font-medium text-lg text-primary">{item.content}</div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-4">
                          <div className="bg-accent text-background rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">A</div>
                          <div className="text-dark">{item.content}</div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Share Section */}
              <motion.div 
                className="my-12 py-6 border-t border-b border-light/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="font-bold text-primary">Share this interview</p>
                  <div className="flex space-x-4">
                    {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
                      <motion.button
                        key={platform}
                        className="px-4 py-2 bg-background border border-light/30 rounded-md text-sm text-dark hover:bg-light/10"
                        whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        whileTap={{ y: 0 }}
                      >
                        {platform}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Related Interviews */}
              <motion.div
                className="my-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-primary mb-8">Related Interviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedInterviews.map((relInterview) => (
                    <InterviewCard key={relInterview.id} interview={relInterview} />
                  ))}
                </div>
              </motion.div>
              
              {/* Comments Section */}
              <CommentSection comments={[]} interviewId={interview.id} />
            </div>
            
            {/* Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 relative">
              <div className="sticky top-8 bg-background rounded-lg shadow-md border border-light/20 p-4">
                <motion.h3 
                  className="font-bold text-lg mb-4 text-primary flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="w-5 h-5 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  In This Interview
                </motion.h3>
                
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2 space-y-1">
                  {questions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => scrollToQuestion(index)}
                      className={`text-left w-full py-2 px-3 rounded-md text-sm transition-all duration-200 ${
                        activeQuestionIndex === index 
                          ? 'bg-accent/10 text-accent font-medium' 
                          : 'hover:bg-light/10 text-dark'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-start">
                        <span className={`rounded-full w-5 h-5 flex-shrink-0 mr-2 flex items-center justify-center text-xs ${
                          activeQuestionIndex === index ? 'bg-accent text-white' : 'bg-light/40'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="line-clamp-2">
                          {question}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-4 pt-4 border-t border-light/20 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-sm text-secondary hover:text-accent flex items-center justify-center w-full"
                    whileHover={{ y: -2 }}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                    Back to top
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Mobile interview navigation (fixed at bottom) */}
              <motion.div 
                className="lg:hidden fixed bottom-4 right-4 z-40"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  onClick={() => {
                    const questionsEl = document.getElementById('interview-questions');
                    if (questionsEl) questionsEl.classList.toggle('hidden');
                  }}
                  className="bg-accent text-white p-3 rounded-full shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </motion.button>
                
                <div id="interview-questions" className="hidden absolute bottom-full right-0 mb-2 bg-background rounded-lg shadow-xl border border-light/20 p-2 w-64">
                  <div className="max-h-72 overflow-y-auto space-y-1 pb-2">
                    {questions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          scrollToQuestion(index);
                          document.getElementById('interview-questions')?.classList.add('hidden');
                        }}
                        className={`text-left w-full py-2 px-3 rounded-md text-sm ${
                          activeQuestionIndex === index 
                            ? 'bg-accent/10 text-accent font-medium' 
                            : 'hover:bg-light/10 text-dark'
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="rounded-full w-5 h-5 flex-shrink-0 mr-2 flex items-center justify-center text-xs bg-light/30">
                            {index + 1}
                          </span>
                          <span className="line-clamp-2">
                            {question}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewDetailPage;
