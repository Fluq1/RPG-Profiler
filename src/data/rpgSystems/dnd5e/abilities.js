const abilities = [
  {
    id: 'strength',
    name: 'Força',
    abbreviation: 'FOR',
    description: 'A Força mede a capacidade física, o treinamento atlético e a extensão na qual você pode exercer força física bruta.',
    skills: ['Atletismo'],
    savingThrow: 'Força',
    examples: [
      'Forçar uma porta emperrada',
      'Quebrar correntes',
      'Empurrar um rochedo',
      'Impedir que uma rocha role',
      'Derrubar uma estátua',
      'Dobrar barras de ferro'
    ]
  },
  {
    id: 'dexterity',
    name: 'Destreza',
    abbreviation: 'DES',
    description: 'A Destreza mede agilidade, reflexos e equilíbrio.',
    skills: ['Acrobacia', 'Furtividade', 'Prestidigitação'],
    savingThrow: 'Destreza',
    examples: [
      'Ficar em pé em uma superfície escorregadia',
      'Equilibrar-se em uma corda bamba',
      'Escapar de amarras',
      'Tocar um instrumento de cordas',
      'Criar um item pequeno ou detalhado',
      'Desarmar uma armadilha'
    ],
    additionalInfo: {
      armorClass: 'Modificador de Destreza é adicionado à CA quando usando armadura leve ou nenhuma armadura',
      initiative: 'Modificador de Destreza determina a ordem de iniciativa no combate',
      rangedAttacks: 'Modificador de Destreza é adicionado às jogadas de ataque e dano com armas à distância'
    }
  },
  {
    id: 'constitution',
    name: 'Constituição',
    abbreviation: 'CON',
    description: 'A Constituição mede saúde, vigor e força vital.',
    skills: [],
    savingThrow: 'Constituição',
    examples: [
      'Prender a respiração',
      'Marchar ou trabalhar por horas sem descanso',
      'Ir sem dormir',
      'Sobreviver sem comida ou água',
      'Beber uma caneca inteira de cerveja de uma vez'
    ],
    additionalInfo: {
      hitPoints: 'Modificador de Constituição é adicionado aos pontos de vida a cada nível',
      concentration: 'Testes de resistência de Constituição são feitos para manter concentração em magias',
      deathSaves: 'Testes de resistência contra morte usam d20 puro, sem modificadores'
    }
  },
  {
    id: 'intelligence',
    name: 'Inteligência',
    abbreviation: 'INT',
    description: 'A Inteligência mede o raciocínio, memória e capacidade analítica.',
    skills: ['Arcanismo', 'História', 'Investigação', 'Natureza', 'Religião'],
    savingThrow: 'Inteligência',
    examples: [
      'Comunicar-se com uma criatura sem usar palavras',
      'Estimar o valor de um item precioso',
      'Criar um disfarce',
      'Falsificar um documento',
      'Lembrar-se de conhecimento sobre um ofício ou profissão',
      'Ganhar informações em uma biblioteca'
    ],
    additionalInfo: {
      languages: 'Personagens com alta Inteligência podem conhecer idiomas adicionais',
      spellcasting: 'Magos usam Inteligência como habilidade de conjuração',
      skills: 'Inteligência governa o maior número de perícias'
    }
  },
  {
    id: 'wisdom',
    name: 'Sabedoria',
    abbreviation: 'SAB',
    description: 'A Sabedoria reflete o quão sintonizado você está com o mundo ao seu redor e representa perspicácia e intuição.',
    skills: ['Adestrar Animais', 'Intuição', 'Medicina', 'Percepção', 'Sobrevivência'],
    savingThrow: 'Sabedoria',
    examples: [
      'Perceber se alguém está mentindo',
      'Ler linguagem corporal',
      'Ouvir uma conversa através de uma porta fechada',
      'Encontrar abrigo',
      'Navegar em território selvagem',
      'Reconhecer que água ou comida está envenenada'
    ],
    additionalInfo: {
      perception: 'Percepção passiva é 10 + modificador de Sabedoria',
      spellcasting: 'Clérigos, Druidas e Patrulheiros usam Sabedoria como habilidade de conjuração',
      insight: 'Sabedoria ajuda a ler as intenções e motivações das pessoas'
    }
  },
  {
    id: 'charisma',
    name: 'Carisma',
    abbreviation: 'CAR',
    description: 'O Carisma mede sua habilidade de interagir efetivamente com outros. Inclui fatores como confiança e eloquência.',
    skills: ['Enganação', 'Intimidação', 'Atuação', 'Persuasão'],
    savingThrow: 'Carisma',
    examples: [
      'Influenciar ou entreter um grupo de pessoas',
      'Fazer uma impressão boa ou ruim',
      'Mentir convincentemente',
      'Manter a compostura em uma situação social complicada',
      'Atuar, contar uma história ou fazer uma piada',
      'Misturar-se em uma multidão'
    ],
    additionalInfo: {
      spellcasting: 'Bardos, Feiticeiros, Bruxos e Paladinos usam Carisma como habilidade de conjuração',
      socialInteraction: 'Carisma governa a maioria das interações sociais',
      leadership: 'Personagens carismáticos frequentemente se tornam líderes naturais'
    }
  }
];

// Métodos de geração de atributos
const abilityGenerationMethods = {
  standardArray: {
    name: 'Matriz Padrão',
    description: 'Use os valores 15, 14, 13, 12, 10, 8 e distribua entre os atributos.',
    values: [15, 14, 13, 12, 10, 8]
  },
  pointBuy: {
    name: 'Compra de Pontos',
    description: 'Comece com 8 em todos os atributos e gaste 27 pontos para aumentá-los.',
    startingValue: 8,
    pointsToSpend: 27,
    costs: {
      9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 2, 15: 2
    },
    maxValue: 15
  },
  rolling: {
    name: 'Rolagem de Dados',
    description: 'Role 4d6, descarte o menor dado, e some os três maiores. Faça isso seis vezes.',
    method: '4d6, descarte o menor'
  }
};

export { abilities as default, abilityGenerationMethods };