import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Load characters from API when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCharacters();
    } else {
      setCharacters([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      const response = await api.get('/characters');
      setCharacters(response.data);
    } catch (error) {
      console.error('Erro ao carregar personagens:', error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new character
  const addCharacter = async (character) => {
    try {
      const response = await api.post('/characters', character);
      const newCharacter = response.data;
      setCharacters((prev) => [...prev, newCharacter]);
      return newCharacter;
    } catch (error) {
      console.error('Erro ao criar personagem:', error);
      throw error;
    }
  };

  // Get a character by ID
  const getCharacter = (id) => {
    return characters.find((char) => char.id === parseInt(id)) || null;
  };

  // Update an existing character
  const updateCharacter = async (id, updates) => {
    try {
      const response = await api.put(`/characters/${id}`, updates);
      const updatedCharacter = response.data;
      setCharacters((prev) =>
        prev.map((char) =>
          char.id === parseInt(id) ? updatedCharacter : char
        )
      );
      return updatedCharacter;
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
      throw error;
    }
  };

  // Delete a character
  const deleteCharacter = async (id) => {
    try {
      await api.delete(`/characters/${id}`);
      setCharacters((prev) => prev.filter((char) => char.id !== parseInt(id)));
    } catch (error) {
      console.error('Erro ao deletar personagem:', error);
      throw error;
    }
  };

  const value = {
    characters,
    loading,
    addCharacter,
    getCharacter,
    updateCharacter,
    deleteCharacter,
  };

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
};