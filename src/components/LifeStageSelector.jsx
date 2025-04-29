import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';

const LifeStageSelector = ({ stage, options, selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="title-fantasy text-xl">{stage.title}</h3>
      <p className="text-rpg-light/80 mb-4">{stage.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(option => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selected?.id === option.id 
                ? 'bg-rpg-accent/30 border border-rpg-accent/50' 
                : 'bg-rpg-dark/30 border border-rpg-light/10 hover:bg-rpg-dark/50'
            }`}
            onClick={() => onSelect(option)}
          >
            <h4 className="font-fantasy text-lg mb-1">{option.title}</h4>
            <p className="text-sm text-rpg-light/80">{option.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LifeStageSelector;