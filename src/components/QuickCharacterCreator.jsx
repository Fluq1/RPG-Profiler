import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAutoCharacter, generateMultipleCharacters, validateCharacter } from '../services/characterGenerator';
import { generateCharacterPDF } from '../services/pdfService';
import { rpgSystems } from '../data/rpgSystems/index.js';
import './QuickCharacterCreator.css';

// Custom hook for responsive design
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

const QuickCharacterCreator = () => {
  const [options, setOptions] = useState({
    gameSystem: sessionStorage.getItem('selectedGameSystem') || 'dnd5e',
    race: '',
    characterClass: '',
    background: '',
    level: 1,
    abilityMethod: 'standardArray',
    archetype: '',
    ageRange: 'adult',
    count: 1
  });
  
  const [generatedCharacters, setGeneratedCharacters] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [systemData, setSystemData] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setSystemData(rpgSystems[options.gameSystem]);
  }, [options.gameSystem]);
  
  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const generateCharacters = async () => {
    setIsGenerating(true);
    setGeneratedCharacters([]); // Clear previous results
    try {
      const characters = options.count === 1
        ? [await generateAutoCharacter(options)]
        : await generateMultipleCharacters(options.count, options);
      
      setGeneratedCharacters(characters);
    } catch (error) {
      console.error('#################### ERRO DETALHADO ####################');
      console.error('Ocorreu um erro crítico durante a geração de personagens:', error);
      console.error('######################################################');
      // A linha do alert foi comentada para não bloquear o script de teste.
      // alert('Erro ao gerar personagens. Verifique o console para detalhes.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const downloadPDF = (character) => {
    const validation = validateCharacter(character);
    if (!validation.isValid) {
      alert(`Personagem inválido: ${validation.errors.join(', ')}`);
      return;
    }
    generateCharacterPDF(character);
  };

  const downloadAllPDFs = () => {
    generatedCharacters.forEach((char, i) => setTimeout(() => downloadPDF(char), i * 1000));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className="qcc-container">
      <header className="qcc-header">
        <h1>🎲 Criação Rápida de Personagem</h1>
        <p>Gere personagens completos com apenas alguns cliques.</p>
      </header>

      <motion.div layout className="qcc-options-card">
        <div className="qcc-options-grid">
          {/* System */}
          <div className="qcc-option">
            <label>Sistema de RPG</label>
            <select value={options.gameSystem} onChange={(e) => handleOptionChange('gameSystem', e.target.value)}>
              {Object.entries(rpgSystems).map(([key, sys]) => <option key={key} value={key}>{sys.name}</option>)}
            </select>
          </div>
          {/* Count */}
          <div className="qcc-option">
            <label>Quantidade</label>
            <select value={options.count} onChange={(e) => handleOptionChange('count', parseInt(e.target.value))}>
              {[1, 3, 5, 10].map(c => <option key={c} value={c}>{c} Personagen{c > 1 ? 's' : 'm'}</option>)}
            </select>
          </div>
          {/* Level */}
          <div className="qcc-option">
            <label>Nível</label>
            <select value={options.level} onChange={(e) => handleOptionChange('level', parseInt(e.target.value))}>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(l => <option key={l} value={l}>Nível {l}</option>)}
            </select>
          </div>
          {/* Race */}
          <div className="qcc-option">
            <label>Raça (Opcional)</label>
            <select value={options.race} onChange={(e) => handleOptionChange('race', e.target.value)}>
              <option value="">Aleatória</option>
              {systemData?.races.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          {/* Class */}
          <div className="qcc-option">
            <label>Classe (Opcional)</label>
            <select value={options.characterClass} onChange={(e) => handleOptionChange('characterClass', e.target.value)}>
              <option value="">Aleatória</option>
              {systemData?.classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          {/* Background */}
          <div className="qcc-option">
            <label>Background (Opcional)</label>
            <select value={options.background} onChange={(e) => handleOptionChange('background', e.target.value)}>
              <option value="">Aleatório</option>
              {systemData?.backgrounds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>
        <button className="qcc-generate-btn" onClick={generateCharacters} disabled={isGenerating}>
          {isGenerating ? 'Gerando...' : 'Gerar Personagens'}
        </button>
      </motion.div>

      {generatedCharacters.length > 0 && (
        <div className="qcc-results-section">
          <div className="qcc-results-header">
            <h2>Resultados da Geração</h2>
            <button className="qcc-download-all-btn" onClick={downloadAllPDFs}>
              Baixar Todos os PDFs
            </button>
          </div>
          <motion.div className="qcc-character-grid" layout>
            <AnimatePresence>
              {generatedCharacters.map((char, index) => (
                <motion.div
                  key={char.id || index}
                  className="qcc-character-card"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={index}
                  layoutId={`card-${char.id || index}`}
                  onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                >
                  <motion.div className="qcc-card-header" layout>
                    <h3>{char.name}</h3>
                    <span className="qcc-level-badge">Nível {char.level}</span>
                  </motion.div>
                  <motion.div className="qcc-card-subtitle" layout>
                    {char.race} {char.class}
                  </motion.div>

                  <AnimatePresence>
                    {selectedCard === index && (
                      <motion.div
                        className="qcc-card-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="qcc-abilities-grid">
                          {Object.entries(char.abilities).map(([key, value]) => (
                            <div key={key} className="qcc-ability">
                              <span className="qcc-ability-name">{key.substring(0, 3).toUpperCase()}</span>
                              <span className="qcc-ability-value">{value}</span>
                              <span className="qcc-ability-mod">
                                {Math.floor((value - 10) / 2) >= 0 ? `+${Math.floor((value - 10) / 2)}` : Math.floor((value - 10) / 2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="qcc-details-section">
                          <strong>Perícias:</strong>
                          <span>{char.skills.join(', ')}</span>
                        </div>
                        <div className="qcc-details-section">
                          <strong>Equipamento:</strong>
                          <span>{char.equipment.slice(0, 3).join(', ')}...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    className="qcc-pdf-btn"
                    onClick={(e) => { e.stopPropagation(); downloadPDF(char); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Baixar PDF
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuickCharacterCreator;