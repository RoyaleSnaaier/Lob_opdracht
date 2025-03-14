import React, { useState } from 'react';
import { Comment } from '../types';

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !authorName.trim()) return;
    
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
  };

  return (
    <div className="mt-12 bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{comment.author}</h3>
                <span className="text-gray-500 text-sm">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Be the first to comment!</p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="author"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
