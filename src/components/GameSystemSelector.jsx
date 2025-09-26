import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameSystemSelector = ({ systems, selectedSystem, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (system) => {
    onSelect(system);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Botão principal */}
      <motion.button
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="apple-button-secondary w-full p-5 flex items-center justify-between text-white font-medium"
      >
        <div className="flex items-center space-x-4">
          <div className="text-3xl filter drop-shadow-sm">{selectedSystem?.icon || '🎲'}</div>
          <div className="text-left">
            <div className="font-semibold text-lg">{selectedSystem?.name || 'Selecione um Sistema'}</div>
            <div className="text-sm text-gray-300 font-normal">{selectedSystem?.description || 'Escolha seu sistema de RPG'}</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </motion.div>
      </motion.button>

      {/* Caixa de seleção melhorada e visível */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-3 bg-[rgba(26,26,26,0.95)] border border-[rgba(255,255,255,0.15)] rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="max-h-80 overflow-y-auto">
              {systems.map((system, index) => (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, ease: "easeOut" }}
                  whileHover={{ 
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    scale: 1.01,
                    x: 2
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(system)}
                  className={`
                    p-5 cursor-pointer transition-all duration-300 border-b border-[rgba(255,255,255,0.05)] last:border-b-0 relative
                    ${selectedSystem?.id === system.id ? 'bg-gradient-to-r from-[#F97316]/20 to-[#E86305]/10 border-l-4 border-l-[#F97316]' : 'hover:bg-[rgba(249,115,22,0.05)]'}
                    ${!system.active ? 'opacity-60' : ''}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl filter drop-shadow-sm">{system.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-white text-lg">{system.name}</h3>
                        {selectedSystem?.id === system.id && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-gradient-to-r from-[#F97316] to-[#E86305] rounded-full flex items-center justify-center shadow-lg"
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                            </svg>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mt-1 font-normal">{system.description}</p>
                      {!system.active && (
                        <motion.span 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-flex items-center mt-3 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 text-amber-100 text-xs rounded-full font-medium shadow-sm"
                        >
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Em breve
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar quando clicar fora */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default GameSystemSelector;