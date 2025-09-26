import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const ArchetypeCard = ({ archetype, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Card 
        className={`cursor-pointer h-full transition-all duration-300 transform hover:shadow-lg hover:shadow-rpg-accent/30 ${
          isSelected 
            ? 'ring-2 ring-rpg-accent shadow-lg shadow-rpg-accent/20 bg-rpg-accent/10' 
            : 'hover:ring-2 hover:ring-rpg-accent/50 hover:bg-rpg-accent/5'
        }`}
        onClick={onSelect}
      >
        <div className="p-5 flex flex-col items-center text-center h-full">
          <div className="text-5xl mb-4 transition-all duration-300 hover:scale-110">{archetype.icon}</div>
          <h3 className={`title-fantasy text-xl mb-2 transition-all duration-300 ${
            isSelected ? 'font-bold text-rpg-accent' : 'hover:font-bold hover:text-rpg-accent'
          }`}>{archetype.name}</h3>
          <p className="text-rpg-light/80">{archetype.description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArchetypeCard;