import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RaceClassSelector = ({ 
  gameSystem, 
  onSelectionComplete, 
  initialRace = '', 
  initialClass = '' 
}) => {
  const [selectedRace, setSelectedRace] = useState(initialRace);
  const [selectedClass, setSelectedClass] = useState(initialClass);

  // Dados básicos para diferentes sistemas de RPG
  const systemData = {
    'D&D 5e': {
      races: ['Humano', 'Elfo', 'Anão', 'Halfling', 'Draconato', 'Gnomo', 'Meio-elfo', 'Meio-orc', 'Tiefling'],
      classes: ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro']
    },
    'Pathfinder': {
      races: ['Humano', 'Elfo', 'Anão', 'Halfling', 'Gnomo', 'Meio-elfo', 'Meio-orc'],
      classes: ['Bárbaro', 'Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro']
    },
    'Tormenta20': {
      races: ['Humano', 'Elfo', 'Anão', 'Halfling', 'Qareen', 'Golem', 'Lefou', 'Minotauro', 'Osteon', 'Sereia', 'Suraggel', 'Trog'],
      classes: ['Arcanista', 'Bárbaro', 'Bardo', 'Bucaneiro', 'Caçador', 'Cavaleiro', 'Clérigo', 'Druida', 'Guerreiro', 'Inventor', 'Ladino', 'Lutador', 'Nobre', 'Paladino', 'Ranger']
    }
  };

  const currentSystem = systemData[gameSystem] || systemData['D&D 5e'];

  useEffect(() => {
    if (selectedRace && selectedClass) {
      onSelectionComplete({
        race: selectedRace,
        class: selectedClass
      });
    }
  }, [selectedRace, selectedClass, onSelectionComplete]);

  return (
    <div className="space-y-6">
      <h2 className="title-fantasy text-2xl mb-6 text-center">Escolha Raça e Classe</h2>
      
      {/* Seleção de Raça */}
      <div>
        <h3 className="text-rpg-accent text-lg mb-4">Raça</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currentSystem.races.map((race) => (
            <motion.button
              key={race}
              onClick={() => setSelectedRace(race)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                selectedRace === race
                  ? 'bg-rpg-accent text-rpg-dark border-rpg-accent'
                  : 'bg-rpg-dark/50 border-rpg-accent/30 text-rpg-light hover:border-rpg-accent/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {race}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Seleção de Classe */}
      <div>
        <h3 className="text-rpg-accent text-lg mb-4">Classe</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currentSystem.classes.map((characterClass) => (
            <motion.button
              key={characterClass}
              onClick={() => setSelectedClass(characterClass)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                selectedClass === characterClass
                  ? 'bg-rpg-accent text-rpg-dark border-rpg-accent'
                  : 'bg-rpg-dark/50 border-rpg-accent/30 text-rpg-light hover:border-rpg-accent/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {characterClass}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedRace && selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 rounded-lg"
        >
          <p className="text-center text-rpg-light">
            Selecionado: <span className="text-rpg-accent font-semibold">{selectedRace} {selectedClass}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RaceClassSelector;