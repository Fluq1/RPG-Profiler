import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';

const CharacterListPage = () => {
  const navigate = useNavigate();
  const { characters, deleteCharacter } = useCharacter();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleDeleteCharacter = (characterId) => {
    if (window.confirm('Tem certeza que deseja excluir este personagem?')) {
      deleteCharacter(characterId);
    }
  };

  const handleViewCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header da página */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Meus Personagens</h1>
              <p className="text-gray-400">Gerencie seus personagens criados</p>
            </div>
            <button
              onClick={() => navigate('/create')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#E86305] rounded-xl hover:from-[#E86305] hover:to-[#D45204] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Criar Novo Personagem</span>
            </button>
          </div>
        </motion.div>

        {/* Lista de personagens */}
        {characters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-2xl font-semibold mb-2">Nenhum personagem criado ainda</h2>
            <p className="text-gray-400 mb-6">Comece criando seu primeiro personagem!</p>
            <button
              onClick={() => navigate('/create')}
              className="px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#E86305] rounded-xl hover:from-[#E86305] hover:to-[#D45204] transition-all duration-300"
            >
              Criar Primeiro Personagem
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-xl p-6 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{character.system === 'dnd' ? '🐉' : '🎲'}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{character.name || 'Personagem Sem Nome'}</h3>
                      <p className="text-sm text-gray-400">{character.system?.toUpperCase() || 'Sistema Desconhecido'}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewCharacter(character)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Ver detalhes"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCharacter(character.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Excluir personagem"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {character.details && (
                  <div className="space-y-2">
                    {character.details.race && (
                      <p className="text-sm"><span className="text-gray-400">Raça:</span> {character.details.race}</p>
                    )}
                    {character.details.class && (
                      <p className="text-sm"><span className="text-gray-400">Classe:</span> {character.details.class}</p>
                    )}
                    {character.details.background && (
                      <p className="text-sm"><span className="text-gray-400">Antecedente:</span> {character.details.background}</p>
                    )}
                  </div>
                )}
                
                {character.story && (
                  <div className="mt-4 p-3 bg-[#0A0A0A] rounded-lg">
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {typeof character.story === 'string' 
                        ? character.story.substring(0, 150) + '...' 
                        : 'História não disponível'}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 text-xs text-gray-500">
                  Criado em: {new Date(character.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal de detalhes do personagem */}
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1A1A1A] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedCharacter.name || 'Personagem Sem Nome'}</h2>
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="p-2 hover:bg-[#2D2D2D] rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {selectedCharacter.details && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Detalhes do Personagem</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedCharacter.details).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="ml-2">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedCharacter.story && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">História do Personagem</h3>
                  <div className="bg-[#0A0A0A] rounded-lg p-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedCharacter.story}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CharacterListPage;