import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, onClick, className = '', selected = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass p-4 card-hover ${selected ? 'ring-2 ring-rpg-gold' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;