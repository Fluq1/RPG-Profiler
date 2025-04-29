import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './ui/GlassPanel';
import Button from './ui/Button';
import { getSuggestions } from '../services/aiService';

const CharacterDetails = ({ archetype, onComplete }) => {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    class: '',
    background: '',
    archetype: archetype
  });
  
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (archetype) {
      setLoading(true);
      // Simular um pequeno atraso para parecer uma chamada de API
      setTimeout(() => {
        const newSuggestions = getSuggestions(archetype);
        setSuggestions(newSuggestions);
        setCharacter(prev => ({
          ...prev,
          race: newSuggestions.race,
          class: newSuggestions.class,
          background: newSuggestions.background,
          archetype: archetype
        }));
        setLoading(false);
      }, 800);
    }
  }, [archetype]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (character.name.trim()) {
      onComplete(character);
    }
  };
  
  if (loading) {
    return (
      <GlassPanel className="flex flex-col items-center justify-center p-10">
        <div className="animate-pulse-slow text-rpg-gold text-2xl">
          Consultando os pergaminhos antigos...
        </div>
      </GlassPanel>
    );
  }
  
  return (
    <GlassPanel>
      <h2 className="title-fantasy mb-6">Detalhes do Personagem</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-fantasy text-rpg-light">Nome do Personagem</label>
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleChange}
            required
            className="input-glass w-full"
            placeholder="Digite o nome do seu personagem"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-fantasy text-rpg-light">Raça</label>
            <select
              name="race"
              value={character.race}
              onChange={handleChange}
              className="input-glass w-full"
            >
              <option value={suggestions.race}>{suggestions.race}</option>
              <option value="Humano">Humano</option>
              <option value="Elfo">Elfo</option>
              <option value="Anão">Anão</option>
              <option value="Halfling">Halfling</option>
              <option value="Meio-Elfo">Meio-Elfo</option>
              <option value="Meio-Orc">Meio-Orc</option>
              <option value="Tiefling">Tiefling</option>
              <option value="Draconato">Draconato</option>
              <option value="Gnomo">Gnomo</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-fantasy text-rpg-light">Classe</label>
            <select
              name="class"
              value={character.class}
              onChange={handleChange}
              className="input-glass w-full"
            >
              <option value={suggestions.class}>{suggestions.class}</option>
              <option value="Guerreiro">Guerreiro</option>
              <option value="Mago">Mago</option>
              <option value="Ladino">Ladino</option>
              <option value="Clérigo">Clérigo</option>
              <option value="Bárbaro">Bárbaro</option>
              <option value="Bardo">Bardo</option>
              <option value="Druida">Druida</option>
              <option value="Monge">Monge</option>
              <option value="Paladino">Paladino</option>
              <option value="Ranger">Ranger</option>
              <option value="Feiticeiro">Feiticeiro</option>
              <option value="Bruxo">Bruxo</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-fantasy text-rpg-light">Antecedente</label>
            <select
              name="background"
              value={character.background}
              onChange={handleChange}
              className="input-glass w-full"
            >
              <option value={suggestions.background}>{suggestions.background}</option>
              <option value="Acolito">Acolito</option>
              <option value="Artesão">Artesão</option>
              <option value="Artista">Artista</option>
              <option value="Charlatão">Charlatão</option>
              <option value="Criminoso">Criminoso</option>
              <option value="Eremita">Eremita</option>
              <option value="Forasteiro">Forasteiro</option>
              <option value="Herói do Povo">Herói do Povo</option>
              <option value="Marinheiro">Marinheiro</option>
              <option value="Nobre">Nobre</option>
              <option value="Órfão">Órfão</option>
              <option value="Sábio">Sábio</option>
              <option value="Soldado">Soldado</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button type="submit">
            Gerar História
          </Button>
        </div>
      </form>
    </GlassPanel>
  );
};

export default CharacterDetails;