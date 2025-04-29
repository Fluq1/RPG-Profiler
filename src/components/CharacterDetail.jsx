import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';
import Button from './ui/Button';
import { useCharacter } from '../contexts/CharacterContext';
import { lifeStages } from '../data/lifeStages';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCharacter, deleteCharacter } = useCharacter();
  const character = getCharacter(id);

  if (!character) {
    return (
      <GlassPanel className="text-center py-12">
        <h2 className="title-fantasy mb-4">Personagem não encontrado</h2>
        <p className="mb-6 text-rpg-light/80">
          O personagem que você está procurando não existe ou foi removido.
        </p>
        <Link to="/">
          <Button variant="primary" className="mx-auto">
            Voltar para Lista
          </Button>
        </Link>
      </GlassPanel>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      deleteCharacter(id);
      navigate('/');
    }
  };

  // Check if character has life stages
  const hasLifeStages = character.lifeStages && Object.values(character.lifeStages).some(stage => stage !== null);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="secondary" size="sm">
              ← Voltar
            </Button>
          </Link>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={handleDelete}
          >
            Excluir Personagem
          </Button>
        </div>

        <GlassPanel className="mb-8 p-6">
          <h1 className="title-fantasy text-3xl mb-6 text-center">{character.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <h3 className="text-rpg-accent mb-2">Arquétipo</h3>
              <p className="text-xl">{character.archetype}</p>
            </div>
            <div className="text-center">
              <h3 className="text-rpg-accent mb-2">Raça</h3>
              <p className="text-xl">{character.race}</p>
            </div>
            <div className="text-center">
              <h3 className="text-rpg-accent mb-2">Classe</h3>
              <p className="text-xl">{character.class}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-rpg-accent mb-2">Background</h3>
            <p>{character.background}</p>
          </div>
        </GlassPanel>
        
        {hasLifeStages && (
          <GlassPanel className="mb-8 p-6">
            <h2 className="title-fantasy text-2xl mb-4">Jornada de Vida</h2>
            <div className="space-y-6">
              {Object.entries(character.lifeStages || {}).map(([stageKey, selection]) => {
                if (!selection) return null;
                const stageInfo = lifeStages[stageKey];
                
                return (
                  <div key={stageKey} className="border-b border-rpg-light/10 pb-4 last:border-0">
                    <h3 className="font-fantasy text-xl text-rpg-gold mb-2">
                      {stageInfo?.title || stageKey}
                    </h3>
                    <div className="bg-rpg-dark/30 p-4 rounded-lg">
                      <h4 className="font-medium text-rpg-accent mb-1">{selection.title}</h4>
                      <p className="text-rpg-light/80">{selection.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        )}
        
        <GlassPanel className="p-6">
          <h2 className="title-fantasy text-2xl mb-4">História</h2>
          <div className="prose prose-invert max-w-none">
            {character.story.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
};

export default CharacterDetail;