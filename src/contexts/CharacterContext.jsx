import React, { createContext, useContext, useState, useEffect } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load characters from localStorage on mount
  useEffect(() => {
    const storedCharacters = localStorage.getItem('rpg-characters');
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
    setLoading(false);
  }, []);

  // Save characters to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('rpg-characters', JSON.stringify(characters));
    }
  }, [characters, loading]);

  // Add a new character
  const addCharacter = (character) => {
    const newCharacter = {
      ...character,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setCharacters((prev) => [...prev, newCharacter]);
    return newCharacter;
  };

  // Get a character by ID
  const getCharacter = (id) => {
    return characters.find((char) => char.id === id) || null;
  };

  // Update an existing character
  const updateCharacter = (id, updates) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === id ? { ...char, ...updates, updatedAt: new Date().toISOString() } : char
      )
    );
  };

  // Delete a character
  const deleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
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