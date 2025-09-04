import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import GameSystemSelector from './GameSystemSelector';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [selectedSystem, setSelectedSystem] = useState('dnd5e');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'create' ou 'quick-create'
  
  // Sistemas de RPG disponíveis
  const gameSystems = [
    { id: 'dnd5e', name: 'Dungeons & Dragons 5e', description: 'O sistema de RPG mais popular do mundo', icon: '🐉', active: true },
    { id: 'pathfinder', name: 'Pathfinder 2e', description: 'Sistema tático e customizável', icon: '⚔️', active: false },
    { id: 'callOfCthulhu', name: 'Call of Cthulhu', description: 'Horror cósmico e investigação', icon: '🐙', active: false },
    { id: 'vampireMasquerade', name: 'Vampire: The Masquerade', description: 'Política vampiresca urbana', icon: '🧛', active: false },
  ];

  const [selectedSystemObj, setSelectedSystemObj] = useState(gameSystems[0]);

  // Função para iniciar a criação de personagem
  const handleCreateCharacter = () => {
    if (!selectedSystemObj.active) {
      alert('Este sistema ainda não está disponível. Em breve!');
      return;
    }
    
    // Armazenar o sistema selecionado no sessionStorage
    // para recuperar na tela de criação de personagem
    sessionStorage.setItem('selectedGameSystem', selectedSystemObj.id);
    
    // Navegar para a página de criação de personagem
    navigate('/create');
  };

  // Função para iniciar a criação rápida de personagem
  const handleQuickCreate = () => {
    if (!selectedSystemObj.active) {
      alert('Este sistema ainda não está disponível. Em breve!');
      return;
    }
    
    // Armazenar o sistema selecionado no sessionStorage
    sessionStorage.setItem('selectedGameSystem', selectedSystemObj.id);
    
    // Navegar para a página de criação rápida
    navigate('/quick-create');
  };



  const handleSystemSelect = (system) => {
    setSelectedSystemObj(system);
    setSelectedSystem(system.id);
  };

  // Função para executar ação pendente após login/registro
  const handleAuthSuccess = () => {
    if (pendingAction === 'create') {
      sessionStorage.setItem('selectedGameSystem', selectedSystemObj.id);
      navigate('/create');
    } else if (pendingAction === 'quick-create') {
      sessionStorage.setItem('selectedGameSystem', selectedSystemObj.id);
      navigate('/quick-create');
    }
    setPendingAction(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Botões de Login/Registro e Personagens */}
      <div className="absolute top-4 right-4 flex items-center space-x-3">
        {isAuthenticated ? (
          <>
            <div className="text-white text-sm mr-3">
              Olá, <span className="font-semibold">{user?.name}</span>!
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/characters')}
              className="apple-button-secondary flex items-center space-x-2 px-4 py-3 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Personagens</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="apple-button-secondary flex items-center space-x-2 px-4 py-3 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span>Sair</span>
            </motion.button>
          </>
        ) : (
          <>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginForm(true)}
              className="apple-button-secondary flex items-center space-x-2 px-4 py-3 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
              </svg>
              <span>Login</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRegisterForm(true)}
              className="apple-button-primary flex items-center space-x-2 px-4 py-3 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Registrar</span>
            </motion.button>
          </>
        )}
      </div>
      

      
      {/* Texto principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h1 className="serif-title text-5xl md:text-6xl lg:text-7xl text-white tracking-wide mb-3 font-semibold">
          Bem vindo ao seu mundo,
        </h1>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="serif-title text-5xl md:text-6xl lg:text-7xl text-transparent bg-gradient-to-r from-[#F97316] via-[#FFB366] to-[#F97316] bg-clip-text tracking-wide font-bold"
        >
          <span className="uppercase">USUÁRIO</span>!
        </motion.h2>
      </motion.div>
      
      {/* Mensagem informativa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mb-4"
      >
        <div className="text-lg text-[#A0A0A0] font-medium">
          Escolha seu sistema para começarmos
        </div>
      </motion.div>
      
      {/* Seletor de Sistema Melhorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full max-w-xl px-4 mb-12"
      >
        <GameSystemSelector 
          systems={gameSystems}
          selectedSystem={selectedSystemObj}
          onSelect={handleSystemSelect}
        />
      </motion.div>

      {/* Botões de Criação de Personagem */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl px-4 space-y-4"
      >
        <motion.button 
          onClick={handleCreateCharacter}
          disabled={!selectedSystemObj.active}
          whileHover={selectedSystemObj.active ? { scale: 1.02, y: -1 } : {}}
          whileTap={selectedSystemObj.active ? { scale: 0.98 } : {}}
          className={`apple-button-primary w-full p-5 transition-all duration-300 ${
            selectedSystemObj.active 
              ? '' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="font-bold text-lg tracking-wide">
            COMEÇAR AVENTURA
          </span>
        </motion.button>
        
        <motion.button 
          onClick={handleQuickCreate}
          disabled={!selectedSystemObj.active}
          whileHover={selectedSystemObj.active ? { scale: 1.02, y: -1 } : {}}
          whileTap={selectedSystemObj.active ? { scale: 0.98 } : {}}
          className={`apple-button-secondary w-full p-4 transition-all duration-300 ${
            selectedSystemObj.active 
              ? '' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            <span className="font-semibold text-base tracking-wide">
              CRIAÇÃO RÁPIDA
            </span>
          </div>
        </motion.button>
      </motion.div>
      
      {/* Modais de Login e Registro */}
      {showLoginForm && (
        <LoginForm 
          onClose={() => {
            setShowLoginForm(false);
            setPendingAction(null);
          }}
          onSwitchToRegister={() => {
            setShowLoginForm(false);
            setShowRegisterForm(true);
          }}
          onLoginSuccess={handleAuthSuccess}
        />
      )}
      
      {showRegisterForm && (
        <RegisterForm 
          onClose={() => {
            setShowRegisterForm(false);
            setPendingAction(null);
          }}
          onSwitchToLogin={() => {
            setShowRegisterForm(false);
            setShowLoginForm(true);
          }}
          onRegisterSuccess={handleAuthSuccess}
        />
      )}

    </div>
  );
};

export default Homepage;