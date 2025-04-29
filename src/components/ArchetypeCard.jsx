import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const ArchetypeCard = ({ archetype, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <Card 
        className={`cursor-pointer h-full transition-all duration-300 ${
          isSelected ? 'ring-2 ring-rpg-accent shadow-lg shadow-rpg-accent/20' : ''
        }`}
        onClick={onSelect}
      >
        <div className="p-5 flex flex-col items-center text-center h-full">
          <div className="text-5xl mb-4">{archetype.icon}</div>
          <h3 className="title-fantasy text-xl mb-2">{archetype.name}</h3>
          <p className="text-rpg-light/80">{archetype.description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArchetypeCard;