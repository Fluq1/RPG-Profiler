import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';
import Card from './ui/Card';
import Button from './ui/Button';
import { useCharacter } from '../contexts/CharacterContext';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const { characters, deleteCharacter } = useCharacter();
  
  if (characters.length === 0) {
    return (
      <GlassPanel className="text-center py-12">
        <h2 className="title-fantasy mb-4">Nenhum Personagem Encontrado</h2>
        <p className="mb-6 text-rpg-light/80">
          Você ainda não criou nenhum personagem. Comece sua jornada agora!
        </p>
        <Link to="/create">
          <Button variant="primary" className="mx-auto">
            Criar Novo Personagem
          </Button>
        </Link>
      </GlassPanel>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="title-fantasy text-2xl">Seus Personagens</h1>
        <Link to="/create">
          <Button variant="primary" size="sm">
            <span className="mr-2">+</span> Novo Personagem
          </Button>
        </Link>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {characters.map((character) => (
          <motion.div
            key={character.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 24 
            }}
          >
            <Card className="h-full">
              <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="title-fantasy text-xl">{character.name}</h3>
                  <div className="flex space-x-2">
                    <Link to={`/character/${character.id}`}>
                      <Button variant="icon" size="sm" aria-label="Ver detalhes">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </Link>
                    <Button 
                      variant="icon" 
                      size="sm" 
                      className="text-red-400 hover:text-red-500"
                      onClick={() => deleteCharacter(character.id)}
                      aria-label="Excluir personagem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2 mb-4">
                  <div className="flex items-center">
                    <span className="text-rpg-accent font-medium w-24">Arquétipo:</span>
                    <span>{character.archetype}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-rpg-accent font-medium w-24">Raça:</span>
                    <span>{character.race}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-rpg-accent font-medium w-24">Classe:</span>
                    <span>{character.class}</span>
                  </div>
                </div>
                
                <Link to={`/character/${character.id}`} className="mt-auto">
                  <Button variant="secondary" className="w-full">
                    Ver História
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CharacterList;