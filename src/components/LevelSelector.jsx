import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';
import Button from './ui/Button';

const LevelSelector = ({ selectedLevel, onSelect, onNext, onBack }) => {
  const levels = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <GlassPanel className="p-8">
        <h2 className="title-fantasy mb-6 text-center">
          Escolha o Nível do Personagem
        </h2>
        
        <p className="text-center text-rpg-light/80 mb-8">
          O nível determina as habilidades, pontos de vida e poderes do seu personagem.
        </p>
        
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 mb-8">
          {levels.map((level) => (
            <motion.button
              key={level}
              onClick={() => onSelect(level)}
              className={`
                aspect-square rounded-lg border-2 font-bold text-lg transition-all duration-200
                ${
                  selectedLevel === level
                    ? 'bg-rpg-accent border-rpg-accent text-rpg-dark shadow-lg shadow-rpg-accent/30'
                    : 'bg-rpg-dark/30 border-rpg-light/20 text-rpg-light hover:border-rpg-accent/50 hover:bg-rpg-accent/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {level}
            </motion.button>
          ))}
        </div>
        
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rpg-dark/50 rounded-lg p-4 mb-6"
          >
            <h3 className="text-rpg-accent font-semibold mb-2">
              Nível {selectedLevel} Selecionado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-rpg-light/60">Bônus de Proficiência:</span>
                <span className="ml-2 text-rpg-accent font-semibold">
                  +{Math.ceil(selectedLevel / 4) + 1}
                </span>
              </div>
              <div>
                <span className="text-rpg-light/60">Características de Classe:</span>
                <span className="ml-2 text-rpg-accent font-semibold">
                  Até nível {selectedLevel}
                </span>
              </div>
              <div>
                <span className="text-rpg-light/60">Espaços de Magia:</span>
                <span className="ml-2 text-rpg-accent font-semibold">
                  {selectedLevel >= 1 ? 'Disponíveis' : 'Nenhum'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant="secondary"
            className="px-6"
          >
            Voltar
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!selectedLevel}
            className="px-6"
          >
            Continuar
          </Button>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

export default LevelSelector;