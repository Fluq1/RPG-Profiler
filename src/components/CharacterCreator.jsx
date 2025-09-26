import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassPanel from './ui/GlassPanel';
import Button from './ui/Button';
import { useCharacter } from '../contexts/CharacterContext';
import { generateCharacterDetails, generateCharacterStory } from '../services/aiService';
import { generateCharacterPDF } from '../services/pdfService';
import GameSystemSelector from './GameSystemSelector';
import RaceClassSelector from './RaceClassSelector';
import SubclassSelector from './SubclassSelector';
import LevelSelector from './LevelSelector';
import LoadingSpinner from './ui/LoadingSpinner';
import { lifeStages } from '../data/lifeStages';
import { rpgSystems } from '../data/rpgSystems';

// Modificar o componente para carregar etapas específicas do sistema
const CharacterCreator = () => {
  const navigate = useNavigate();
  const { addCharacter } = useCharacter();
  
  // State for multi-step form
  const [step, setStep] = useState(0); // Start with character name and age
  const [gameSystem, setGameSystem] = useState(null);
  const [characterName, setCharacterName] = useState('');
  const [characterAge, setCharacterAge] = useState('');
  const [ageGroup, setAgeGroup] = useState(null); // Calculado automaticamente
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubclass, setSelectedSubclass] = useState(null);
  const [characterDetails, setCharacterDetails] = useState(null);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  // State for life stages
  const [lifeStageSelections, setLifeStageSelections] = useState({
    infancy: null,
    earlyChildhood: null,
    childhood: null,
    earlyAdolescence: null,
    adolescence: null,
    earlyAdulthood: null,
    adulthood: null
  });
  
  // Current life stage being edited
  const [currentLifeStage, setCurrentLifeStage] = useState(null);

  // Funções auxiliares para calcular status do personagem
  const calculateHitPoints = (level, classData) => {
    if (!classData) return 0;
    const hitDie = classData.hitDie || 8;
    const baseHP = hitDie + 2; // Máximo no primeiro nível + modificador de CON médio
    const additionalHP = (level - 1) * (Math.floor(hitDie / 2) + 1 + 2);
    return baseHP + additionalHP;
  };

  const calculateArmorClass = (race, characterClass) => {
    // AC básica baseada na classe
    const baseAC = {
      'barbarian': 12, // Sem armadura + Des
      'monk': 13, // Sem armadura + Des + Sab
      'sorcerer': 11, // Sem armadura + Des
      'wizard': 11, // Sem armadura + Des
      'warlock': 12, // Armadura de couro + Des
    };
    return baseAC[characterClass?.id] || 14; // Armadura de couro/cota de malha padrão
  };

  const generateAbilityScores = (race, characterClass) => {
    // Scores básicos otimizados para a classe
    const baseScores = {
      'barbarian': { strength: 15, dexterity: 13, constitution: 14, intelligence: 8, wisdom: 12, charisma: 10 },
      'fighter': { strength: 15, dexterity: 13, constitution: 14, intelligence: 10, wisdom: 12, charisma: 8 },
      'wizard': { strength: 8, dexterity: 14, constitution: 13, intelligence: 15, wisdom: 12, charisma: 10 },
      'cleric': { strength: 10, dexterity: 12, constitution: 14, intelligence: 8, wisdom: 15, charisma: 13 },
      'rogue': { strength: 8, dexterity: 15, constitution: 13, intelligence: 14, wisdom: 12, charisma: 10 }
    };
    return baseScores[characterClass?.id] || { strength: 13, dexterity: 14, constitution: 13, intelligence: 12, wisdom: 12, charisma: 10 };
  };

  const getClassFeatures = (classData, subclass, level) => {
    if (!classData) return [];
    
    let features = classData.features?.filter(f => f.level <= level) || [];
    
    if (subclass && subclass.features) {
      const subclassFeatures = subclass.features.filter(f => f.level <= level);
      features = [...features, ...subclassFeatures];
    }
    
    return features;
  };

  const getAvailableSpells = (classData, level) => {
    if (!classData?.spellcasting) return [];
    
    const spells = [];
    if (classData.spellcasting.cantripsKnown) {
      const cantripCount = classData.spellcasting.cantripsKnown[level] || classData.spellcasting.cantripsKnown[1] || 0;
      for (let i = 0; i < cantripCount; i++) {
        spells.push(`Truque ${i + 1}`);
      }
    }
    
    if (level >= 1 && classData.spellcasting.spellSlots) {
      const slots = classData.spellcasting.spellSlots[level] || classData.spellcasting.spellSlots[1] || [];
      slots.forEach((slotCount, spellLevel) => {
        for (let i = 0; i < slotCount; i++) {
          spells.push(`Magia de ${spellLevel + 1}º Nível`);
        }
      });
    }
    
    return spells;
  };

  const getStartingEquipment = (classData) => {
    if (!classData?.equipment) return [];
    
    const equipment = [];
    if (classData.equipment.armor) equipment.push(classData.equipment.armor);
    if (classData.equipment.weapons) equipment.push(...classData.equipment.weapons);
    if (classData.equipment.gear) equipment.push(...classData.equipment.gear);
    
    return equipment;
  };

  // Carregar o sistema de RPG selecionado
  useEffect(() => {
    const storedGameSystem = sessionStorage.getItem('selectedGameSystem');
    
    if (storedGameSystem) {
      setGameSystem(storedGameSystem);
      setStep(1); // Pular a seleção de sistema se já tiver sido escolhido
    }
    
    // Limpar o sessionStorage após carregar
    sessionStorage.removeItem('selectedGameSystem');
  }, []);

  // Calcular faixa etária automaticamente baseada na idade
  useEffect(() => {
    if (characterAge) {
      const age = parseInt(characterAge);
      if (age <= 12) {
        setAgeGroup('child');
      } else if (age <= 17) {
        setAgeGroup('young');
      } else if (age <= 59) {
        setAgeGroup('adult');
      } else {
        setAgeGroup('elder');
      }
    }
  }, [characterAge]);

  // When race and class are selected, set character details
  useEffect(() => {
    if (selectedRace && selectedClass) {
      const details = {
        race: selectedRace.name,
        class: selectedClass.name,
        subclass: selectedSubclass?.name || 'Não selecionada',
        level: selectedLevel,
        background: 'Aventureiro' // Default background, can be customized later
      };
      setCharacterDetails(details);
    }
  }, [selectedRace, selectedClass, selectedSubclass, selectedLevel]);

  // Handle game system selection
  const handleGameSystemSelect = (system) => {
    setGameSystem(system);
    setStep(2); // Vai para seleção de nível
  };

  // Handle character name and age input
  const handleNameAgeNext = () => {
    if (!characterName.trim()) {
      setError('Por favor, digite o nome do personagem.');
      return;
    }
    if (!characterAge || parseInt(characterAge) < 1) {
      setError('Por favor, digite uma idade válida.');
      return;
    }
    setError('');
    setStep(1); // Vai para seleção de sistema
  };

  // Handle level selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  // Handle race and class selection
  const handleRaceClassSelection = (selection) => {
    setSelectedRace(selection.race);
    setSelectedClass(selection.class);
    // Não avança automaticamente - deixa o usuário usar os botões
  };

  // Handle subclass selection
  const handleSubclassSelect = (subclass) => {
    setSelectedSubclass(subclass);
  };

  // Handle life stage selection
  const handleLifeStageSelect = (stage, option) => {
    setLifeStageSelections(prev => ({
      ...prev,
      [stage]: option
    }));
  };

  // Move to next life stage
  const handleNextLifeStage = () => {
    const stages = Object.keys(lifeStages);
    const currentIndex = stages.indexOf(currentLifeStage);
    
    // Limitar estágios com base na faixa etária
    const maxStageIndex = getMaxStageIndex();
    
    if (currentIndex < maxStageIndex) {
      setCurrentLifeStage(stages[currentIndex + 1]);
    } else {
      // All life stages completed, generate story
      handleGenerateStory();
    }
  };

  // Função auxiliar para obter o índice máximo de estágio com base na faixa etária
  const getMaxStageIndex = () => {
    if (ageGroup === 'child') {
      return 2; // Até childhood (3 estágios)
    } else if (ageGroup === 'young') {
      return 4; // Até adolescence (5 estágios)
    } else {
      return Object.keys(lifeStages).length - 1; // Todos os estágios
    }
  };

  // Move to previous life stage
  const handlePrevLifeStage = () => {
    const stages = Object.keys(lifeStages);
    const currentIndex = stages.indexOf(currentLifeStage);
    
    if (currentIndex > 0) {
      setCurrentLifeStage(stages[currentIndex - 1]);
    } else {
      // Go back to character details
      setStep(6);
    }
  };

  // Start life stage selection
  const handleStartLifeStages = () => {
    setCurrentLifeStage('infancy');
    setStep(7);
  };

  // Generate story when all life stages are completed
  const handleGenerateStory = async () => {
    setLoading(true);
    setError('');
    
    try {
      const characterData = {
        name: characterName,
        age: characterAge,
        gameSystem: gameSystem,
        ageGroup: ageGroup,
        level: selectedLevel,
        race: characterDetails.race,
        class: characterDetails.class,
        subclass: characterDetails.subclass,
        background: characterDetails.background,
        lifeStages: lifeStageSelections
      };
      
      const generatedStory = await generateCharacterStory(characterData);
      setStory(generatedStory);
      setStep(8); // Avançar para a etapa de visualização da história
    } catch (error) {
      console.error('Erro ao gerar história:', error);
      setError('Ocorreu um erro ao gerar a história. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Download character as PDF
  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      
      // Gerar detalhes completos do personagem incluindo status e habilidades
      const systemData = rpgSystems[gameSystem];
      const classData = systemData?.classes?.find(c => c.id === selectedClass?.id);
      
      const character = {
        name: characterName,
        age: characterAge,
        gameSystem: gameSystem,
        ageGroup: ageGroup,
        level: selectedLevel,
        race: characterDetails?.race || 'Não definido',
        class: characterDetails?.class || 'Não definido',
        subclass: characterDetails?.subclass || 'Não selecionada',
        background: characterDetails?.background || 'Não definido',
        lifeStages: lifeStageSelections,
        story: story || 'História não gerada',
        // Adicionar informações de status e habilidades
        hitPoints: calculateHitPoints(selectedLevel, classData),
        armorClass: calculateArmorClass(selectedRace, selectedClass),
        proficiencyBonus: Math.ceil(selectedLevel / 4) + 1,
        abilities: generateAbilityScores(selectedRace, selectedClass),
        features: getClassFeatures(classData, selectedSubclass, selectedLevel),
        spells: getAvailableSpells(classData, selectedLevel),
        equipment: getStartingEquipment(classData)
      };
      
      generateCharacterPDF(character);
      
      // Opcional: redirecionar para a página inicial após o download
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Render the main input container with all steps
  const renderMainContainer = () => {
    return (
      <motion.div 
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main content area - fixed height with better structure */}
          <GlassPanel className="p-0 relative overflow-hidden flex-1 h-[700px] flex flex-col">
            {/* Progress indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-rpg-dark/30 z-10">
              <motion.div 
                className="h-full bg-rpg-accent" 
                initial={{ width: `${(step / 8) * 100}%` }}
                 animate={{ width: `${(step / 8) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pt-6 px-6 pb-4">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="game-system"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="title-fantasy text-2xl mb-4 text-center">SELECIONE SEU SISTEMA PARA COMEÇARMOS</h2>
                    <div className="flex justify-center mb-6">
                      <div className="flex items-center text-rpg-accent">
                        <span className="text-lg mr-2">👇</span>
                        <span className="text-sm">Clique em um dos sistemas abaixo</span>
                      </div>
                    </div>
                    <div className="px-4">
                      <GameSystemSelector onSelect={handleGameSystemSelect} />
                    </div>
                  </motion.div>
                )}
                
                {step === 1 && (
                  <motion.div
                    key="name-age"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <h2 className="title-fantasy text-2xl mb-6 text-center">Informações Básicas</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="characterName" className="block text-rpg-accent mb-2 font-semibold">Nome do Personagem</label>
                        <input
                          id="characterName"
                          type="text"
                          value={characterName}
                          onChange={(e) => setCharacterName(e.target.value)}
                          className="w-full bg-rpg-dark/50 border border-rpg-accent/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rpg-accent text-lg"
                          placeholder="Digite o nome do seu personagem"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="characterAge" className="block text-rpg-accent mb-2 font-semibold">Idade</label>
                        <input
                          id="characterAge"
                          type="number"
                          min="1"
                          max="100"
                          value={characterAge}
                          onChange={(e) => setCharacterAge(parseInt(e.target.value) || 0)}
                          className="w-full bg-rpg-dark/50 border border-rpg-accent/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rpg-accent text-lg"
                          placeholder="Digite a idade do personagem"
                        />
                        {characterAge > 0 && (
                          <p className="text-sm text-rpg-light/60 mt-2">
                            Faixa etária: {ageGroup === 'child' ? 'Criança' : ageGroup === 'young' ? 'Jovem' : ageGroup === 'adult' ? 'Adulto' : 'Idoso'}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                  </motion.div>
                )}
                
                {step === 2 && (
                  <motion.div
                    key="level-selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <LevelSelector
                      selectedLevel={selectedLevel}
                      onLevelSelect={handleLevelSelect}
                      gameSystem={gameSystem}
                    />
                  </motion.div>
                )}
                
                {step === 3 && (
                  <motion.div
                    key="race-class-selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <RaceClassSelector
                      gameSystem={gameSystem}
                      onSelectionComplete={handleRaceClassSelection}
                      initialRace={selectedRace}
                      initialClass={selectedClass}
                    />
                  </motion.div>
                )}
                
                {step === 4 && selectedClass && rpgSystems[gameSystem]?.classes?.find(c => c.id === selectedClass)?.subclasses && (
                  <motion.div
                    key="subclass-selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <SubclassSelector
                      selectedClass={selectedClass}
                      selectedSubclass={selectedSubclass}
                      onSubclassSelect={handleSubclassSelect}
                      gameSystem={gameSystem}
                    />
                  </motion.div>
                )}
                
                {step === 5 && (
                  <motion.div
                    key="character-details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <h2 className="title-fantasy text-2xl mb-6 text-center">Resumo do Personagem</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-rpg-dark/30 p-4 rounded-lg">
                          <label className="block text-rpg-accent mb-2 font-semibold">Nome</label>
                          <p className="text-lg">{characterName}</p>
                        </div>
                        
                        <div className="bg-rpg-dark/30 p-4 rounded-lg">
                          <label className="block text-rpg-accent mb-2 font-semibold">Idade</label>
                          <p className="text-lg">{characterAge} anos ({ageGroup === 'child' ? 'Criança' : ageGroup === 'young' ? 'Jovem' : ageGroup === 'adult' ? 'Adulto' : 'Idoso'})</p>
                        </div>
                        
                        <div className="bg-rpg-dark/30 p-4 rounded-lg">
                          <label className="block text-rpg-accent mb-2 font-semibold">Nível</label>
                          <p className="text-lg">Nível {selectedLevel}</p>
                        </div>
                        
                        <div className="bg-rpg-dark/30 p-4 rounded-lg">
                          <label className="block text-rpg-accent mb-2 font-semibold">Raça</label>
                          <p className="text-lg">{characterDetails.race}</p>
                        </div>
                        
                        <div className="bg-rpg-dark/30 p-4 rounded-lg">
                          <label className="block text-rpg-accent mb-2 font-semibold">Classe</label>
                          <p className="text-lg">{characterDetails.class}</p>
                        </div>
                        
                        {selectedSubclass && (
                          <div className="bg-rpg-dark/30 p-4 rounded-lg">
                            <label className="block text-rpg-accent mb-2 font-semibold">Subclasse</label>
                            <p className="text-lg">{selectedSubclass}</p>
                          </div>
                        )}
                        
                        <div className="bg-rpg-dark/30 p-4 rounded-lg">
                          <label className="block text-rpg-accent mb-2 font-semibold">Background</label>
                          <p className="text-lg">{characterDetails.background}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {step === 7 && currentLifeStage && (
                   <motion.div
                     key={`life-stage-${currentLifeStage}`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                     className="px-4"
                   >
                     {renderLifeStageContent()}
                   </motion.div>
                 )}
                 
                 {step === 8 && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="px-4"
                  >
                    <h2 className="title-fantasy text-2xl mb-6 text-center">A História de {characterName}</h2>
                    
                    <div className="mb-6">
                      <div className="glass p-6 min-h-[200px] max-h-[350px] overflow-y-auto custom-scrollbar text-rpg-light/90 leading-relaxed">
                        {typeof story === 'string' ? story : 'História não disponível'}
                      </div>
                    </div>
                    
                    {/* Botões movidos para área fixa */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Área fixa para botões de navegação */}
            <div className="bg-gradient-to-t from-rpg-dark/40 via-rpg-dark/20 to-transparent p-6 backdrop-blur-sm">
              {step === 0 && (
                <div className="flex justify-center">
                  <p className="text-rpg-light/60">Aguardando seleção do sistema...</p>
                </div>
              )}
              
              {step === 1 && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setGameSystem(null);
                      setStep(0);
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleNameAgeNext}
                    disabled={!characterName.trim() || !characterAge}
                  >
                    Continuar
                  </Button>
                </div>
              )}
              
              {step === 2 && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => selectedLevel && setStep(3)}
                    disabled={!selectedLevel}
                  >
                    Continuar
                  </Button>
                </div>
              )}
              
              {step === 3 && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      if (selectedRace && selectedClass) {
                        // Check if class has subclasses
                        const classData = rpgSystems[gameSystem]?.classes?.find(c => c.id === selectedClass);
                        if (classData?.subclasses) {
                          setStep(4); // Go to subclass selection
                        } else {
                          setStep(5); // Skip to character details
                        }
                      }
                    }}
                    disabled={!selectedRace || !selectedClass}
                  >
                    Continuar
                  </Button>
                </div>
              )}
              
              {step === 4 && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setStep(3);
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => selectedSubclass && setStep(5)}
                    disabled={!selectedSubclass}
                  >
                    Continuar
                  </Button>
                </div>
              )}
              
              {step === 5 && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      // Check if we came from subclass selection or directly from race/class
                      const classData = rpgSystems[gameSystem]?.classes?.find(c => c.id === selectedClass);
                      if (classData?.subclasses) {
                        setStep(4); // Go back to subclass selection
                      } else {
                        setStep(3); // Go back to race/class selection
                      }
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleStartLifeStages}
                    disabled={loading}
                  >
                    Continuar para História de Vida
                  </Button>
                </div>
              )}
              
              {step === 6 && currentLifeStage && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={handlePrevLifeStage}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleNextLifeStage}
                    disabled={!lifeStageSelections[currentLifeStage]}
                  >
                    {(() => {
                      const stages = Object.keys(lifeStages);
                      const currentIndex = stages.indexOf(currentLifeStage);
                      const maxStageIndex = getMaxStageIndex();
                      return currentIndex === maxStageIndex ? 'Gerar História' : 'Próxima Etapa';
                    })()}
                  </Button>
                </div>
              )}
              
              {step === 7 && (
                <div className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      const stages = Object.keys(lifeStages);
                      const maxStageIndex = getMaxStageIndex();
                      setCurrentLifeStage(stages[maxStageIndex]);
                      setStep(6);
                    }}
                  >
                    Voltar
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleDownloadPDF}
                    disabled={loading}
                  >
                    {loading ? 'Gerando PDF...' : '📄 Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>
          </GlassPanel>
          
          {/* Character summary sidebar - appears after step 0 */}
          {step > 0 && (
            <motion.div 
              className="md:w-64 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GlassPanel className="p-4 h-full">
                <h3 className="text-lg font-fantasy mb-4 text-center border-b border-rpg-light/10 pb-2">Seu Personagem</h3>
                <div className="space-y-3">
                  {gameSystem && (
                    <div className="bg-[#3D3D3D] rounded-lg p-2">
                      <span className="text-xs uppercase tracking-wider text-rpg-light/50 block">Sistema</span>
                      <span className="text-rpg-gold">{getSystemName(gameSystem)}</span>
                    </div>
                  )}
                  {selectedArchetype && (
                    <div className="bg-[#2D2D3D] rounded-lg p-2">
                      <span className="text-xs uppercase tracking-wider text-rpg-light/50 block">Arquétipo</span>
                      <span className="text-[#9CB9D8]">{selectedArchetype}</span>
                    </div>
                  )}
                  {ageGroup && (
                    <div className="bg-[#3D2D3D] rounded-lg p-2">
                      <span className="text-xs uppercase tracking-wider text-rpg-light/50 block">Idade</span>
                      <span className="text-[#D89C9C]">{ageGroup === 'child' ? 'Criança' : ageGroup === 'young' ? 'Jovem' : 'Adulto'}</span>
                    </div>
                  )}
                  {characterDetails && (
                    <>
                      <div className="bg-[#2D3D3D] rounded-lg p-2">
                        <span className="text-xs uppercase tracking-wider text-rpg-light/50 block">Raça</span>
                        <span className="text-[#9CD8B9]">{characterDetails.race}</span>
                      </div>
                      <div className="bg-[#3D3D2D] rounded-lg p-2">
                        <span className="text-xs uppercase tracking-wider text-rpg-light/50 block">Classe</span>
                        <span className="text-[#D8D09C]">{characterDetails.class}</span>
                      </div>
                    </>  
                  )}
                  {characterName && (
                    <div className="bg-[#2D2D2D] rounded-lg p-2 border border-rpg-accent/20">
                      <span className="text-xs uppercase tracking-wider text-rpg-light/50 block">Nome</span>
                      <span className="text-rpg-accent">{characterName}</span>
                    </div>
                  )}
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // Helper function to get system name in English
  const getSystemName = (systemId) => {
    switch(systemId) {
      case 'dnd': return 'Dungeons & Dragons';
      case 'pathfinder': return 'Pathfinder';
      case 'callOfCthulhu': return 'Call of Cthulhu';
      case 'vampireMasquerade': return 'Vampire: The Masquerade';
      default: return systemId;
    }
  };

  // Render life stage content
  const renderLifeStageContent = () => {
    if (!currentLifeStage) return null;
    
    const stageData = lifeStages[currentLifeStage];
    const selectedOption = lifeStageSelections[currentLifeStage];
    
    // Verificar se é o último estágio disponível para a faixa etária
    const stages = Object.keys(lifeStages);
    const currentIndex = stages.indexOf(currentLifeStage);
    const maxStageIndex = getMaxStageIndex();
    const isLastStage = currentIndex === maxStageIndex;
    
    return (
      <>
        <h2 className="title-fantasy text-2xl mb-2 text-center">{stageData.title}</h2>
        <p className="text-center mb-6 text-rpg-light/80">{stageData.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {stageData.options.map(option => (
            <div 
              key={option.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedOption?.id === option.id 
                  ? 'bg-rpg-accent/30 border border-rpg-accent/50 shadow-lg shadow-rpg-accent/20' 
                  : 'bg-rpg-dark/30 border border-rpg-light/10 hover:bg-rpg-accent/20 hover:border-rpg-accent/50 hover:shadow-lg hover:shadow-rpg-accent/30'
              }`}
              onClick={() => handleLifeStageSelect(currentLifeStage, option)}
            >
              <h3 className={`font-fantasy text-lg mb-1 transition-all duration-300 ${
                selectedOption?.id === option.id ? 'font-bold text-rpg-accent' : 'hover:font-bold hover:text-rpg-accent'
              }`}>{option.title}</h3>
              <p className="text-sm text-rpg-light/80">{option.description}</p>
            </div>
          ))}
        </div>
        
        {/* Botões removidos - agora estão na área fixa */}
      </>
    );
  };

  // Render loading state
  const renderLoading = () => (
    <GlassPanel className="flex flex-col items-center justify-center p-10 h-[600px]">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-rpg-gold">Consultando os pergaminhos antigos...</p>
    </GlassPanel>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        renderLoading()
      ) : (
        renderMainContainer()
      )}
    </div>
  );
};

export default CharacterCreator;