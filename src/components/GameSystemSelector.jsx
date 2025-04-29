import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';
import Card from './ui/Card';

const GameSystemSelector = ({ onSelect }) => {
  const gameSystems = [
    { id: 'dnd', name: 'Dungeons & Dragons', icon: '🐉', active: true },
    { id: 'pathfinder', name: 'Pathfinder', icon: '🧭', active: false },
    { id: 'callOfCthulhu', name: 'Call of Cthulhu', icon: '🐙', active: false },
    { id: 'vampireMasquerade', name: 'Vampire: The Masquerade', icon: '🧛', active: false },
  ];

  return (
    <div className="space-y-6">
      <h2 className="title-fantasy text-2xl mb-6 text-center">Escolha um Sistema de RPG</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameSystems.map((system) => (
          <motion.div
            key={system.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`p-6 cursor-pointer ${!system.active && 'opacity-60'}`}
              onClick={() => system.active && onSelect(system.id)}
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4">{system.icon}</div>
                <div>
                  <h3 className="text-xl font-fantasy">{system.name}</h3>
                  {!system.active && (
                    <p className="text-rpg-light/60 text-sm mt-1">Em breve</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameSystemSelector;