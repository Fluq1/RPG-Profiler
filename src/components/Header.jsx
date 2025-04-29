import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="py-6">
      <motion.div 
        className="glass p-4 flex flex-col md:flex-row justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="mb-4 md:mb-0">
          <h1 className="title-medieval text-3xl">RPG Profiler</h1>
        </Link>
        
        <nav className="flex space-x-6">
          <Link to="/" className="font-fantasy text-rpg-light hover:text-rpg-gold transition-colors">
            Personagens
          </Link>
          <Link to="/create" className="font-fantasy text-rpg-light hover:text-rpg-gold transition-colors">
            Criar Novo
          </Link>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;