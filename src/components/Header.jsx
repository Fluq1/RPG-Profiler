import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="py-4 border-b border-[rgba(255,255,255,0.1)]">
      <div className="container mx-auto px-4 max-w-5xl flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center mr-3">
            <span className="font-medieval text-white text-lg">F</span>
          </div>
          <h1 className="font-medium text-xl text-white">Forged | RPG Builder</h1>
        </Link>
        
        {/* Botões estilo iOS 16 */}
        <div className="flex items-center space-x-3">
          <div className="text-white text-sm mr-3">
            Olá, <span className="font-semibold">{user?.name}</span>!
          </div>
          
          <button 
            onClick={() => navigate('/characters')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Meus Personagens</span>
          </button>
          
          <button 
            onClick={() => navigate('/premium')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/30 text-yellow-300 hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-400/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">Premium</span>
          </button>
          
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-300 hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;