import React from 'react';
import Navigation from '../Navigation';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header>
      <Navigation />
      {isHomePage ? (
        <div 
          className="bg-cover bg-center py-24" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4 text-white">Economic Citizenship</h1>
            <p className="text-xl text-white max-w-2xl">
              Exploring the intersection of economics, health, and civic responsibility in our modern society.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-primary text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">EconoZen Magazine</h1>
            <p className="text-xl">Economics, health, and citizenship for modern living.</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
