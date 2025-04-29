import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassPanel from './ui/GlassPanel';
import Button from './ui/Button';
import { useCharacter } from '../contexts/CharacterContext';
import { generateCharacterDetails, generateCharacterStory } from '../services/aiService';
import GameSystemSelector from './GameSystemSelector';
import ArchetypeSelector from './ArchetypeSelector';
import LifeStageSelector from './LifeStageSelector';
import LoadingSpinner from './ui/LoadingSpinner';
import { lifeStages } from '../data/lifeStages';

const CharacterCreator = () => {
  const navigate = useNavigate();
  const { addCharacter } = useCharacter();
  
  // State for multi-step form
  const [step, setStep] = useState(0); // Start with game system selection
  const [gameSystem, setGameSystem] = useState(null);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null); // Nova state para faixa etária
  const [characterDetails, setCharacterDetails] = useState(null);
  const [characterName, setCharacterName] = useState('');
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

  // When an archetype is selected, generate character details
  useEffect(() => {
    if (selectedArchetype && step === 3) {
      setLoading(true);
      setError('');
      
      generateCharacterDetails(selectedArchetype)
        .then(details => {
          setCharacterDetails(details);
          setStep(4);
        })
        .catch(err => {
          console.error('Error generating character details:', err);
          setError('Falha ao gerar detalhes do personagem. Tente novamente.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedArchetype, step]);

  // Handle game system selection
  const handleGameSystemSelect = (system) => {
    setGameSystem(system);
    setStep(1);
  };

  // Handle age group selection
  const handleAgeGroupSelect = (group) => {
    setAgeGroup(group);
    setStep(3);
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
      setStep(4);
    }
  };

  // Start life stage selection
  const handleStartLifeStages = () => {
    if (!characterName.trim()) {
      setError('Por favor, dê um nome ao seu personagem.');
      return;
    }
    
    setCurrentLifeStage('infancy');
    setStep(5);
  };

  // Generate story when all life stages are completed
  const handleGenerateStory = async () => {
    setLoading(true);
    setError('');
    
    try {
      const characterData = {
        name: characterName,
        gameSystem: gameSystem,
        archetype: selectedArchetype,
        ageGroup: ageGroup,
        race: characterDetails.race,
        class: characterDetails.class,
        background: characterDetails.background,
        lifeStages: lifeStageSelections
      };
      
      const generatedStory = await generateCharacterStory(characterData);
      setStory(generatedStory);
      setStep(6);
    } catch (err) {
      console.error('Error generating story:', err);
      setError('Falha ao gerar história. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Save character and navigate to character list
  const handleSaveCharacter = () => {
    const character = {
      name: characterName,
      gameSystem: gameSystem,
      archetype: selectedArchetype,
      ageGroup: ageGroup,
      race: characterDetails.race,
      class: characterDetails.class,
      background: characterDetails.background,
      lifeStages: lifeStageSelections,
      story: story
    };
    
    const newCharacter = addCharacter(character);
    navigate(`/character/${newCharacter.id}`);
  };

  // Render game system selection
  const renderGameSystemSelection = () => (
    <GameSystemSelector onSelect={handleGameSystemSelect} />
  );

  // Render archetype selection
  const renderArchetypeSelection = () => (
    <>
      <h2 className="title-fantasy text-2xl mb-6 text-center">Escolha um Arquétipo</h2>
      
      <ArchetypeSelector 
        onSelect={setSelectedArchetype}
        selectedArchetype={selectedArchetype}
        gameSystem={gameSystem}
      />
      
      <div className="mt-6 flex justify-between">
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
          onClick={() => selectedArchetype && setStep(2)}
          disabled={!selectedArchetype}
        >
          Continuar
        </Button>
      </div>
    </>
  );

  // Render age group selection
  const renderAgeGroupSelection = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="title-fantasy text-2xl mb-6 text-center">Escolha a Faixa Etária</h2>
        
        <GlassPanel className="mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div 
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                ageGroup === 'child' 
                  ? 'bg-rpg-accent/30 border border-rpg-accent/50' 
                  : 'bg-rpg-dark/30 border border-rpg-light/10 hover:bg-rpg-dark/50'
              }`}
              onClick={() => setAgeGroup('child')}
            >
              <h3 className="font-fantasy text-lg mb-1">Criança</h3>
              <p className="text-sm text-rpg-light/80">Até 12 anos</p>
              <p className="text-xs text-rpg-light/60 mt-2">Acesso às 3 primeiras etapas de vida</p>
            </div>
            
            <div 
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                ageGroup === 'young' 
                  ? 'bg-rpg-accent/30 border border-rpg-accent/50' 
                  : 'bg-rpg-dark/30 border border-rpg-light/10 hover:bg-rpg-dark/50'
              }`}
              onClick={() => setAgeGroup('young')}
            >
              <h3 className="font-fantasy text-lg mb-1">Jovem</h3>
              <p className="text-sm text-rpg-light/80">Até 18 anos</p>
              <p className="text-xs text-rpg-light/60 mt-2">Acesso até o fim da adolescência</p>
            </div>
            
            <div 
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                ageGroup === 'adult' 
                  ? 'bg-rpg-accent/30 border border-rpg-accent/50' 
                  : 'bg-rpg-dark/30 border border-rpg-light/10 hover:bg-rpg-dark/50'
              }`}
              onClick={() => setAgeGroup('adult')}
            >
              <h3 className="font-fantasy text-lg mb-1">Adulto</h3>
              <p className="text-sm text-rpg-light/80">26+ anos</p>
              <p className="text-xs text-rpg-light/60 mt-2">Acesso a todas as etapas de vida</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="secondary" 
              onClick={() => {
                setSelectedArchetype(null);
                setStep(1);
              }}
            >
              Voltar
            </Button>
            <Button 
              variant="primary" 
              onClick={() => ageGroup && handleAgeGroupSelect(ageGroup)}
              disabled={!ageGroup}
            >
              Continuar
            </Button>
          </div>
        </GlassPanel>
      </motion.div>
    </>
  );

  // Render character details
  const renderCharacterDetails = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="title-fantasy text-2xl mb-6 text-center">Detalhes do Personagem</h2>
        
        <GlassPanel className="mb-6 p-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-rpg-accent mb-2">Raça Sugerida</label>
              <p className="text-lg">{characterDetails.race}</p>
            </div>
            
            <div>
              <label className="block text-rpg-accent mb-2">Classe Sugerida</label>
              <p className="text-lg">{characterDetails.class}</p>
            </div>
            
            <div>
              <label className="block text-rpg-accent mb-2">Background Sugerido</label>
              <p className="text-lg">{characterDetails.background}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="characterName" className="block text-rpg-accent mb-2">Nome do Personagem</label>
            <input
              id="characterName"
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full bg-rpg-dark/50 border border-rpg-accent/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rpg-accent"
              placeholder="Digite o nome do seu personagem"
            />
          </div>
          
          {error && <p className="text-red-400 mb-4">{error}</p>}
          
          <div className="flex justify-between">
            <Button 
              variant="secondary" 
              onClick={() => {
                setAgeGroup(null);
                setStep(2);
              }}
            >
              Voltar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleStartLifeStages}
              disabled={loading || !characterName.trim()}
            >
              Continuar para História de Vida
            </Button>
          </div>
        </GlassPanel>
      </motion.div>
    </>
  );

  // Render life stage selection
  const renderLifeStageSelection = () => {
    if (!currentLifeStage) return null;
    
    const stageData = lifeStages[currentLifeStage];
    const selectedOption = lifeStageSelections[currentLifeStage];
    
    // Verificar se é o último estágio disponível para a faixa etária
    const stages = Object.keys(lifeStages);
    const currentIndex = stages.indexOf(currentLifeStage);
    const maxStageIndex = getMaxStageIndex();
    const isLastStage = currentIndex === maxStageIndex;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={currentLifeStage}
      >
        <h2 className="title-fantasy text-2xl mb-2 text-center">{stageData.title}</h2>
        <p className="text-center mb-6 text-rpg-light/80">{stageData.description}</p>
        
        <GlassPanel className="mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {stageData.options.map(option => (
              <div 
                key={option.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedOption?.id === option.id 
                    ? 'bg-rpg-accent/30 border border-rpg-accent/50' 
                    : 'bg-rpg-dark/30 border border-rpg-light/10 hover:bg-rpg-dark/50'
                }`}
                onClick={() => handleLifeStageSelect(currentLifeStage, option)}
              >
                <h3 className="font-fantasy text-lg mb-1">{option.title}</h3>
                <p className="text-sm text-rpg-light/80">{option.description}</p>
              </div>
            ))}
          </div>
          
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
              disabled={!selectedOption}
            >
              {isLastStage ? 'Gerar História' : 'Próxima Etapa'}
            </Button>
          </div>
        </GlassPanel>
      </motion.div>
    );
  };

  // Render story
  const renderStory = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="title-fantasy text-2xl mb-6 text-center">A História de {characterName}</h2>
        
        <GlassPanel className="mb-6 p-6">
          <div className="mb-6">
            <div className="glass p-6 min-h-[200px] text-rpg-light/90 leading-relaxed">
              {story}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="secondary" 
              onClick={() => {
                const stages = Object.keys(lifeStages);
                const maxStageIndex = getMaxStageIndex();
                setCurrentLifeStage(stages[maxStageIndex]);
                setStep(5);
              }}
            >
              Voltar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveCharacter}
            >
              Salvar Personagem
            </Button>
          </div>
        </GlassPanel>
      </motion.div>
    </>
  );

  // Render loading state
  const renderLoading = () => (
    <GlassPanel className="flex flex-col items-center justify-center p-10">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-rpg-gold">Consultando os pergaminhos antigos...</p>
    </GlassPanel>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        renderLoading()
      ) : (
        <>
          {step === 0 && renderGameSystemSelection()}
          {step === 1 && renderArchetypeSelection()}
          {step === 2 && renderAgeGroupSelection()}
          {step === 3 && renderLoading()}
          {step === 4 && renderCharacterDetails()}
          {step === 5 && renderLifeStageSelection()}
          {step === 6 && renderStory()}
        </>
      )}
    </div>
  );
};

export default CharacterCreator;