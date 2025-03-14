import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment } from '../types';
import { buttonVariants } from '../animations';

interface CommentSectionProps {
  comments: Comment[];
  articleId?: number;
  interviewId?: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  comments: initialComments, 
  articleId, 
  interviewId 
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !authorName.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate a small delay for the animation
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now(), // Simple unique ID
        author: authorName,
        content: newComment,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        articleId,
        interviewId
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <motion.div 
      className="mt-12 bg-background p-6 rounded-lg border border-light/20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Comments
      </motion.h2>
      
      <AnimatePresence>
        {comments.length > 0 ? (
          <motion.div 
            className="space-y-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {comments.map((comment, index) => (
              <motion.div 
                key={comment.id} 
                className="bg-white p-4 rounded shadow border border-light/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-primary">{comment.author}</h3>
                  <span className="text-light text-sm">{comment.date}</span>
                </div>
                <p className="text-dark">{comment.content}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p 
            className="text-secondary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Be the first to comment!
          </motion.p>
        )}
      </AnimatePresence>
      
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-dark mb-1">
            Your Name
          </label>
          <motion.input
            type="text"
            id="author"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            whileFocus={{ boxShadow: "0 0 0 3px rgba(166, 104, 91, 0.3)" }}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-dark mb-1">
            Your Comment
          </label>
          <motion.textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            whileFocus={{ boxShadow: "0 0 0 3px rgba(166, 104, 91, 0.3)" }}
            required
          />
        </div>
        
        <motion.button 
          type="submit" 
          className="bg-accent hover:bg-accent/90 text-background font-medium py-2 px-4 rounded"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div 
              className="flex items-center"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Posting...
            </motion.div>
          ) : (
            'Post Comment'
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default CommentSection;
