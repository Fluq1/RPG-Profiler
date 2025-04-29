import React from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const archetypes = [
  {
    id: 'bruto',
    name: 'Bruto',
    icon: '⚔️',
    description: 'Força bruta e resistência são suas maiores virtudes.'
  },
  {
    id: 'sabio',
    name: 'Sábio',
    icon: '📚',
    description: 'Conhecimento e magia arcana fluem em suas veias.'
  },
  {
    id: 'assassino',
    name: 'Assassino',
    icon: '🗡️',
    description: 'Mestre das sombras e ataques precisos.'
  },
  {
    id: 'artista',
    name: 'Artista',
    icon: '🎭',
    description: 'Carisma e criatividade são suas armas.'
  },
  {
    id: 'guardiao',
    name: 'Guardião',
    icon: '🛡️',
    description: 'Protetor dos fracos e defensor da justiça.'
  }
];

const ArchetypeSelector = ({ onSelect, selectedArchetype }) => {
  const containerRef = useRef();
  
  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.archetype-card');
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <div className="mb-8">
      <h2 className="title-fantasy mb-6 text-center">Escolha seu Arquétipo</h2>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archetypes.map((archetype) => (
          <Card 
            key={archetype.id}
            onClick={() => onSelect(archetype.id)}
            selected={selectedArchetype === archetype.id}
            className="archetype-card flex flex-col items-center p-6 h-full"
          >
            <div className="text-4xl mb-3 animate-float">{archetype.icon}</div>
            <h3 className="font-fantasy text-xl mb-2 text-rpg-gold">{archetype.name}</h3>
            <p className="text-center text-rpg-light/80">{archetype.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArchetypeSelector;