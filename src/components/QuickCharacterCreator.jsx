import React, { useState, useEffect } from 'react';
import { generateAutoCharacter, generateMultipleCharacters, validateCharacter } from '../services/characterGenerator';
import { generateCharacterPDF } from '../services/pdfService';
import { rpgSystems } from '../data/rpgSystems';
import './QuickCharacterCreator.css';

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
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [systemData, setSystemData] = useState(null);
  
  useEffect(() => {
    setSystemData(rpgSystems[options.gameSystem]);
  }, [options.gameSystem]);
  
  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const generateCharacters = async () => {
    setIsGenerating(true);
    try {
      let characters;
      if (options.count === 1) {
        const character = await generateAutoCharacter(options);
        characters = [character];
      } else {
        characters = await generateMultipleCharacters(options.count, options);
      }
      
      setGeneratedCharacters(characters);
      if (characters.length > 0) {
        setSelectedCharacter(characters[0]);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Erro ao gerar personagens:', error);
      alert('Erro ao gerar personagens. Tente novamente.');
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
    generatedCharacters.forEach((character, index) => {
      setTimeout(() => {
        downloadPDF(character);
      }, index * 1000); // Delay para evitar conflitos
    });
  };
  
  return (
    <div className="quick-character-creator">
      <div className="creator-header">
        <h2>🎲 Criação Rápida de Personagem</h2>
        <p>Gere personagens automaticamente com base nas regras do sistema selecionado</p>
      </div>
      
      <div className="creator-content">
        <div className="options-panel">
          <h3>Opções de Geração</h3>
          
          {/* Sistema de RPG */}
          <div className="option-group">
            <label>Sistema de RPG:</label>
            <select 
              value={options.gameSystem} 
              onChange={(e) => handleOptionChange('gameSystem', e.target.value)}
            >
              {Object.entries(rpgSystems).map(([key, system]) => (
                <option key={key} value={key}>{system.name}</option>
              ))}
            </select>
          </div>
          
          {/* Quantidade */}
          <div className="option-group">
            <label>Quantidade de Personagens:</label>
            <select 
              value={options.count} 
              onChange={(e) => handleOptionChange('count', parseInt(e.target.value))}
            >
              <option value={1}>1 Personagem</option>
              <option value={3}>3 Personagens</option>
              <option value={5}>5 Personagens</option>
              <option value={10}>10 Personagens</option>
            </select>
          </div>
          
          {/* Nível */}
          <div className="option-group">
            <label>Nível:</label>
            <select 
              value={options.level} 
              onChange={(e) => handleOptionChange('level', parseInt(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                <option key={level} value={level}>Nível {level}</option>
              ))}
            </select>
          </div>
          
          {/* Método de Atributos */}
          <div className="option-group">
            <label>Método de Atributos:</label>
            <select 
              value={options.abilityMethod} 
              onChange={(e) => handleOptionChange('abilityMethod', e.target.value)}
            >
              <option value="standardArray">Matriz Padrão</option>
              <option value="pointBuy">Compra de Pontos</option>
              <option value="rolling">Rolagem de Dados</option>
            </select>
          </div>
          
          {/* Faixa Etária */}
          <div className="option-group">
            <label>Faixa Etária:</label>
            <select 
              value={options.ageRange} 
              onChange={(e) => handleOptionChange('ageRange', e.target.value)}
            >
              <option value="child">Criança</option>
              <option value="young">Jovem</option>
              <option value="adult">Adulto</option>
              <option value="elder">Idoso</option>
            </select>
          </div>
          
          {systemData && (
            <>
              {/* Raça (Opcional) */}
              <div className="option-group">
                <label>Raça (Opcional):</label>
                <select 
                  value={options.race} 
                  onChange={(e) => handleOptionChange('race', e.target.value)}
                >
                  <option value="">Aleatória</option>
                  {systemData.races.map(race => (
                    <option key={race.id} value={race.id}>{race.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Classe (Opcional) */}
              <div className="option-group">
                <label>Classe (Opcional):</label>
                <select 
                  value={options.characterClass} 
                  onChange={(e) => handleOptionChange('characterClass', e.target.value)}
                >
                  <option value="">Aleatória</option>
                  {systemData.classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Background (Opcional) */}
              <div className="option-group">
                <label>Background (Opcional):</label>
                <select 
                  value={options.background} 
                  onChange={(e) => handleOptionChange('background', e.target.value)}
                >
                  <option value="">Aleatório</option>
                  {systemData.backgrounds.map(bg => (
                    <option key={bg.id} value={bg.id}>{bg.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          <button 
            className="generate-btn" 
            onClick={generateCharacters}
            disabled={isGenerating}
          >
            {isGenerating ? '🎲 Gerando...' : '🎲 Gerar Personagens'}
          </button>
        </div>
        
        {generatedCharacters.length > 0 && (
          <div className="results-panel">
            <div className="results-header">
              <h3>Personagens Gerados ({generatedCharacters.length})</h3>
              {generatedCharacters.length > 1 && (
                <button className="download-all-btn" onClick={downloadAllPDFs}>
                  📄 Baixar Todos os PDFs
                </button>
              )}
            </div>
            
            <div className="character-list">
              {generatedCharacters.map((character, index) => (
                <div 
                  key={index} 
                  className={`character-card ${selectedCharacter === character ? 'selected' : ''}`}
                  onClick={() => setSelectedCharacter(character)}
                >
                  <div className="character-header">
                    <h4>{character.name || `Personagem ${index + 1}`}</h4>
                    <span className="character-level">Nível {character.level}</span>
                  </div>
                  <div className="character-info">
                    <p><strong>Raça:</strong> {character.race}</p>
                    <p><strong>Classe:</strong> {character.class}</p>
                    <p><strong>Background:</strong> {character.background}</p>
                  </div>
                  <div className="character-actions">
                    <button 
                      className="pdf-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPDF(character);
                      }}
                    >
                      📄 PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {selectedCharacter && showPreview && (
          <div className="preview-panel">
            <div className="preview-header">
              <h3>Preview: {selectedCharacter.name}</h3>
              <button 
                className="close-preview"
                onClick={() => setShowPreview(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="preview-content">
              <div className="basic-info">
                <h4>Informações Básicas</h4>
                <div className="info-grid">
                  <div><strong>Nome:</strong> {selectedCharacter.name}</div>
                  <div><strong>Nível:</strong> {selectedCharacter.level}</div>
                  <div><strong>Raça:</strong> {selectedCharacter.race}</div>
                  <div><strong>Classe:</strong> {selectedCharacter.class}</div>
                  <div><strong>Background:</strong> {selectedCharacter.background}</div>
                  <div><strong>PV:</strong> {selectedCharacter.hitPoints}</div>
                  <div><strong>CA:</strong> {selectedCharacter.armorClass}</div>
                  <div><strong>Bônus Prof.:</strong> +{selectedCharacter.proficiencyBonus}</div>
                </div>
              </div>
              
              {selectedCharacter.abilities && (
                <div className="abilities-section">
                  <h4>Atributos</h4>
                  <div className="abilities-grid">
                    {Object.entries(selectedCharacter.abilities).map(([ability, value]) => {
                      const modifier = Math.floor((value - 10) / 2);
                      return (
                        <div key={ability} className="ability-score">
                          <div className="ability-name">{ability.charAt(0).toUpperCase() + ability.slice(1)}</div>
                          <div className="ability-value">{value}</div>
                          <div className="ability-modifier">
                            {modifier >= 0 ? '+' : ''}{modifier}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {selectedCharacter.skills && selectedCharacter.skills.length > 0 && (
                <div className="skills-section">
                  <h4>Perícias Proficientes</h4>
                  <div className="skills-list">
                    {selectedCharacter.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedCharacter.equipment && selectedCharacter.equipment.length > 0 && (
                <div className="equipment-section">
                  <h4>Equipamentos</h4>
                  <div className="equipment-list">
                    {selectedCharacter.equipment.slice(0, 10).map((item, index) => (
                      <div key={index} className="equipment-item">• {item}</div>
                    ))}
                    {selectedCharacter.equipment.length > 10 && (
                      <div className="equipment-more">... e mais {selectedCharacter.equipment.length - 10} itens</div>
                    )}
                  </div>
                </div>
              )}
              
              {selectedCharacter.spells && selectedCharacter.spells.length > 0 && (
                <div className="spells-section">
                  <h4>Magias</h4>
                  <div className="spells-list">
                    {selectedCharacter.spells.map((spell, index) => (
                      <div key={index} className="spell-item">
                        <strong>{spell.name}</strong> (Nível {spell.level === 0 ? 'Truque' : spell.level})
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedCharacter.story && (
                <div className="story-section">
                  <h4>História</h4>
                  <div className="story-content">
                    {typeof selectedCharacter.story === 'string' 
                      ? selectedCharacter.story.substring(0, 300) + '...' 
                      : 'História não disponível'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCharacterCreator;