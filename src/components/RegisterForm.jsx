import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const RegisterForm = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);
    
    if (result.success) {
      onClose();
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-rpg-dark/95 backdrop-blur-sm p-8 rounded-lg border border-rpg-accent/20 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-rpg-accent text-xl"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Registrar</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-rpg-dark border border-rpg-accent/30 rounded text-white focus:border-rpg-accent outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-rpg-dark border border-rpg-accent/30 rounded text-white focus:border-rpg-accent outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-rpg-dark border border-rpg-accent/30 rounded text-white focus:border-rpg-accent outline-none"
              required
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-rpg-dark border border-rpg-accent/30 rounded text-white focus:border-rpg-accent outline-none"
              required
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full apple-button-primary p-3 disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={onSwitchToLogin}
            className="text-rpg-accent hover:underline"
          >
            Já tem conta? Faça login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;