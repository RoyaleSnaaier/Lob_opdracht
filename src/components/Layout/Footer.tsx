import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">EconoZen</h2>
            <p className="mb-4">Exploring the economic dimension of citizenship</p>
            <Link to="/references" className="text-accent hover:underline">References & Sources</Link>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/articles" className="hover:text-accent">Articles</Link></li>
              <li><Link to="/interviews" className="hover:text-accent">Interviews</Link></li>
              <li><Link to="/health" className="hover:text-accent">Health & Vitality</Link></li>
              <li><Link to="/quiz" className="hover:text-accent">Consumer Behavior Quiz</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent">Twitter</a>
              <a href="#" className="hover:text-accent">LinkedIn</a>
              <a href="#" className="hover:text-accent">Facebook</a>
              <a href="#" className="hover:text-accent">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EconoZen Magazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
