import React, { useState, useEffect } from 'react';
import GlassPanel from './ui/GlassPanel';
import Button from './ui/Button';
import { generateStory } from '../services/aiService';
import { useCharacter } from '../contexts/CharacterContext';

const StoryGenerator = ({ character, onSave, onBack }) => {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { saveCharacter } = useCharacter();
  
  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const generatedStory = await generateStory(character);
        setStory(generatedStory);
      } catch (error) {
        console.error('Erro ao gerar história:', error);
        setStory('Falha ao gerar a história do personagem. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStory();
  }, [character]);
  
  const handleSave = () => {
    const completeCharacter = {
      ...character,
      story
    };
    
    const savedCharacter = saveCharacter(completeCharacter);
    onSave(savedCharacter);
  };
  
  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };
  
  return (
    <GlassPanel>
      <h2 className="title-fantasy mb-6">A História de {character.name}</h2>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-10">
          <div className="animate-pulse-slow text-rpg-gold text-2xl">
            Os bardos estão compondo sua história...
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-fantasy text-xl text-rpg-gold">
                {character.name}, {character.race} {character.class}
              </h3>
              <Button 
                onClick={() => setEditing(!editing)} 
                className="text-sm"
                primary={false}
              >
                {editing ? 'Visualizar' : 'Editar História'}
              </Button>
            </div>
            
            {editing ? (
              <textarea
                value={story}
                onChange={handleStoryChange}
                className="input-glass w-full h-64 resize-none"
              />
            ) : (
              <div className="glass p-6 min-h-[200px] text-rpg-light/90 leading-relaxed">
                {story}
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button onClick={onBack} primary={false}>
              Voltar
            </Button>
            <Button onClick={handleSave}>
              Salvar Personagem
            </Button>
          </div>
        </>
      )}
    </GlassPanel>
  );
};

export default StoryGenerator;