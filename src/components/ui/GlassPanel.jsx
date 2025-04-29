import React from 'react';
import { motion } from 'framer-motion';

const GlassPanel = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`glass p-6 backdrop-blur-sm bg-rpg-dark/40 border border-rpg-light/10 ${className}`}
      whileHover={{ 
        boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
        borderColor: "rgba(255, 215, 0, 0.3)"
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;