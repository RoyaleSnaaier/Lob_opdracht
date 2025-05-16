import React from 'react';
import Navigation from '../Navigation';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header>
      <Navigation />
    </header>
  );
};

export default Header;
